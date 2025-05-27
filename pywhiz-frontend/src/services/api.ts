import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Flag to prevent multiple refresh attempts
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (error?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })

  failedQueue = []
}

// Add a request interceptor to include CSRF token if needed
api.interceptors.request.use(
  (config) => {
    // Get CSRF token from cookie if it exists
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1]

    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If the error is due to an expired token (401) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip refresh for login, register, and refresh endpoints
      if (
        originalRequest.url?.includes("/auth/login/") ||
        originalRequest.url?.includes("/auth/register/") ||
        originalRequest.url?.includes("/auth/token/refresh/") ||
        originalRequest.url?.includes("/auth/verify-email/") ||
        originalRequest.url?.includes("/auth/password-reset")
      ) {
        return Promise.reject(error)
      }

      if (isRefreshing) {
        // If we're already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Try to refresh the token
        await axios.post(
          `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/auth/token/refresh/`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )

        // If refresh successful, process the queue and retry the original request
        processQueue(null, "success")
        isRefreshing = false

        return api(originalRequest)
      } catch (refreshError) {
        // If refresh fails, process the queue with error and redirect to login
        processQueue(refreshError, null)
        isRefreshing = false

        console.error("Token refresh failed:", refreshError)

        // Only redirect if we're not already on login/auth pages
        if (
          !window.location.pathname.includes("/login") &&
          !window.location.pathname.includes("/signup") &&
          !window.location.pathname.includes("/verify-otp") &&
          !window.location.pathname.includes("/forgot-password")
        ) {
          // Clear any stored auth state
          localStorage.clear()
          window.location.href = "/login"
        }

        return Promise.reject(refreshError)
      }
    }

    // For other errors, just log and reject
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    })

    return Promise.reject(error)
  },
)

export default api
