"use client"

import { useState, type FormEvent, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Mail, Lock, AlertCircle, CheckCircle } from "lucide-react"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Check for success message from redirects
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message)
      // Clear the message from location state
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setIsSubmitting(true)

    try {
      await login(email, password)
      // Add a small delay before navigation to ensure state updates
      setTimeout(() => {
        navigate("/")
      }, 100)
    } catch (err: any) {
      console.error("Login error:", err)
      if (err.response?.data?.detail) {
        setError(err.response.data.detail)
      } else if (err.response?.data?.error) {
        setError(err.response.data.error)
      } else if (err.response?.data?.non_field_errors) {
        setError(err.response.data.non_field_errors[0])
      } else {
        setError("Failed to login. Please check your credentials.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7f7] to-white flex items-center justify-center py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2">
            {/* Left side - Image */}
            <div className="hidden md:block bg-[#003366] relative">
              <img src="images/Signupin.jpeg" alt="Python Learning" className="w-full h-full object-cover" />
            </div>

            {/* Right side - Login Form */}
            <div className="p-8 md:p-12">
              <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {message && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
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

                <div className="mb-6">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="input-field pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
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
                    "Login"
                  )}
                </button>
              </form>

              <div className="mt-6 flex justify-between text-sm">
                <Link to="/signup" className="text-[#10b3b3] hover:underline">
                  Create an account
                </Link>
                <Link to="/forgot-password" className="text-[#10b3b3] hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
