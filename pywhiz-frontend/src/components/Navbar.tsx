"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useState } from "react"
import { Menu, X, User, LogOut, Crown } from "lucide-react"

const Navbar = () => {
  const { isAuthenticated, logout, user, userProgress, userSubscription } = useAuth()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)
  const togglePolicy = () => setIsPolicyOpen(!isPolicyOpen)

  const isActive = (path: string) => location.pathname === path

  // Determine the learn link based on user progress
  const getLearnLink = () => {
    if (!isAuthenticated || !userProgress) {
      return "/login" // Redirect to login if not authenticated
    }

    // If user has a current milestone, direct to that milestone's learn page
    if (userProgress.current_milestone) {
      return `/learn/${userProgress.current_milestone.id}`
    }

    // Fallback to dashboard if no current milestone
    return "/dashboard"
  }

  // Check if user needs subscription (completed 4+ milestones without active subscription)
  const needsSubscription = () => {
    if (!userProgress || !isAuthenticated) return false
    const completedCount = userProgress.completed_milestones.length
    return completedCount >= 4 && !userSubscription
  }

  // Get upgrade button styling and text based on user state
  const getUpgradeButtonProps = () => {
    if (!isAuthenticated) {
      // Non-authenticated users - encourage to check out plans
      return {
        className: "bg-[#10b3b3] hover:bg-[#0d9999] text-white",
        text: "Upgrade",
      }
    }

    if (userSubscription) {
      // User has active subscription
      return {
        className: "bg-yellow-500 hover:bg-yellow-600 text-white",
        text: "Upgrade",
      }
    }

    if (needsSubscription()) {
      // User needs subscription (completed 4+ milestones)
      return {
        className:
          "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white animate-pulse",
        text: "Upgrade",
      }
    }

    // Default for authenticated users without subscription
    return {
      className: "bg-[#10b3b3] hover:bg-[#0d9999] text-white",
      text: "Upgrade",
    }
  }

  const upgradeProps = getUpgradeButtonProps()

  return (
    <nav className="bg-[#003366] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="text-[#10b3b3]">Py</span>Whiz
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
              Dashboard
            </Link>
          )}
          <Link to={getLearnLink()} className={`nav-link ${location.pathname.includes("/learn") ? "active" : ""}`}>
            Learn
          </Link>
          <div className="relative">
            <button
              onClick={togglePolicy}
              className={`nav-link flex items-center ${location.pathname.includes("/policy") ? "active" : ""}`}
            >
              Policy
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {isPolicyOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/policy/return-policy"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsPolicyOpen(false)}
                >
                  Return Policy
                </Link>
                <Link
                  to="/policy/privacy-policy"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsPolicyOpen(false)}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/policy/terms-conditions"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsPolicyOpen(false)}
                >
                  Business Terms & Conditions
                </Link>
              </div>
            )}
          </div>

          {/* Upgrade Button - Always visible and always goes to subscription page */}
          <Link
            to="/subscription"
            className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${upgradeProps.className}`}
          >
            <Crown className="h-4 w-4 mr-2" />
            {upgradeProps.text}
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <button onClick={toggleProfile} className="flex items-center text-white hover:text-[#66cccc]">
                <User className="h-5 w-5" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">{user?.username}</div>
                  {userSubscription && (
                    <div className="px-4 py-2 text-xs text-green-600 border-b">
                      Upgraded until {new Date(userSubscription.end_date).toLocaleDateString()}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setIsProfileOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="nav-link px-4 py-2 bg-[#10b3b3] hover:bg-[#0d9999] rounded-full transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#003366] px-4 py-2">
          <div className="flex flex-col space-y-3">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              to={getLearnLink()}
              className={`nav-link ${location.pathname.includes("/learn") ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Learn
            </Link>
            <div className="space-y-2">
              <div className="text-white font-medium">Policy</div>
              <div className="pl-4 space-y-2">
                <Link
                  to="/policy/return-policy"
                  className="block nav-link text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Return Policy
                </Link>
                <Link
                  to="/policy/privacy-policy"
                  className="block nav-link text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/policy/terms-conditions"
                  className="block nav-link text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Business Terms & Conditions
                </Link>
              </div>
            </div>

            {/* Mobile Upgrade Button - Always visible and always goes to subscription page */}
            <Link
              to="/subscription"
              className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${upgradeProps.className}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Crown className="h-4 w-4 mr-2" />
              {upgradeProps.text}
            </Link>

            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <div className="text-sm text-gray-300">{user?.username}</div>
                {userSubscription && (
                  <div className="text-xs text-green-400">
                    Upgraded until {new Date(userSubscription.end_date).toLocaleDateString()}
                  </div>
                )}
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center text-white hover:text-[#66cccc]"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary inline-block text-center" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
