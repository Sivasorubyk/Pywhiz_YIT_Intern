"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import api from "../services/api"

interface User {
  id: number
  username: string
  email: string
  currentMilestone: number
  totalScore: number
  completedVideos: number[]
  badges: string[]
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
  updateUserProgress: (milestone: number, videoId?: number) => Promise<void>
  addScore: (points: number) => Promise<void>
  addBadge: (badge: string) => Promise<void>
  resetProgress: () => Promise<void>
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

      // Initialize progress data if not present in the response
      const userData = {
        ...response.data,
        currentMilestone: response.data.currentMilestone || 1,
        totalScore: response.data.totalScore || 0,
        completedVideos: response.data.completedVideos || [],
        badges: response.data.badges || [],
      }

      setUser(userData)

      // Also store current milestone in localStorage as backup
      localStorage.setItem("currentMilestone", String(userData.currentMilestone))
      localStorage.setItem("completedVideos", JSON.stringify(userData.completedVideos))

      return true
    } catch (error) {
      console.error("Failed to fetch user data", error)

      // Try to get milestone from localStorage if API fails
      if (localStorage.getItem("currentMilestone")) {
        const storedMilestone = Number(localStorage.getItem("currentMilestone"))
        const storedVideos = JSON.parse(localStorage.getItem("completedVideos") || "[]")

        setUser({
          id: 0, // Provide a default value or fetch from another source
          username: "Guest", // Provide a default value
          email: "guest@example.com", // Provide a default value
          currentMilestone: storedMilestone,
          completedVideos: storedVideos,
          totalScore: 0,
          badges: [],
        })
        return true
      }

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
      // Clear local storage on logout
      localStorage.removeItem("currentMilestone")
      localStorage.removeItem("completedVideos")
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

  // New function to update user progress
  const updateUserProgress = async (milestone: number, videoId?: number) => {
    if (!user) return

    try {
      // Update locally first for immediate feedback
      const updatedUser = { ...user }

      // Update milestone if it's higher than current
      if (milestone > user.currentMilestone) {
        updatedUser.currentMilestone = milestone
        localStorage.setItem("currentMilestone", String(milestone))
      }

      // Add video to completed videos if provided
      if (videoId && !user.completedVideos.includes(videoId)) {
        updatedUser.completedVideos = [...user.completedVideos, videoId]
        localStorage.setItem("completedVideos", JSON.stringify(updatedUser.completedVideos))
      }

      setUser(updatedUser)

      // Send update to server
      await api
        .post("/auth/update-progress/", {
          currentMilestone: updatedUser.currentMilestone,
          completedVideos: updatedUser.completedVideos,
        })
        .catch((err) => {
          console.error("Failed to update progress on server, but local state is updated", err)
        })
    } catch (error) {
      console.error("Error updating progress:", error)
    }
  }

  // Function to add points to user's score
  const addScore = async (points: number) => {
    if (!user) return

    try {
      // Update locally first
      const updatedUser = {
        ...user,
        totalScore: user.totalScore + points,
      }

      setUser(updatedUser)

      // Send to server
      await api
        .post("/auth/update-score/", {
          score: points,
        })
        .catch((err) => {
          console.error("Failed to update score on server, but local state is updated", err)
        })
    } catch (error) {
      console.error("Error updating score:", error)
    }
  }

  // Function to add a badge
  const addBadge = async (badge: string) => {
    if (!user || user.badges.includes(badge)) return

    try {
      // Update locally first
      const updatedUser = {
        ...user,
        badges: [...user.badges, badge],
      }

      setUser(updatedUser)

      // Send to server
      await api
        .post("/auth/add-badge/", {
          badge,
        })
        .catch((err) => {
          console.error("Failed to add badge on server, but local state is updated", err)
        })
    } catch (error) {
      console.error("Error adding badge:", error)
    }
  }

  // Add function to reset user progress
  const resetProgress = async () => {
    setIsLoading(true)
    try {
      // Reset local state
      if (user) {
        const resetUser = {
          ...user,
          currentMilestone: 1,
          completedVideos: [],
          totalScore: 0,
          badges: [],
        }
        setUser(resetUser)
      }

      // Clear localStorage
      localStorage.removeItem("currentMilestone")
      localStorage.removeItem("completedVideos")

      // Clear all video watched states
      for (let i = 1; i <= 8; i++) {
        localStorage.removeItem(`video_${1000 + i}_watched`)
        localStorage.removeItem(`code_${i}_success`)
        localStorage.removeItem(`exercise_${i}_completed`)
      }

      // Send update to server
      await api.post("/auth/reset-progress/").catch((err) => {
        console.error("Failed to reset progress on server, but local state is reset", err)
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Add resetProgress to the context value
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
        updateUserProgress,
        addScore,
        addBadge,
        resetProgress,
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
