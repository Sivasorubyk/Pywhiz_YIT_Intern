"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
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
import { useAuth } from "./contexts/AuthContext"

// Redirect component for the /learn route
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
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="verify-otp" element={<VerifyOtpPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Redirect /learn to the appropriate milestone */}
          <Route
            path="learn"
            element={
              <ProtectedRoute>
                <LearnRedirect />
              </ProtectedRoute>
            }
          />

          {/* Learning routes with milestone ID parameter */}
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

          {/* New personalized exercise route */}
          <Route
            path="personalized-exercises"
            element={
              <ProtectedRoute>
                <PersonalizedExercisePage />
              </ProtectedRoute>
            }
          />

          {/* Catch all - replace with 404 component if needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
