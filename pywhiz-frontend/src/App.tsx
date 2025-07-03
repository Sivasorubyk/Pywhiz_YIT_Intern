"use client"

import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import VerifyOtpPage from "./pages/VerifyOtpPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import DashboardPage from "./pages/Dashboard"
import LearnPage from "./pages/LearnPage"
import CodePage from "./pages/CodePage"
import ExercisePage from "./pages/ExercisePage"
import PersonalizedExercisePage from "./pages/PersonalizedExercisePage"
import ContactPage from "./pages/ContactPage"
import { useAuth } from "./contexts/AuthContext"

const LearnRedirect = () => {
  const { userProgress, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!userProgress || !userProgress.current_milestone) {
    return <Navigate to="/dashboard" replace />
  }

  return <Navigate to={`/learn/${userProgress.current_milestone.id}`} replace />
}

function App() {
  const { user, userProgress } = useAuth()

  // Inject Clarity user data after login
  useEffect(() => {
    if (user && window.clarity) {
      window.clarity("set", "user_email", user.email)
      window.clarity("set", "user_id", user.id)
    }

    if (userProgress?.current_milestone?.id && window.clarity) {
      window.clarity("set", "current_milestone", userProgress.current_milestone.id)
    }
  }, [user, userProgress])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="verify-otp" element={<VerifyOtpPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Protected routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="learn"
          element={
            <ProtectedRoute>
              <LearnRedirect />
            </ProtectedRoute>
          }
        />
        <Route
          path="learn/:milestoneId"
          element={
            <ProtectedRoute>
              <LearnPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="code/:milestoneId"
          element={
            <ProtectedRoute>
              <CodePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="exercise/:milestoneId"
          element={
            <ProtectedRoute>
              <ExercisePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="personalized-exercises"
          element={
            <ProtectedRoute>
              <PersonalizedExercisePage />
            </ProtectedRoute>
          }
        />
        {/* Catch all - 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
