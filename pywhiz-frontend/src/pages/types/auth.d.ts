// Add this new file to define TypeScript types for the auth context

export interface User {
    id: number
    username: string
    email: string
    currentMilestone: number
    totalScore: number
    completedVideos: number[]
    badges: string[]
  }
  
  export interface AuthContextType {
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
  