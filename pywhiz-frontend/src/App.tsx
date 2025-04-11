"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import VerifyOtpPage from "./pages/VerifyOtpPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import LearnPage from "./pages/LearnPage"
import CodePage from "./pages/CodePage"
import ExercisePage from "./pages/ExercisePage"
import LearnPage2 from "./pages/LearnPage2"
import CodePage2 from "./pages/CodePage2"
import ExercisePage2 from "./pages/ExercisePage2"
import LearnPage3 from "./pages/LearnPage3"
import CodePage3 from "./pages/CodePage3"
import ExercisePage3 from "./pages/ExercisePage3"
import LearnPage4 from "./pages/LearnPage4"
import CodePage4 from "./pages/CodePage4"
import ExercisePage4 from "./pages/ExercisePage4"
import LearnPage5 from "./pages/LearnPage5"
import CodePage5 from "./pages/CodePage5"
import ExercisePage5 from "./pages/ExercisePage5"
import LearnPage6 from "./pages/LearnPage6"
import CodePage6 from "./pages/CodePage6"
import ExercisePage6 from "./pages/ExercisePage6"
import LearnPage7 from "./pages/LearnPage7"
import CodePage7 from "./pages/CodePage7"
import ExercisePage7 from "./pages/ExercisePage7"
import LearnPage8 from "./pages/LearnPage8"
import CodePage8 from "./pages/CodePage8"
import ExercisePage8 from "./pages/ExercisePage8"
import ContactPage from "./pages/ContactPage"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="signup" element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="verify-otp" element={isAuthenticated ? <Navigate to="/" /> : <VerifyOtpPage />} />
        <Route path="forgot-password" element={isAuthenticated ? <Navigate to="/" /> : <ForgotPasswordPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Milestone 1 Protected Routes */}
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

        {/* Milestone 2 Protected Routes */}
        <Route
          path="learn2"
          element={
            <ProtectedRoute>
              <LearnPage2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="code2"
          element={
            <ProtectedRoute>
              <CodePage2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="exercise2"
          element={
            <ProtectedRoute>
              <ExercisePage2 />
            </ProtectedRoute>
          }
        />

        {/* Milestone 3 Protected Routes */}
        <Route
          path="learn3"
          element={
            <ProtectedRoute>
              <LearnPage3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="code3"
          element={
            <ProtectedRoute>
              <CodePage3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="exercise3"
          element={
            <ProtectedRoute>
              <ExercisePage3 />
            </ProtectedRoute>
          }
        />

        {/* Milestone 4 Protected Routes */}
        <Route
          path="learn4"
          element={
            <ProtectedRoute>
              <LearnPage4 />
            </ProtectedRoute>
          }
        />
        <Route
          path="code4"
          element={
            <ProtectedRoute>
              <CodePage4 />
            </ProtectedRoute>
          }
        />
        <Route
          path="exercise4"
          element={
            <ProtectedRoute>
              <ExercisePage4 />
            </ProtectedRoute>
          }
        />

        {/* Milestone 5 Protected Routes */}
        <Route
          path="learn5"
          element={
            <ProtectedRoute>
              <LearnPage5 />
            </ProtectedRoute>
          }
        />
        <Route
          path="code5"
          element={
            <ProtectedRoute>
              <CodePage5 />
            </ProtectedRoute>
          }
        />
        <Route
          path="exercise5"
          element={
            <ProtectedRoute>
              <ExercisePage5 />
            </ProtectedRoute>
          }
        />

        {/* Milestone 6 Protected Routes */}
        <Route
          path="learn6"
          element={
            <ProtectedRoute>
              <LearnPage6 />
            </ProtectedRoute>
          }
        />
        <Route
          path="code6"
          element={
            <ProtectedRoute>
              <CodePage6 />
            </ProtectedRoute>
          }
        />
        <Route
          path="exercise6"
          element={
            <ProtectedRoute>
              <ExercisePage6 />
            </ProtectedRoute>
          }
        />

        {/* Milestone 7 Protected Routes */}
        <Route
          path="learn7"
          element={
            <ProtectedRoute>
              <LearnPage7 />
            </ProtectedRoute>
          }
        />
        <Route
          path="code7"
          element={
            <ProtectedRoute>
              <CodePage7 />
            </ProtectedRoute>
          }
        />
        <Route
          path="exercise7"
          element={
            <ProtectedRoute>
              <ExercisePage7 />
            </ProtectedRoute>
          }
        />

        {/* Milestone 8 Protected Routes */}
        <Route
          path="learn8"
          element={
            <ProtectedRoute>
              <LearnPage8 />
            </ProtectedRoute>
          }
        />
        <Route
          path="code8"
          element={
            <ProtectedRoute>
              <CodePage8 />
            </ProtectedRoute>
          }
        />
        <Route
          path="exercise8"
          element={
            <ProtectedRoute>
              <ExercisePage8 />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
