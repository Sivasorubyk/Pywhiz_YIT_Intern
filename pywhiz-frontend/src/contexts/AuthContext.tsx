"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import api from "../services/api"

interface User {
  id: number
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  verifyOtp: (email: string, otp: string) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshAttempted, setRefreshAttempted] = useState(false)

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/user/")
      setUser(response.data)
      return true
    } catch (error) {
      console.error("Failed to fetch user data", error)
      return false
    }
  }

  // Function to refresh the access token using the refresh token
  const refreshToken = async () => {
    try {
      // We don't need to send the refresh token in the request body
      // because it's already in the cookies
      await api.post("/auth/token/refresh/")
      return true
    } catch (error) {
      console.error("Failed to refresh token", error)
      return false
    }
  }

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      try {
        // First try to get user data with current access token
        const success = await fetchUserData()

        if (success) {
          setIsLoading(false)
          return
        }

        // If that fails and we haven't tried refreshing yet, try to refresh the token
        if (!refreshAttempted) {
          setRefreshAttempted(true)
          const refreshSuccess = await refreshToken()

          if (refreshSuccess) {
            // If refresh successful, try to get user data again
            await fetchUserData()
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [refreshAttempted])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Login request
      await api.post("/auth/login/", { email, password })

      // Fetch user data after login
      await fetchUserData()
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      await api.post("/auth/register/", { username, email, password })
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOtp = async (email: string, otp: string) => {
    setIsLoading(true)
    try {
      await api.post("/auth/verify-email/", { email, otp })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await api.post("/auth/logout/")
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    try {
      await api.post("/auth/password-reset-request/", { email })
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    setIsLoading(true)
    try {
      await api.post("/auth/password-reset/", {
        email,
        otp,
        new_password: newPassword,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        verifyOtp,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
