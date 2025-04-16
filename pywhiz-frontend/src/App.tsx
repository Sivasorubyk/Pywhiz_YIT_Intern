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

function App() {
  return (
    <AuthProvider>
      {/* Removed the Router component since it's likely already in your index.js or Layout component */}
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

          {/* Milestone 1 routes */}
          <Route
            path="learn"
            element={
              <ProtectedRoute>
                <LearnPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="code"
            element={
              <ProtectedRoute>
                <CodePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="exercise"
            element={
              <ProtectedRoute>
                <ExercisePage />
              </ProtectedRoute>
            }
          />

          {/* Milestone 2-15 routes */}
          {Array.from({ length: 14 }, (_, i) => i + 2).map((milestone) => (
            <Route
              key={milestone}
              path={`learn${milestone}`}
              element={
                <ProtectedRoute>
                  <LearnPage />
                </ProtectedRoute>
              }
            />
          ))}

          {Array.from({ length: 14 }, (_, i) => i + 2).map((milestone) => (
            <Route
              key={milestone}
              path={`code${milestone}`}
              element={
                <ProtectedRoute>
                  <CodePage />
                </ProtectedRoute>
              }
            />
          ))}

          {Array.from({ length: 14 }, (_, i) => i + 2).map((milestone) => (
            <Route
              key={milestone}
              path={`exercise${milestone}`}
              element={
                <ProtectedRoute>
                  <ExercisePage />
                </ProtectedRoute>
              }
            />
          ))}

          {/* Catch all - replace with 404 component if needed */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
