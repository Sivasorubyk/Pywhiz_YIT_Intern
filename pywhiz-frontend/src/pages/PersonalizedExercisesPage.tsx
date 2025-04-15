"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Loader2, CheckCircle, XCircle, RefreshCw, Trophy, Star } from "lucide-react"
import api from "../services/api"
import confetti from "canvas-confetti"

interface Exercise {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

const PersonalizedExercisesPage = () => {
  const navigate = useNavigate()
  const { user, addScore, addBadge } = useAuth()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  // Fetch personalized exercises
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true)

        // In a real implementation, this would call your backend API
        // For now, we'll simulate a response with mock data
        const response = await api.get("/exercises/personalized").catch(() => {
          // Fallback mock data if API fails
          return {
            data: [
              {
                id: "ex1",
                question: "What will be the output of the following code?\n\nx = 5\ny = 2\nprint(x ** y)",
                options: ["7", "10", "25", "3"],
                correctAnswer: 2,
                explanation:
                  "The ** operator in Python represents exponentiation. So x ** y means x raised to the power of y, which is 5^2 = 25.",
                difficulty: "easy",
              },
              {
                id: "ex2",
                question:
                  "Which of the following is the correct way to open a file named 'data.txt' for reading in Python?",
                options: [
                  "file = open('data.txt', 'r')",
                  "file = open('data.txt', 'w')",
                  "file = read('data.txt')",
                  "file = load('data.txt')",
                ],
                correctAnswer: 0,
                explanation: "To open a file for reading in Python, you use the open() function with 'r' mode.",
                difficulty: "medium",
              },
              {
                id: "ex3",
                question:
                  "What does the following code do?\n\ndef func(x, y=[]):\n    y.append(x)\n    return y\n\nprint(func(1))\nprint(func(2))",
                options: ["Prints [1] and [2]", "Prints [1] and [1, 2]", "Causes an error", "Prints [1, 2] twice"],
                correctAnswer: 1,
                explanation:
                  "In Python, default arguments are evaluated only once when the function is defined. The list y is created once and reused in subsequent calls, so the second call appends 2 to the existing list [1].",
                difficulty: "hard",
              },
              {
                id: "ex4",
                question: "What is the output of the following code?\n\nfor i in range(3):\n    print(i)",
                options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
                correctAnswer: 1,
                explanation:
                  "The range(3) function generates numbers from 0 to 2 (3 exclusive). So the loop prints 0, 1, and 2.",
                difficulty: "easy",
              },
              {
                id: "ex5",
                question: "Which of the following is NOT a valid way to create a list in Python?",
                options: ["my_list = []", "my_list = list()", "my_list = [1, 2, 3]", "my_list = list[1, 2, 3]"],
                correctAnswer: 3,
                explanation:
                  "The correct syntax to convert an iterable to a list is list(iterable), not list[iterable]. So list[1, 2, 3] is not valid.",
                difficulty: "medium",
              },
            ],
          }
        })

        setExercises(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching exercises:", err)
        setError("Failed to load exercises. Please try again later.")
        setLoading(false)
      }
    }

    fetchExercises()
  }, [])

  const handleAnswerSelect = (index: number) => {
    if (isAnswerChecked) return // Prevent changing answer after checking
    setSelectedAnswer(index)
  }

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return

    const currentExercise = exercises[currentExerciseIndex]
    const isCorrect = selectedAnswer === currentExercise.correctAnswer

    setIsAnswerChecked(true)

    if (isCorrect) {
      // Add points based on difficulty
      const points = currentExercise.difficulty === "easy" ? 5 : currentExercise.difficulty === "medium" ? 10 : 15

      setScore((prevScore) => prevScore + points)

      // Update user score in context
      if (addScore) {
        addScore(points)
      }
    }
  }

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1)
      setSelectedAnswer(null)
      setIsAnswerChecked(false)
    } else {
      // Completed all exercises
      setShowCelebration(true)

      // Award badge for completing personalized exercises
      if (addBadge) {
        addBadge("Python Master")
      }

      // Trigger confetti
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      })
    }
  }

  const handleGenerateNew = () => {
    setLoading(true)
    // In a real app, this would call the API again with different parameters
    // For now, we'll just shuffle the existing exercises
    setExercises((prevExercises) => [...prevExercises].sort(() => Math.random() - 0.5))
    setCurrentExerciseIndex(0)
    setSelectedAnswer(null)
    setIsAnswerChecked(false)
    setScore(0)
    setShowCelebration(false)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#e6f7f7] to-white">
        <Loader2 className="h-12 w-12 text-[#10b3b3] animate-spin mb-4" />
        <p className="text-lg text-gray-700">Generating personalized exercises for you...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#e6f7f7] to-white">
        <XCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-lg text-gray-700 mb-4">{error}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-[#10b3b3] text-white px-6 py-2 rounded-lg hover:bg-[#0d9999]"
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  if (showCelebration) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#e6f7f7] to-white">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#003366] mb-2">Congratulations!</h2>
          <p className="text-lg text-gray-700 mb-6">
            You've completed all the personalized exercises with a score of {score} points!
          </p>

          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
              <span className="text-sm font-medium">Python Master</span>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={handleGenerateNew}
              className="bg-[#10b3b3] text-white px-6 py-3 rounded-lg hover:bg-[#0d9999] flex items-center justify-center"
            >
              <RefreshCw className="h-5 w-5 mr-2" /> Generate New Exercises
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-white text-[#003366] border border-[#003366] px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentExercise = exercises[currentExerciseIndex]

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#003366]">Personalized Python Exercises</h1>

          <div className="flex items-center">
            <div className="bg-[#10b3b3] text-white px-4 py-1 rounded-full text-sm font-medium mr-4">
              Score: {score}
            </div>

            <button onClick={() => navigate("/dashboard")} className="text-[#10b3b3] hover:text-[#0d9999] font-medium">
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-[#003366] text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-medium">
                Exercise {currentExerciseIndex + 1}/{exercises.length}
              </span>
              <span className="ml-3 px-2 py-1 bg-white text-[#003366] rounded-full text-xs font-medium">
                {currentExercise.difficulty}
              </span>
            </div>

            <div className="flex items-center text-sm">
              <div className="w-24 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-[#10b3b3] h-2.5 rounded-full"
                  style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">{currentExercise.question}</h2>

              <div className="space-y-3">
                {currentExercise.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedAnswer === index
                        ? isAnswerChecked
                          ? index === currentExercise.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-[#10b3b3] bg-[#e6f7f7]"
                        : isAnswerChecked && index === currentExercise.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-[#10b3b3] hover:bg-[#f0fafa]"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                          selectedAnswer === index
                            ? isAnswerChecked
                              ? index === currentExercise.correctAnswer
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              : "bg-[#10b3b3] text-white"
                            : isAnswerChecked && index === currentExercise.correctAnswer
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-gray-700">{option}</span>

                      {isAnswerChecked && index === currentExercise.correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                      )}

                      {isAnswerChecked && selectedAnswer === index && index !== currentExercise.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isAnswerChecked && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Explanation:</h3>
                <p className="text-gray-700">{currentExercise.explanation}</p>
              </div>
            )}

            <div className="flex justify-between">
              {!isAnswerChecked ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-6 py-2 rounded-lg ${
                    selectedAnswer === null
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#10b3b3] text-white hover:bg-[#0d9999]"
                  }`}
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNextExercise}
                  className="bg-[#10b3b3] text-white px-6 py-2 rounded-lg hover:bg-[#0d9999]"
                >
                  {currentExerciseIndex < exercises.length - 1 ? "Next Question" : "Complete"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center">
            <img
              src="/images/ai-assistant.png"
              alt="AI Assistant"
              className="w-16 h-16 rounded-full mr-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=80&width=80"
              }}
            />
            <div>
              <h3 className="font-medium text-[#003366] mb-1">AI Learning Assistant</h3>
              <p className="text-gray-700">
                These exercises are personalized based on your learning progress. The more you practice, the better the
                system understands your strengths and areas for improvement!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalizedExercisesPage
