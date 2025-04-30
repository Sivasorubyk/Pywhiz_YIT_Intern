"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Volume2, VolumeX, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import {
  fetchCodeQuestions,
  fetchMilestones,
  submitCode,
  type CodeQuestion,
  type Milestone,
} from "../services/learnApi"

const CodePage = () => {
  const navigate = useNavigate()
  const { milestoneId } = useParams<{ milestoneId: string }>()
  const { userProgress, isCodeCompleted, markCodeCompleted, resetMilestoneProgress } = useAuth()

  const [milestone, setMilestone] = useState<Milestone | null>(null)
  const [codeQuestion, setCodeQuestion] = useState<CodeQuestion | null>(null)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [hints, setHints] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showResetConfirmation, setShowResetConfirmation] = useState(false)
  const [localCodeSuccess, setLocalCodeSuccess] = useState(false)

  // Fetch milestone and code questions
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

        // Fetch code questions for this milestone
        const questions = await fetchCodeQuestions(milestoneId!)
        if (questions.length > 0) {
          setCodeQuestion(questions[0]) // Use the first question
          setCode(questions[0].example_code)
        } else {
          setError("No code questions available for this milestone")
        }

        // Check if code was previously completed successfully using the backend
        if (milestoneId && isCodeCompleted(milestoneId)) {
          setIsSuccess(true)
        }
      } catch (err) {
        console.error("Error fetching code questions:", err)
        setError("Failed to load code questions. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    if (milestoneId) {
      fetchData()
    }
  }, [milestoneId, isCodeCompleted])

  useEffect(() => {
    if (milestoneId) {
      const storedSuccess = localStorage.getItem(`code_success_${milestoneId}`)
      if (storedSuccess === "true") {
        setLocalCodeSuccess(true)
      }
    }
  }, [milestoneId])

  // Modify handleRunCode to store success state in the backend
  const handleRunCode = async () => {
    if (!codeQuestion || !milestoneId) return

    setIsRunning(true)
    setOutput("")
    setHints("")
    setSuggestions("")
    setError("")
    setIsSuccess(false)

    try {
      const response = await submitCode(codeQuestion.id, code)

      // Extract data from response
      setOutput(response.output || "No output")
      setHints(response.hints || "")
      setSuggestions(response.suggestions || "")

      // If we got a response without errors, consider it successful
      setIsSuccess(response.is_correct)

      // Store success in backend and localStorage
      if (response.is_correct) {
        markCodeCompleted(milestoneId)
        localStorage.setItem(`code_success_${milestoneId}`, "true")
        setLocalCodeSuccess(true)
      }
    } catch (err: any) {
      console.error("Error submitting code:", err)
      setError(err.response?.data?.detail || "Error running code. Please try again.")
      setOutput(err.response?.data?.output || "")
    } finally {
      setIsRunning(false)
    }
  }

  const handleNextClick = () => {
    navigate(`/exercise/${milestoneId}`)
  }

  const handlePreviousClick = () => {
    navigate(`/learn/${milestoneId}`)
  }

  const handleReset = () => {
    setShowResetConfirmation(true)
  }

  const confirmReset = async () => {
    if (milestoneId) {
      await resetMilestoneProgress(milestoneId)
      setIsSuccess(false)
      setLocalCodeSuccess(false)
      localStorage.removeItem(`code_success_${milestoneId}`)
      setOutput("")
      setHints("")
      setSuggestions("")
      setShowResetConfirmation(false)

      // Reset code to example code
      if (codeQuestion) {
        setCode(codeQuestion.example_code)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b3b3]"></div>
      </div>
    )
  }

  if (!milestone || !codeQuestion) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-xl mb-4">{error || "Content not available"}</div>
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

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Lesson Info & Output */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{milestone.title}</h2>
                <button onClick={handleReset} className="text-red-500 hover:text-red-600 flex items-center text-sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reset Progress
                </button>
              </div>
              <p className="text-gray-700 mb-6">{milestone.description}</p>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                <h3 className="font-bold mb-2">Question</h3>
                <p className="text-gray-700">{codeQuestion.question}</p>
              </div>

              {codeQuestion.hint && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-bold mb-2">Hint</h3>
                  <p className="text-gray-700">{codeQuestion.hint}</p>
                </div>
              )}

              <div className="flex items-center mt-4">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src="/images/speaking.gif"
                    alt="AI Assistant"
                    className="w-16 h-16 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=80&width=80"
                    }}
                  />
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md flex-grow">
              <h3 className="text-lg font-semibold mb-3">Output</h3>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {isSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Code executed successfully!</span>
                </div>
              )}

              <div className="text-gray-700">
                {output ? (
                  <pre className="bg-gray-100 p-3 rounded-md overflow-auto max-h-48 text-sm">{output}</pre>
                ) : (
                  <p>Run your code to see the output here.</p>
                )}
              </div>

              {hints && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Hints:</h4>
                  <div className="bg-blue-50 p-3 rounded-md text-sm">{hints}</div>
                </div>
              )}

              {suggestions && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Suggestions:</h4>
                  <div className="bg-purple-50 p-3 rounded-md text-sm">{suggestions}</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Code Editor */}
          <div className="flex flex-col space-y-4">
            <div className="bg-[#e6f7f7] rounded-xl p-4 shadow-md flex-grow">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full min-h-[300px] p-4 font-mono text-sm bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b3b3] resize-none"
                placeholder="Write your Python code here..."
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePreviousClick}
                className="px-6 py-2 bg-[#66cccc] hover:bg-[#55bbbb] text-white rounded-md transition-all duration-300"
              >
                Previous
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  isRunning ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#10b3b3] hover:bg-[#0d9999] text-white"
                }`}
              >
                {isRunning ? "Running..." : "Run"}
              </button>

              <button
                onClick={handleNextClick}
                disabled={!isSuccess && !localCodeSuccess}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  isSuccess || localCodeSuccess
                    ? "bg-[#10b3b3] hover:bg-[#0d9999] text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {isSuccess && (
        <div className="fixed bottom-4 right-4 z-40 bg-white rounded-lg shadow-lg p-2 max-w-xs animate-bounce">
          <div className="flex items-center">
            <img
              src="/images/coding-success.gif"
              alt="Code success!"
              className="w-16 h-16 rounded-md mr-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=80&width=80"
              }}
            />
            <div>
              <p className="font-bold text-[#003366]">Code success!</p>
              <p className="text-sm text-gray-600">You're becoming a Python pro!</p>
            </div>
          </div>
        </div>
      )}

      {/* Reset confirmation modal */}
      {showResetConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md">
            <h3 className="text-xl font-bold text-red-600 mb-4">Reset This Milestone?</h3>
            <p className="text-gray-700 mb-6">
              This will reset your progress for this milestone only. You'll need to complete the coding exercise again.
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

export default CodePage
