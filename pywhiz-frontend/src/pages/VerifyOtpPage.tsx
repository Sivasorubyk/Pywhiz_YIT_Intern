"use client"

import { useState, type FormEvent, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Key, AlertCircle } from "lucide-react"

const VerifyOtpPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { verifyOtp } = useAuth()

  // Get email from location state or use empty string
  const email = location.state?.email || ""

  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Redirect to login if no email is provided
  useEffect(() => {
    if (!email) {
      navigate("/login")
    }
  }, [email, navigate])

  // Auto-redirect to login after successful verification
  useEffect(() => {
    let redirectTimer: NodeJS.Timeout
    if (success) {
      redirectTimer = setTimeout(() => {
        navigate("/login", { state: { message: "Email verified successfully. You can now login." } })
      }, 2000)
    }
    return () => {
      if (redirectTimer) clearTimeout(redirectTimer)
    }
  }, [success, navigate])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      await verifyOtp(email, otp)
      setSuccess(true)
      // Redirect will happen via useEffect
    } catch (err: any) {
      console.error("OTP verification error:", err)
      setError(err.response?.data?.error || "Invalid OTP. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7f7] to-white flex items-center justify-center py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Verify OTP</h1>
          <p className="text-gray-600 mb-6 text-center">
            We've sent a verification code to your email. Please enter it below.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
              <p className="font-medium">Email verified successfully!</p>
              <p className="text-sm">Redirecting to login page...</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="otp" className="sr-only">
                OTP
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

            <button
              type="submit"
              className="w-full btn-primary py-3 flex justify-center items-center"
              disabled={isSubmitting || success}
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtpPage
