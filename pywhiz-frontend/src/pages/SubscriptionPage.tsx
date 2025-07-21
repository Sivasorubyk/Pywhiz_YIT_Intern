"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Check, Crown, Zap, Star, ArrowRight, Shield, Clock, Users, LogIn } from "lucide-react"
import {
  fetchSubscriptionPlans,
  fetchUserSubscription,
  initiatePayment,
  type SubscriptionPlan,
  type UserSubscription,
} from "../services/subscriptionApi"

const SubscriptionPage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [processingPlan, setProcessingPlan] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError("")

      try {
        // Always fetch plans - this will use fallback data if API fails
        console.log("Loading subscription plans...", { isAuthenticated })
        const plansData = await fetchSubscriptionPlans(isAuthenticated)
        console.log("Plans loaded:", plansData)

        // Sort plans: monthly first, then annual
        const sortedPlans = plansData.sort((a, b) => {
          if (a.duration_days < 365 && b.duration_days >= 365) return -1
          if (a.duration_days >= 365 && b.duration_days < 365) return 1
          return 0
        })

        setPlans(sortedPlans)

        // Only fetch user subscription if authenticated
        if (isAuthenticated) {
          try {
            console.log("Fetching user subscription...")
            const subscriptionData = await fetchUserSubscription()
            console.log("User subscription:", subscriptionData)
            setCurrentSubscription(subscriptionData)
          } catch (subscriptionError) {
            console.log("No active subscription found:", subscriptionError)
            setCurrentSubscription(null)
          }
        }
      } catch (plansError) {
        console.error("Unexpected error loading data:", plansError)
        setError("Unable to load subscription information. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [isAuthenticated])

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate("/login", {
        state: {
          returnUrl: "/subscription",
          message: "Please login to subscribe to a plan",
        },
      })
      return
    }

    if (!user) return

    setProcessingPlan(plan.id)
    setError("")

    try {
      const baseUrl = window.location.origin
      const paymentData = await initiatePayment({
        plan_id: plan.id,
        return_url: `${baseUrl}/subscription/success`,
        cancel_url: `${baseUrl}/subscription/cancel`,
        notify_url: `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/subscriptions/callback/`,
      })

      // Create a form and submit to PayHere
      const form = document.createElement("form")
      form.method = "POST"
      form.action = paymentData.payment_url

      Object.entries(paymentData.payment_params).forEach(([key, value]) => {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = key
        input.value = value
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch (err: any) {
      console.error("Payment initiation error:", err)
      setError(err.response?.data?.error || "Failed to initiate payment")
      setProcessingPlan(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const getPlanType = (durationDays: number) => {
    return durationDays >= 365 ? "Annual" : "Monthly"
  }

  const getMonthlyPrice = (price: number, durationDays: number) => {
    if (durationDays >= 365) {
      return price / 12
    }
    return price
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b3b3]"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-[#003366]">Upgrade Your Learning</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock unlimited access to advanced Python concepts and personalized learning experiences
          </p>
        </div>

        {/* Current Subscription Status - only show if authenticated and has subscription */}
        {isAuthenticated && currentSubscription && currentSubscription.plan && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Check className="h-6 w-6 text-green-500 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Active Subscription</h3>
                    <p className="text-green-700">
                      You have an active {currentSubscription.plan.name} subscription until{" "}
                      {new Date(currentSubscription.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 mb-2">Want to change your plan?</p>
                  <p className="text-xs text-gray-600">Select a different plan below</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="text-red-700">{error}</div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center text-[#003366] mb-8">What You'll Get</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <Zap className="h-12 w-12 text-[#10b3b3] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Concepts</h3>
              <p className="text-gray-600">Access to all 15 milestones and advanced Python programming concepts</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Personalized Exercises</h3>
              <p className="text-gray-600">AI-generated exercises tailored to your learning progress</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Priority Support</h3>
              <p className="text-gray-600">Get help faster with premium support and guidance</p>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[#003366] mb-8">Choose Your Plan</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan) => {
              const isAnnual = plan.duration_days >= 365
              const monthlyPrice = getMonthlyPrice(plan.price, plan.duration_days)
              const isProcessing = processingPlan === plan.id
              const isCurrentPlan = isAuthenticated && currentSubscription?.plan?.id === plan.id

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                    isAnnual ? "border-2 border-[#10b3b3]" : "border border-gray-200"
                  }`}
                >
                  {isAnnual && (
                    <div className="absolute top-0 left-0 right-0 bg-[#10b3b3] text-white text-center py-2 text-sm font-medium">
                      Best Value
                    </div>
                  )}

                  <div className={`p-8 ${isAnnual ? "pt-12" : ""}`}>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-[#003366] mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-[#10b3b3]">{formatPrice(plan.price)}</span>
                        <span className="text-gray-600">/{getPlanType(plan.duration_days).toLowerCase()}</span>
                      </div>
                      {isAnnual && (
                        <div className="text-sm text-gray-600">
                          Only {formatPrice(monthlyPrice)}/month when billed annually
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span>Access to all 15 milestones</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span>Unlimited personalized exercises</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span>Advanced coding challenges</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span>Priority support</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span>Progress tracking & certificates</span>
                      </div>
                      {isAnnual && (
                        <div className="flex items-center">
                          <Crown className="h-5 w-5 text-yellow-500 mr-3" />
                          <span className="font-medium text-[#10b3b3]">Save 2 months with annual billing</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleSubscribe(plan)}
                      disabled={isProcessing || isCurrentPlan}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                        isCurrentPlan
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : !isAuthenticated
                            ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
                            : isAnnual
                              ? "bg-[#10b3b3] hover:bg-[#0d9999] text-white shadow-lg hover:shadow-xl"
                              : "bg-white border-2 border-[#10b3b3] text-[#10b3b3] hover:bg-[#10b3b3] hover:text-white"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                          Processing...
                        </>
                      ) : isCurrentPlan ? (
                        "Current Plan"
                      ) : !isAuthenticated ? (
                        <>
                          <LogIn className="h-5 w-5 mr-2" />
                          Login to Subscribe
                        </>
                      ) : currentSubscription ? (
                        <>
                          Change to This Plan
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      ) : (
                        <>
                          Upgrade Now
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#10b3b3] mr-2" />
                <span className="text-gray-700">Cancel anytime</span>
              </div>
              <div className="flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-gray-700">Secure payments</span>
              </div>
              <div className="flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-gray-700">Join 1000+ learners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
            className="text-[#10b3b3] hover:text-[#0d9999] font-medium"
          >
            ← Back to {isAuthenticated ? "Dashboard" : "Home"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage
