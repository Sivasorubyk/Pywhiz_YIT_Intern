// src/pages/SignupPage.tsx
import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Lock, AlertCircle } from 'lucide-react'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await signup(username, email, password)
      // Redirect to OTP verification page with email
      navigate('/verify-otp', { state: { email } })
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7f7] to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2">
            {/* Left side - Form */}
            <div className="p-8 md:p-12">
              <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="username" className="sr-only">Username</label>
                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      className="input-field pl-10"
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

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
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="input-field pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
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
                    'Sign Up'
                  )}
                </button>
              </form>

              <div className="mt-6 flex justify-between text-sm">
                <Link to="/login" className="text-[#10b3b3] hover:underline">
                  Already have an account?
                </Link>
                <Link to="/forgot-password" className="text-[#10b3b3] hover:underline">
                  Forgot password?
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

export default SignupPage