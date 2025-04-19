"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Trophy, Star, Award, BookOpen, CheckCircle, ArrowRight, Medal, RefreshCw } from "lucide-react"
import confetti from "canvas-confetti"
import { fetchMilestones, type Milestone } from "../services/learnApi"

const DashboardPage = () => {
  const { user, userProgress, isAuthenticated, resetProgress } = useAuth()
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)
  const [showResetConfirmation, setShowResetConfirmation] = useState(false)
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch milestones from API
  useEffect(() => {
    const getMilestones = async () => {
      try {
        const data = await fetchMilestones()
        setMilestones(data)
      } catch (error) {
        console.error("Failed to fetch milestones:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated) {
      getMilestones()
    }
  }, [isAuthenticated])

  // Trigger confetti effect on first load if user has made progress
  useEffect(() => {
    if (userProgress && userProgress.completed_milestones.length > 0 && !showConfetti) {
      setShowConfetti(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [userProgress, showConfetti])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  // Handle continue learning button
  const handleContinueLearning = () => {
    if (!userProgress) return

    // Navigate to the current milestone's learn page
    navigate(`/learn/${userProgress.current_milestone.id}`)
  }

  const handleReset = () => {
    setShowResetConfirmation(true)
  }

  const confirmReset = async () => {
    await resetProgress()
    setShowResetConfirmation(false)
    // Navigate to the first milestone
    if (milestones.length > 0) {
      navigate(`/learn/${milestones[0].id}`)
    }
  }

  if (!user || !userProgress || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b3b3]"></div>
      </div>
    )
  }

  // Get badges from completed milestones
  const badges = userProgress.completed_milestones.map((milestone) => `Completed: ${milestone.title}`)

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8 border-2 border-[#10b3b3]">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#003366] mb-2">Welcome back, {user.username}! 👋</h1>
              <p className="text-gray-600 mb-4">Ready to continue your Python adventure?</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-[#10b3b3] text-white px-4 py-2 rounded-full flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  <span>{userProgress.score} Points</span>
                </div>

                <div className="bg-[#003366] text-white px-4 py-2 rounded-full flex items-center">
                  <Medal className="h-5 w-5 mr-2" />
                  <span>{badges.length} Badges</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleContinueLearning}
                  className="bg-[#10b3b3] hover:bg-[#0d9999] text-white px-6 py-3 rounded-full font-bold flex items-center transition-transform transform hover:scale-105 shadow-md"
                >
                  Continue Learning <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <button
                  onClick={handleReset}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold flex items-center transition-transform transform hover:scale-105 shadow-md"
                >
                  Reset Progress <RefreshCw className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#e6f7f7] rounded-full flex items-center justify-center border-4 border-[#10b3b3]">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-[#003366]">
                      {userProgress.current_milestone.order}
                    </div>
                    <div className="text-sm text-gray-600">of {milestones.length}</div>
                    <div className="text-xs md:text-sm text-[#10b3b3] font-medium">Milestones</div>
                  </div>
                </div>
                {userProgress.completed_milestones.length === milestones.length && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-2 rounded-full">
                    <Star className="h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        {badges.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-xl font-bold text-[#003366] mb-4 flex items-center">
              <Award className="mr-2 h-6 w-6 text-yellow-500" /> Your Achievements
            </h2>
            <div className="flex flex-wrap gap-4">
              {badges.map((badge, index) => (
                <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center">
                  <Award className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Path */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold text-[#003366] mb-6 flex items-center">
            <BookOpen className="mr-2 h-6 w-6" /> Your Python Learning Path
          </h2>

          <div className="space-y-4">
            {milestones.map((milestone) => {
              const isCompleted = userProgress.completed_milestones.some((m) => m.id === milestone.id)
              const isCurrent = userProgress.current_milestone.id === milestone.id
              const isLocked = userProgress.current_milestone.order < milestone.order

              return (
                <div
                  key={milestone.id}
                  className={`border rounded-lg p-4 transition-all ${
                    isCompleted
                      ? "border-green-300 bg-green-50"
                      : isCurrent
                        ? "border-[#10b3b3] bg-[#e6f7f7] shadow-md"
                        : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`rounded-full p-2 mr-3 ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isCurrent
                              ? "bg-[#10b3b3] text-white"
                              : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <div className="flex items-center justify-center h-5 w-5 font-bold">{milestone.order}</div>
                        )}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isLocked ? "text-gray-500" : "text-[#003366]"}`}>
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {isCompleted ? "Completed" : isCurrent ? "In Progress" : "Locked"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/learn/${milestone.id}`)}
                      disabled={isLocked}
                      className={`px-4 py-2 rounded-lg ${
                        isLocked
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : isCompleted
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-[#10b3b3] text-white hover:bg-[#0d9999]"
                      } transition-colors`}
                    >
                      {isCompleted ? "Review" : isCurrent ? "Continue" : "Start"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-[#003366] mb-4">Fun Python Facts 🐍</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-gray-700">
              Did you know? Python was named after the British comedy group Monty Python, not the snake! The creator,
              Guido van Rossum, was a fan of Monty Python's Flying Circus.
            </p>
          </div>
        </div>
        {showResetConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md">
              <h3 className="text-xl font-bold text-red-600 mb-4">Reset Progress?</h3>
              <p className="text-gray-700 mb-6">
                This will reset all your progress, badges, and scores. You will start from Milestone 1 again. This
                action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowResetConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button onClick={confirmReset} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
