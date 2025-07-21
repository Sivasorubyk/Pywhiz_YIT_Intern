"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, ArrowRight, Crown } from "lucide-react"
import confetti from "canvas-confetti"

const SubscriptionSuccessPage = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate("/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
            </div>

            <h1 className="text-3xl font-bold text-[#003366] mb-4">Payment Successful!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Welcome to PyWhiz Premium! Your subscription has been activated successfully.
            </p>

            <div className="bg-[#e6f7f7] rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-[#003366] mb-2">What's Next?</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Access to all 15 advanced milestones</li>
                <li>• Unlimited personalized exercises</li>
                <li>• Priority support and guidance</li>
                <li>• Advanced coding challenges</li>
              </ul>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-[#10b3b3] hover:bg-[#0d9999] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                Continue Learning
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>

              <p className="text-sm text-gray-500">Redirecting to dashboard in {countdown} seconds...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionSuccessPage
