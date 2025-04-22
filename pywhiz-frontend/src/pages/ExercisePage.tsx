"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Volume2, VolumeX, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import confetti from "canvas-confetti"
import { useAuth } from "../contexts/AuthContext"
import {
  fetchMCQQuestions,
  fetchMilestones,
  submitMCQAnswer,
  type MCQQuestion,
  type Milestone,
} from "../services/learnApi"

const ExercisePage = () => {
  const navigate = useNavigate()
  const { milestoneId } = useParams<{ milestoneId: string }>()
  const { userProgress, updateUserProgress, markExerciseCompleted, isExerciseCompleted, resetMilestoneProgress } =
    useAuth()

  const [milestone, setMilestone] = useState<Milestone | null>(null)
  const [mcqQuestions, setMcqQuestions] = useState<MCQQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [results, setResults] = useState<Record<string, boolean>>({})
  const [explanations, setExplanations] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [milestoneAchieved, setMilestoneAchieved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false)
  const [showResetConfirmation, setShowResetConfirmation] = useState(false)
  const [localMilestoneAchieved, setLocalMilestoneAchieved] = useState(false)

  // Fetch milestone and MCQ questions
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch all milestones to get the current one
        const milestones = await fetchMilestones()
        const currentMilestone = milestones.find((m) => m.id === milestoneId)

        if (!currentMilestone) {
          setError("Milestone not found")
          setIsLoading(false)
          return
        }

        setMilestone(currentMilestone)

        // Fetch MCQ questions for this milestone
        const questions = await fetchMCQQuestions(milestoneId!)
        setMcqQuestions(questions)

        // Check if exercise was previously completed using the backend
        if (milestoneId && isExerciseCompleted(milestoneId)) {
          setShowResults(true)
          setMilestoneAchieved(true)
        }
      } catch (err) {
        console.error("Error fetching MCQ questions:", err)
        setError("Failed to load exercise questions. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    if (milestoneId) {
      fetchData()
    }
  }, [milestoneId, isExerciseCompleted])

  useEffect(() => {
    if (milestoneId) {
      const storedCompletion = localStorage.getItem(`exercise_completed_${milestoneId}`)
      if (storedCompletion === "true") {
        setLocalMilestoneAchieved(true)
        setShowResults(true)
      }
    }
  }, [milestoneId])

  // Check if all questions are answered
  useEffect(() => {
    if (mcqQuestions.length > 0) {
      const allAnswered = mcqQuestions.every((question) => answers[question.id] !== undefined)
      setAllQuestionsAnswered(allAnswered)
    }
  }, [answers, mcqQuestions])

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleCheck = async () => {
    if (!allQuestionsAnswered || !milestoneId) return

    const newResults: Record<string, boolean> = {}
    const newExplanations: Record<string, string> = {}
    let allCorrect = true

    // Submit each answer to the API
    for (const question of mcqQuestions) {
      try {
        const response = await submitMCQAnswer(question.id, answers[question.id])
        newResults[question.id] = response.is_correct
        newExplanations[question.id] = response.explanation

        if (!response.is_correct) {
          allCorrect = false
        }
      } catch (err) {
        console.error(`Error submitting answer for question ${question.id}:`, err)
        newResults[question.id] = false
        allCorrect = false
      }
    }

    setResults(newResults)
    setExplanations(newExplanations)
    setShowResults(true)

    if (allCorrect) {
      setMilestoneAchieved(true)
      setLocalMilestoneAchieved(true)

      // Store in localStorage
      localStorage.setItem(`exercise_completed_${milestoneId}`, "true")

      // Mark exercise as completed in the backend
      markExerciseCompleted(milestoneId)

      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      // If this is the last milestone, update user progress
      if (milestone && userProgress) {
        // Update current milestone to the next one if available
        const milestones = await fetchMilestones()
        const currentIndex = milestones.findIndex((m) => m.id === milestone.id)

        if (currentIndex < milestones.length - 1) {
          const nextMilestone = milestones[currentIndex + 1]
          updateUserProgress(nextMilestone)
        }
      }
    }
  }

  const handleNextClick = () => {
    if (milestone && userProgress) {
      // If this is milestone 15, redirect to personalized exercises
      if (milestone.order === 15 && milestoneAchieved) {
        navigate("/personalized-exercises")
        return
      }

      // If this is the last milestone, go to dashboard
      if (milestone.order === userProgress.completed_milestones.length) {
        navigate("/dashboard")
      } else {
        // Otherwise go to the next milestone's learn page
        navigate("/dashboard")
      }
    }
  }

  const handlePreviousClick = () => {
    navigate(`/code/${milestoneId}`)
  }

  const handleReset = () => {
    setShowResetConfirmation(true)
  }

  const confirmReset = async () => {
    if (milestoneId) {
      await resetMilestoneProgress(milestoneId)
      setAnswers({})
      setResults({})
      setExplanations({})
      setShowResults(false)
      setMilestoneAchieved(false)
      setLocalMilestoneAchieved(false)
      localStorage.removeItem(`exercise_completed_${milestoneId}`)
      setShowResetConfirmation(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b3b3]"></div>
      </div>
    )
  }

  if (error || !milestone || mcqQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-xl mb-4">{error || "No exercise questions available"}</div>
        <button onClick={() => navigate("/dashboard")} className="bg-[#10b3b3] text-white px-4 py-2 rounded-md">
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-block bg-[#10b3b3] text-white px-4 py-1 rounded-full text-sm font-medium">
            {milestone.title}
          </span>

          <button onClick={() => navigate("/dashboard")} className="text-[#10b3b3] hover:text-[#0d9999] font-medium">
            Back to Dashboard
          </button>
        </div>

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">{milestone.title} - Exercise</h1>
          <button onClick={handleReset} className="text-red-500 hover:text-red-600 flex items-center text-sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset Progress
          </button>
        </div>

        <div className="bg-[#e6f7f7] rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center">
            <div className="flex-grow">
              <p className="text-gray-700">
                Test your knowledge of {milestone.title} with these multiple-choice questions.
              </p>
            </div>
            <div className="flex items-center ml-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 mr-4"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-gray-600" />
                ) : (
                  <Volume2 className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <img
                src="/images/ai-assistant.png"
                alt="AI Assistant"
                className="w-16 h-16 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=80&width=80"
                }}
              />
            </div>
          </div>
        </div>

        {milestoneAchieved ||
          (localMilestoneAchieved && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-8 flex items-center">
              <CheckCircle className="h-6 w-6 mr-3 text-green-500" />
              <div>
                <h3 className="font-bold">Congratulations!</h3>
                <p>You've completed {milestone.title}! Keep up the great work.</p>
              </div>
            </div>
          ))}

        {(milestoneAchieved || localMilestoneAchieved) && (
          <div className="fixed bottom-4 right-4 z-40 bg-white rounded-lg shadow-lg p-2 max-w-xs animate-bounce">
            <div className="flex items-center">
              <img
                src="/images/milestone-complete.gif"
                alt="Milestone complete!"
                className="w-16 h-16 rounded-md mr-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=80&width=80"
                }}
              />
              <div>
                <p className="font-bold text-[#003366]">Milestone complete!</p>
                <p className="text-sm text-gray-600">You're making amazing progress!</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          {mcqQuestions.map((question) => (
            <div key={question.id} className="mb-6 last:mb-0">
              <div className="flex items-start mb-2">
                <p className="text-gray-800 font-medium">{question.question_text}</p>
                {showResults && (
                  <div className="ml-2">
                    {results[question.id] ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                <select
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#10b3b3]"
                  disabled={showResults}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {Object.entries(question.options).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              {showResults && explanations[question.id] && (
                <div
                  className={`mt-2 p-3 rounded-lg ${results[question.id] ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                >
                  <p className="text-sm">{explanations[question.id]}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePreviousClick}
            className="px-6 py-2 bg-[#66cccc] hover:bg-[#55bbbb] text-white rounded-md transition-all duration-300"
          >
            Previous
          </button>

          {!showResults ? (
            <button
              onClick={handleCheck}
              disabled={!allQuestionsAnswered}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                allQuestionsAnswered
                  ? "bg-[#10b3b3] hover:bg-[#0d9999] text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleNextClick}
              className="px-6 py-2 bg-[#10b3b3] hover:bg-[#0d9999] text-white rounded-md transition-all duration-300"
            >
              {milestone.order < (userProgress?.completed_milestones.length || 0)
                ? "Next Milestone"
                : "Complete Course"}
            </button>
          )}
        </div>
      </div>

      {/* Reset confirmation modal */}
      {showResetConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md">
            <h3 className="text-xl font-bold text-red-600 mb-4">Reset This Milestone?</h3>
            <p className="text-gray-700 mb-6">
              This will reset your progress for this milestone only. You'll need to complete the exercise again.
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
  )
}

export default ExercisePage
