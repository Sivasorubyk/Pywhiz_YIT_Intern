import axios from "axios"
import api from "./api"

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  duration_days: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserSubscription {
  id: string
  user: {
    id: number
    username: string
    email: string
  }
  plan: SubscriptionPlan
  payment_id: string
  amount: number
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
  updated_at: string
  is_valid: boolean
}

export interface PaymentInitResponse {
  payment_url: string
  payment_params: {
    merchant_id: string
    return_url: string
    cancel_url: string
    notify_url: string
    order_id: string
    items: string
    currency: string
    amount: string
    first_name: string
    email: string
    custom_1: string
    custom_2: string
    hash: string
  }
}

// Fallback plans data - this should match your actual backend plans
const FALLBACK_PLANS: SubscriptionPlan[] = [
  {
    id: "monthly-plan",
    name: "Monthly Subscription",
    price: 4.0, // Exact match with backend
    duration_days: 30,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "annual-plan",
    name: "Annual Subscription",
    price: 40.0, // Exact match with backend
    duration_days: 365,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Create a separate axios instance for public API calls
const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
})

// API functions
export const fetchSubscriptionPlans = async (isAuthenticated = false): Promise<SubscriptionPlan[]> => {
  console.log("Fetching subscription plans...", { isAuthenticated })

  // Try multiple approaches to get the plans
  const attempts = [
    // Attempt 1: Use authenticated API if user is logged in
    ...(isAuthenticated
      ? [
          async () => {
            console.log("Trying authenticated API call...")
            const response = await api.get("/subscriptions/plans/")
            return response.data
          },
        ]
      : []),

    // Attempt 2: Use public API without credentials
    async () => {
      console.log("Trying public API call...")
      const response = await publicApi.get("/subscriptions/plans/")
      return response.data
    },

    // Attempt 3: Direct fetch without credentials
    async () => {
      console.log("Trying direct fetch...")
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/subscriptions/plans/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "omit",
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    },

    // Attempt 4: Direct fetch with include credentials
    async () => {
      console.log("Trying direct fetch with credentials...")
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/subscriptions/plans/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    },
  ]

  // Try each approach in sequence
  for (let i = 0; i < attempts.length; i++) {
    try {
      const data = await attempts[i]()
      console.log(`Subscription plans fetched successfully on attempt ${i + 1}:`, data)
      return data
    } catch (error) {
      console.log(`Attempt ${i + 1} failed:`, error)
      // Continue to next attempt
    }
  }

  // If all attempts fail, use fallback data
  console.log("All API attempts failed, using fallback plans")
  return FALLBACK_PLANS
}

export const fetchUserSubscription = async (): Promise<UserSubscription | null> => {
  try {
    const response = await api.get("/subscriptions/status/")
    return response.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null // No active subscription
    }
    throw error
  }
}

export const initiatePayment = async (data: {
  plan_id: string
  return_url: string
  cancel_url: string
  notify_url: string
}): Promise<PaymentInitResponse> => {
  const response = await api.post("/subscriptions/initiate/", data)
  return response.data
}
