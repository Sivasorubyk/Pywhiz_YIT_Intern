"use client"

import { useNavigate } from "react-router-dom"
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react"

const SubscriptionCancelPage = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-[#003366] mb-4">Payment Cancelled</h1>
            <p className="text-xl text-gray-600 mb-6">
              Your payment was cancelled. No charges have been made to your account.
            </p>

            <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">Need Help?</h3>
              <p className="text-yellow-700 text-sm">
                If you experienced any issues during payment, please contact our support team at{" "}
                <a href="mailto:support@pywhiz.com" className="text-[#10b3b3] hover:underline">
                  support@pywhiz.com
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/subscription")}
                className="w-full bg-[#10b3b3] hover:bg-[#0d9999] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Try Again
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionCancelPage
