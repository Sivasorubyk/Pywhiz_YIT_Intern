"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Volume2, VolumeX, AlertCircle, CheckCircle, Plus, BarChart4, Code } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import confetti from "canvas-confetti"
import {
  fetchPersonalizedExercises,
  createPersonalizedExercise,
  submitPersonalizedExercise,
  type PersonalizedExercise,
} from "../services/learnApi"

const difficultyColors = {
  easy: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  hard: "bg-red-100 text-red-800 border-red-200",
}

const PersonalizedExercisePage = () => {
  const navigate = useNavigate()
  const { user, userProgress } = useAuth()

  const [exercises, setExercises] = useState<PersonalizedExercise[]>([])
  const [selectedExercise, setSelectedExercise] = useState<PersonalizedExercise | null>(null)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [hints, setHints] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")
  const [newDifficulty, setNewDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [creating, setCreating] = useState(false)

  // Fetch personalized exercises
  useEffect(() => {
    const loadExercises = async () => {
      setIsLoading(true)
      try {
        const data = await fetchPersonalizedExercises()
        setExercises(data)
        if (data.length > 0) {
          setSelectedExercise(data[0])
          setCode(data[0].generated_code || "")
          if (data[0].output) {
            setOutput(data[0].output)
            setHints(data[0].hints)
            setSuggestions(data[0].suggestions)
            setIsSuccess(data[0].is_completed)
          }
        }
      } catch (err) {
        console.error("Error fetching personalized exercises:", err)
        setError("Failed to load exercises. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadExercises()
  }, [])

  // Select a different exercise
  const handleSelectExercise = (exercise: PersonalizedExercise) => {
    setSelectedExercise(exercise)
    setCode(exercise.generated_code || "")
    setOutput(exercise.output || "")
    setHints(exercise.hints || "")
    setSuggestions(exercise.suggestions || "")
    setIsSuccess(exercise.is_completed)
    setError("")
  }

  // Run the code
  const handleRunCode = async () => {
    if (!selectedExercise) return

    setIsRunning(true)
    setOutput("")
    setHints("")
    setSuggestions("")
    setError("")
    setIsSuccess(false)

    try {
      const response = await submitPersonalizedExercise(selectedExercise.id, code)

      // Update the exercise in the list
      setExercises((prev) => prev.map((ex) => (ex.id === response.id ? response : ex)))

      // Update the selected exercise
      setSelectedExercise(response)

      // Extract data from response
      setOutput(response.output || "No output")
      setHints(response.hints || "")
      setSuggestions(response.suggestions || "")
      setIsSuccess(response.is_completed)

      // If successful, show confetti effect
      if (response.is_completed) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    } catch (err: any) {
      console.error("Error submitting exercise:", err)
      setError(err.response?.data?.error || "Error running code. Please try again.")
    } finally {
      setIsRunning(false)
    }
  }

  // Create a new personalized exercise
  const handleCreateExercise = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestion) return

    setCreating(true)
    try {
      const newExercise = await createPersonalizedExercise({
        question: newQuestion,
        difficulty: newDifficulty,
      })

      // Add the new exercise to the list and select it
      setExercises((prev) => [...prev, newExercise])
      setSelectedExercise(newExercise)
      setCode(newExercise.generated_code || "")
      setOutput("")
      setHints("")
      setSuggestions("")
      setIsSuccess(false)

      // Reset form and hide it
      setNewQuestion("")
      setNewDifficulty("easy")
      setShowCreateForm(false)
    } catch (err) {
      console.error("Error creating exercise:", err)
      setError("Failed to create exercise. Please try again.")
    } finally {
      setCreating(false)
    }
  }

  // Format timestamp to readable date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b3b3]"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#003366]">Personalized Python Exercises</h1>
          <button onClick={() => navigate("/dashboard")} className="text-[#10b3b3] hover:text-[#0d9999] font-medium">
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center">
            <div className="flex-grow">
              <p className="text-gray-700">
                Welcome to your personalized Python exercises! These exercises are tailored to help you practice your
                Python skills. Complete as many as you can to become a Python master!
              </p>
            </div>
            <div className="flex items-center ml-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 mr-4"
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

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Exercise List */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Exercises</h2>
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="bg-[#10b3b3] hover:bg-[#0d9999] text-white p-2 rounded-full"
                  title="Create New Exercise"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {showCreateForm && (
                <form onSubmit={handleCreateExercise} className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <textarea
                      id="question"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Describe the Python challenge you want..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b3b3] resize-none"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      id="difficulty"
                      value={newDifficulty}
                      onChange={(e) => setNewDifficulty(e.target.value as "easy" | "medium" | "hard")}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b3b3]"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating || !newQuestion}
                      className="px-4 py-2 bg-[#10b3b3] text-white rounded-md hover:bg-[#0d9999] disabled:bg-gray-400"
                    >
                      {creating ? "Creating..." : "Create"}
                    </button>
                  </div>
                </form>
              )}

              {exercises.length === 0 ? (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No exercises yet.</p>
                  <p className="text-gray-500 text-sm mt-2">Click the "+" button to create one!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                        selectedExercise?.id === exercise.id
                          ? "border-[#10b3b3] bg-[#e6f7f7]"
                          : "border-gray-200 hover:border-[#66cccc]"
                      } ${exercise.is_completed ? "border-green-300 hover:border-green-400" : ""}`}
                      onClick={() => handleSelectExercise(exercise)}
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm line-clamp-2 mb-2">{exercise.question}</p>
                        {exercise.is_completed && <CheckCircle className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />}
                      </div>
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[exercise.difficulty]}`}
                        >
                          {exercise.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(exercise.created_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2 flex items-center">
                  <BarChart4 className="h-5 w-5 mr-2" />
                  Your Stats
                </h3>
                <div className="text-sm space-y-2">
                  <p>Total Exercises: {exercises.length}</p>
                  <p>Completed: {exercises.filter((ex) => ex.is_completed).length}</p>
                  <p>Pending: {exercises.filter((ex) => !ex.is_completed).length}</p>
                  {userProgress && <p>Overall Score: {userProgress.score}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Code Editor and Output */}
          <div className="md:col-span-2 space-y-6">
            {selectedExercise ? (
              <>
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h2 className="text-xl font-bold mb-3">{selectedExercise.question}</h2>

                  <div className="flex items-center mt-2 mb-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full border mr-3 ${difficultyColors[selectedExercise.difficulty]}`}
                    >
                      {selectedExercise.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">Attempts: {selectedExercise.attempts}</span>
                    {selectedExercise.is_completed && (
                      <span className="ml-auto flex items-center text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Code editor */}
                  <div className="mb-4">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-64 p-4 font-mono text-sm bg-[#f8f9fa] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b3b3] resize-none"
                      placeholder="Write your Python code here..."
                    />
                  </div>

                  <div className="flex justify-end mb-6">
                    <button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className={`px-6 py-2 rounded-md transition-all duration-300 flex items-center ${
                        isRunning
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-[#10b3b3] hover:bg-[#0d9999] text-white"
                      }`}
                    >
                      <Code className="h-5 w-5 mr-2" />
                      {isRunning ? "Running..." : "Run Code"}
                    </button>
                  </div>

                  {/* Output section */}
                  <div className="border-t border-gray-200 pt-4">
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
                        <span>Great job! Your code solved the problem successfully!</span>
                      </div>
                    )}

                    <div className="text-gray-700 mb-4">
                      {output ? (
                        <pre className="bg-gray-100 p-3 rounded-md overflow-auto max-h-48 text-sm">{output}</pre>
                      ) : (
                        <p>Run your code to see the output here.</p>
                      )}
                    </div>

                    {hints && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Hints:</h4>
                        <div className="bg-blue-50 p-3 rounded-md text-sm border border-blue-100">{hints}</div>
                      </div>
                    )}

                    {suggestions && (
                      <div>
                        <h4 className="font-medium mb-2">Suggestions:</h4>
                        <div className="bg-purple-50 p-3 rounded-md text-sm border border-purple-100">
                          {suggestions}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center justify-center text-center h-96">
                <Code className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Exercise Selected</h3>
                <p className="text-gray-500 mb-6">
                  Select an exercise from the list or create a new one to get started.
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-[#10b3b3] hover:bg-[#0d9999] text-white px-4 py-2 rounded-md flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Exercise
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalizedExercisePage
