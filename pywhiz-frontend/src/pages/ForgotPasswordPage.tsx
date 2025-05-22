"use client"

import { useState, type FormEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Mail, Key, Lock, AlertCircle, CheckCircle } from "lucide-react"

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const { forgotPassword, resetPassword } = useAuth()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [step, setStep] = useState(1) // 1: Email, 2: OTP & New Password
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Auto-redirect to login after successful password reset
  useEffect(() => {
    let redirectTimer: NodeJS.Timeout
    if (success) {
      redirectTimer = setTimeout(() => {
        navigate("/login", {
          state: { message: "Password reset successfully. You can now login with your new password." },
        })
      }, 2000)
    }
    return () => {
      if (redirectTimer) clearTimeout(redirectTimer)
    }
  }, [success, navigate])

  const handleRequestOTP = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      await forgotPassword(email)
      setStep(2)
    } catch (err: any) {
      console.error("Request OTP error:", err)
      setError(err.response?.data?.error || "Failed to send OTP. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    // Check for at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(newPassword)
    const hasNumber = /[0-9]/.test(newPassword)
    if (!hasLetter || !hasNumber) {
      setError("Password must contain at least one letter and one number")
      return
    }

    setIsSubmitting(true)

    try {
      await resetPassword(email, otp, newPassword)
      setSuccess(true)
      // Redirect will happen via useEffect
    } catch (err: any) {
      console.error("Reset password error:", err)
      setError(err.response?.data?.error || "Failed to reset password. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7f7] to-white flex items-center justify-center py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Reset Password</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Password reset successfully!</p>
                <p className="text-sm">Redirecting to login page...</p>
              </div>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleRequestOTP}>
              <p className="text-gray-600 mb-6 text-center">
                Enter your email address and we'll send you a verification code.
              </p>
              <div className="mb-6">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input-field pl-10"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <p className="text-gray-600 mb-6 text-center">
                Enter the verification code sent to your email and your new password.
              </p>
              <div className="mb-6">
                <label htmlFor="otp" className="sr-only">
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter verification code"
                    className="input-field pl-10"
                    required
                  />
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="newPassword" className="sr-only">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 8 chars, include letter & number)"
                    className="input-field pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="input-field pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 flex justify-center items-center"
                disabled={isSubmitting || success}
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-[#10b3b3] hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
