"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Volume2, VolumeX, CheckCircle, AlertCircle, RotateCcw, Play, Pause } from "lucide-react"
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
  const { userProgress, updateUserProgress, markExerciseCompleted, isExerciseCompleted } = useAuth()
  const audioRef = useRef<HTMLAudioElement>(null)

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
  const [localMilestoneAchieved, setLocalMilestoneAchieved] = useState(false)
  const [isReviewMode, setIsReviewMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

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
        console.log("Fetched MCQ questions:", questions)

        if (questions && questions.length > 0) {
          setMcqQuestions(questions)

          // Initialize answers with empty values to prevent undefined errors
          const initialAnswers: Record<string, string> = {}
          questions.forEach((q) => {
            initialAnswers[q.id] = ""
          })
          setAnswers(initialAnswers)
        } else {
          console.error("No questions returned from API")
          setError("No questions available for this milestone")
        }

        // Check if exercise was previously completed using the backend
        const completed = milestoneId && isExerciseCompleted(milestoneId)
        if (completed) {
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

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
  }

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

    // Set the current question ID for audio playback
    if (mcqQuestions.length > 0) {
      setCurrentQuestionId(mcqQuestions[0].id)
    }

    if (allCorrect && !isReviewMode) {
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

  const handleReviewMode = () => {
    setIsReviewMode(true)
    setShowResults(false)
    setAnswers({})
    setResults({})
    setExplanations({})
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
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
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-block bg-[#10b3b3] text-white px-4 py-1 rounded-full text-sm font-medium">
            {milestone.title}
          </span>

          <button onClick={() => navigate("/dashboard")} className="text-[#10b3b3] hover:text-[#0d9999] font-medium">
            Back to Dashboard
          </button>
        </div>

        <div className="flex justify-between items-start mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold">{milestone.title} - Exercise</h1>
          {(milestoneAchieved || localMilestoneAchieved) && !isReviewMode && showResults && (
            <button onClick={handleReviewMode} className="text-blue-500 hover:text-blue-600 flex items-center text-sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              Practice Again
            </button>
          )}
        </div>

        <div className="bg-[#e6f7f7] rounded-xl p-4 md:p-6 shadow-md mb-6 md:mb-8">
          <div className="flex items-center">
            <div className="flex-grow">
              <p className="text-gray-700 text-sm md:text-base">
                Test your knowledge of {milestone.title} with these multiple-choice questions.
              </p>
            </div>
            <div className="flex items-center ml-4">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 mr-4"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                ) : (
                  <Volume2 className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                )}
              </button>
              <img
                src="/images/ai-assistant.png"
                alt="AI Assistant"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=80&width=80"
                }}
              />
            </div>
          </div>
        </div>

        {(milestoneAchieved || localMilestoneAchieved) && !isReviewMode && showResults && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 md:mb-8 flex items-center">
            <CheckCircle className="h-5 w-5 md:h-6 md:w-6 mr-3 text-green-500" />
            <div>
              <h3 className="font-bold text-sm md:text-base">Congratulations!</h3>
              <p className="text-sm">You've completed {milestone.title}! Keep up the great work.</p>
              <button
                onClick={handleReviewMode}
                className="mt-2 text-xs md:text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Practice Again
              </button>
            </div>
          </div>
        )}

        {isReviewMode && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-xl p-4 mb-6 md:mb-8 flex items-center">
            <RotateCcw className="h-5 w-5 md:h-6 md:w-6 mr-3 text-blue-500" />
            <div>
              <h3 className="font-bold text-sm md:text-base">Review Mode</h3>
              <p className="text-sm">You're reviewing this exercise. Your answers won't affect your progress.</p>
            </div>
          </div>
        )}

        {(milestoneAchieved || localMilestoneAchieved) && !isReviewMode && (
          <div className="fixed bottom-4 right-4 z-40 bg-white rounded-lg shadow-lg p-2 max-w-xs animate-bounce">
            <div className="flex items-center">
              <img
                src="/images/milestone-complete.gif"
                alt="Milestone complete!"
                className="w-12 h-12 md:w-16 md:h-16 rounded-md mr-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=80&width=80"
                }}
              />
              <div>
                <p className="font-bold text-[#003366] text-sm md:text-base">Milestone complete!</p>
                <p className="text-xs md:text-sm text-gray-600">You're making amazing progress!</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-md mb-6 md:mb-8">
          {mcqQuestions.map((question) => (
            <div key={question.id} className="mb-6 last:mb-0">
              <div className="flex items-start mb-2">
                {/* Preserve formatting for question text */}
                <div
                  className="text-gray-800 font-medium text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: question.question_text }}
                ></div>
                {showResults && (
                  <div className="ml-2">
                    {results[question.id] ? (
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              <div className="relative">
                {/* Use a regular HTML select element */}
                <select
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="w-full p-2 md:p-3 pr-10 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#10b3b3] text-sm md:text-base"
                  disabled={showResults && !isReviewMode}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="A">{question.options?.A || "Option A"}</option>
                  <option value="B">{question.options?.B || "Option B"}</option>
                  <option value="C">{question.options?.C || "Option C"}</option>
                  <option value="D">{question.options?.D || "Option D"}</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-400"
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
                  {/* Preserve formatting for explanation */}
                  <div
                    className="text-xs md:text-sm"
                    dangerouslySetInnerHTML={{ __html: explanations[question.id] }}
                  ></div>

                  {/* Audio player for explanation */}
                  {showResults && question.audio_url_2 && question.id === currentQuestionId && (
                    <div className="mt-3 p-2 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <button
                          onClick={toggleAudio}
                          className="p-2 rounded-full bg-[#10b3b3] text-white hover:bg-[#0d9999] mr-2"
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                        <span className="text-xs md:text-sm text-gray-700">
                          {isPlaying ? "Pause Audio Explanation" : "Play Audio Explanation"}
                        </span>
                      </div>
                      <audio
                        ref={audioRef}
                        src={question.audio_url_2}
                        className="hidden"
                        onEnded={() => setIsPlaying(false)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePreviousClick}
            className="px-4 md:px-6 py-2 bg-[#66cccc] hover:bg-[#55bbbb] text-white rounded-md transition-all duration-300 text-xs md:text-sm"
          >
            Previous
          </button>

          {!showResults || isReviewMode ? (
            <button
              onClick={handleCheck}
              disabled={!allQuestionsAnswered}
              className={`px-4 md:px-6 py-2 rounded-md transition-all duration-300 text-xs md:text-sm ${
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
              className="px-4 md:px-6 py-2 bg-[#10b3b3] hover:bg-[#0d9999] text-white rounded-md transition-all duration-300 text-xs md:text-sm"
            >
              {milestone.order < (userProgress?.completed_milestones.length || 0)
                ? "Next Milestone"
                : "Complete Course"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExercisePage
