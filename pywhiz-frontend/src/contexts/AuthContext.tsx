"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import api from "../services/api"
import { fetchUserProgress, updateCurrentMilestone, type UserProgress, type Milestone } from "../services/learnApi"

interface User {
  id: number
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  userProgress: UserProgress | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (username: string, email: string, password: string) => Promise<void>
  verifyOtp: (email: string, otp: string) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>
  updateUserProgress: (milestone: Milestone) => Promise<void>
  markVideoWatched: (milestoneId: string) => Promise<void>
  markExerciseCompleted: (milestoneId: string) => Promise<void>
  isVideoWatched: (milestoneId: string) => boolean
  isExerciseCompleted: (milestoneId: string) => boolean
  isCodeCompleted: (milestoneId: string) => boolean
  markCodeCompleted: (milestoneId: string) => Promise<void>
  addScore: (points: number) => Promise<void>
  addBadge: (badge: string) => Promise<void>
  resetMilestoneProgress: (milestoneId: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshAttempted, setRefreshAttempted] = useState(false)

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/user/")
      setUser(response.data)

      // Fetch user progress
      try {
        const progress = await fetchUserProgress()
        setUserProgress(progress)
      } catch (progressError) {
        console.error("Failed to fetch user progress", progressError)
      }

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
      setUserProgress(null)
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

  // Function to update user progress
  const updateUserProgress = async (milestone: Milestone) => {
    if (!user) return

    try {
      await updateCurrentMilestone(milestone.id)

      // Refresh user progress
      const progress = await fetchUserProgress()
      setUserProgress(progress)
    } catch (error) {
      console.error("Error updating progress:", error)
    }
  }

  // New function to mark a video as watched
  const markVideoWatched = async (milestoneId: string) => {
    if (!user) return

    try {
      await api.post(`/learn/milestones/${milestoneId}/mark-video-watched/`)

      // Refresh user progress
      const progress = await fetchUserProgress()
      setUserProgress(progress)
    } catch (error) {
      console.error("Error marking video as watched:", error)
    }
  }

  // New function to mark an exercise as completed
  const markExerciseCompleted = async (milestoneId: string) => {
    if (!user) return

    try {
      await api.post(`/learn/milestones/${milestoneId}/mark-exercise-completed/`)

      // Refresh user progress
      const progress = await fetchUserProgress()
      setUserProgress(progress)
    } catch (error) {
      console.error("Error marking exercise as completed:", error)
    }
  }

  // New function to mark code as completed
  const markCodeCompleted = async (milestoneId: string) => {
    if (!user) return

    try {
      await api.post(`/learn/milestones/${milestoneId}/mark-code-completed/`)

      // Refresh user progress
      const progress = await fetchUserProgress()
      setUserProgress(progress)
    } catch (error) {
      console.error("Error marking code as completed:", error)
    }
  }

  // Check if a video has been watched
  const isVideoWatched = (milestoneId: string): boolean => {
    if (!userProgress || !userProgress.watched_videos) return false
    return userProgress.watched_videos.includes(milestoneId)
  }

  // Check if an exercise has been completed
  const isExerciseCompleted = (milestoneId: string): boolean => {
    if (!userProgress || !userProgress.completed_exercises) return false
    return userProgress.completed_exercises.includes(milestoneId)
  }

  // Check if code has been completed
  const isCodeCompleted = (milestoneId: string): boolean => {
    if (!userProgress || !userProgress.completed_code) return false
    return userProgress.completed_code.includes(milestoneId)
  }

  // Function to add points to user's score
  const addScore = async (points: number) => {
    if (!user || !userProgress) return

    try {
      // This is a placeholder - we'll rely on the backend to update the score
      // Refresh user progress to get the updated score
      const progress = await fetchUserProgress()
      setUserProgress(progress)
    } catch (error) {
      console.error("Error updating score:", error)
    }
  }

  // Function to add a badge - this is now handled by the backend
  const addBadge = async (badge: string) => {
    // This is a placeholder - badges are now handled by the backend
    console.log("Badge system is now handled by the backend")
  }

  // Function to reset progress for a specific milestone
  const resetMilestoneProgress = async (milestoneId: string) => {
    if (!user) return

    try {
      // Remove milestone from watched videos
      if (userProgress && userProgress.watched_videos.includes(milestoneId)) {
        await api.post(`/learn/milestones/${milestoneId}/mark-video-watched/`, { reset: true })
        localStorage.removeItem(`video_watched_${milestoneId}`)
      }

      // Remove milestone from completed code
      if (userProgress && userProgress.completed_code.includes(milestoneId)) {
        await api.post(`/learn/milestones/${milestoneId}/mark-code-completed/`, { reset: true })
        localStorage.removeItem(`code_success_${milestoneId}`)
      }

      // Remove milestone from completed exercises
      if (userProgress && userProgress.completed_exercises.includes(milestoneId)) {
        await api.post(`/learn/milestones/${milestoneId}/mark-exercise-completed/`, { reset: true })
        localStorage.removeItem(`exercise_completed_${milestoneId}`)
      }

      // Refresh user progress
      const progress = await fetchUserProgress()
      setUserProgress(progress)
    } catch (error) {
      console.error("Error resetting milestone progress:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProgress,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        verifyOtp,
        logout,
        forgotPassword,
        resetPassword,
        updateUserProgress,
        markVideoWatched,
        markExerciseCompleted,
        isVideoWatched,
        isExerciseCompleted,
        isCodeCompleted,
        markCodeCompleted,
        addScore,
        addBadge,
        resetMilestoneProgress,
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
