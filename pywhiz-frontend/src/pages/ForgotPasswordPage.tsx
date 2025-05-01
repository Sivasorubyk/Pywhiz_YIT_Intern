// src/pages/ForgotPasswordPage.tsx
import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Key, Lock, AlertCircle, CheckCircle } from 'lucide-react'

const ForgotPasswordPage = () => {
  const { forgotPassword, resetPassword } = useAuth()
  
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState(1) // 1: Email, 2: OTP & New Password
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await forgotPassword(email)
      setStep(2)
      setSuccess('OTP sent to your email')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      await resetPassword(email, otp, newPassword)
      setSuccess('Password reset successfully')
      // Clear form
      setOtp('')
      setNewPassword('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reset password. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden bg-gradient-to-b from-[#e6f7f7] to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2">
            {/* Left side - Form */}
            <div className="p-8 md:p-12">
              <h1 className="text-3xl font-bold mb-8 text-center">Forgot Password</h1>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                  <div className="mb-6">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="input-field pl-10"
                        required
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#005e41] hover:bg-[#004d35] text-white font-medium py-3 rounded-full transition-all duration-300 flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword}>
                  <div className="mb-6">
                    <label htmlFor="otp" className="sr-only">OTP</label>
                    <div className="relative">
                      <input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="OTP"
                        className="input-field pl-10"
                        required
                      />
                      <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="newPassword" className="sr-only">New Password</label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="input-field pl-10"
                        required
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#005e41] hover:bg-[#004d35] text-white font-medium py-3 rounded-full transition-all duration-300 flex justify-center items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              )}

              <div className="mt-6 flex justify-between text-sm">
                <Link to="/login" className="text-[#10b3b3] hover:underline">
                  Remember the password?
                </Link>
                <Link to="/signup" className="text-[#10b3b3] hover:underline">
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden md:block bg-[#e6f7f7] relative">
              <img 
                src="images/Signupin.jpeg" 
                alt="Python Learning" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage