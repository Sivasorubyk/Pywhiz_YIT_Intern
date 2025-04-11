import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

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
      originalRequest._retry = true

      try {
        // Try to refresh the token
        await axios.post(
          `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/auth/token/refresh/`,
          {},
          { withCredentials: true },
        )

        // If refresh successful, retry the original request
        return api(originalRequest)
      } catch (refreshError) {
        // If refresh fails, redirect to login (but avoid redirect loops)
        if (!window.location.pathname.includes("/login")) {
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
