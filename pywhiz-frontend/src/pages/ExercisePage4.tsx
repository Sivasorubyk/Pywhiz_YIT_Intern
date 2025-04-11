"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Volume2, VolumeX, CheckCircle, AlertCircle } from 'lucide-react'
import confetti from "canvas-confetti"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

interface Exercise {
  id: number
  title: string
  description: string
  questions: Question[]
  milestone: number
}

const ExercisePage4 = () => {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [results, setResults] = useState<Record<number, boolean>>({})
  const [showResults, setShowResults] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [milestoneAchieved, setMilestoneAchieved] = useState(false)

  // Hardcoded exercise data for milestone 4
  const exerciseData: Exercise = {
    id: 4,
    title: "Python Lists Quiz - Milestone 4",
    description: "Test your understanding of Python lists and data structures. Select the best answer for each question.",
    questions: [
      {
        id: 1,
        text: "What is the correct way to create a list in Python?",
        options: ["list = (1, 2, 3)", "list = [1, 2, 3]", "list = {1, 2, 3}", "list = <1, 2, 3>"],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: "What method is used to add an item to the end of a list?",
        options: ["list.add()", "list.insert()", "list.append()", "list.extend()"],
        correctAnswer: 2,
      },
      {
        id: 3,
        text: "How do you access the first element of a list called 'fruits'?",
        options: ["fruits(0)", "fruits[1]", "fruits[0]", "fruits.first()"],
        correctAnswer: 2,
      },
    ],
    milestone: 4,
  }

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleCheck = () => {
    // Simulate checking answers locally since there's no API yet
    const newResults: Record<number, boolean> = {}

    exerciseData.questions.forEach((question) => {
      const userAnswer = Number.parseInt(answers[question.id] || "-1")
      newResults[question.id] = userAnswer === question.correctAnswer
    })

    setResults(newResults)
    setShowResults(true)

    // Check if all answers are correct
    const allCorrect = Object.values(newResults).every((result) => result === true)

    if (allCorrect) {
      setMilestoneAchieved(true)
      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const handleNextClick = () => {
    // Navigate to milestone 5
    navigate("/learn5")
  }

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <span className="inline-block bg-[#10b3b3] text-white px-4 py-1 rounded-full text-sm font-medium">
            Milestone 4
          </span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">{exerciseData.title}</h1>

        <div className="bg-[#e6f7f7] rounded-xl p-6 shadow-md mb-8">
          <div className="flex items-center">
            <div className="flex-grow">
              <p className="text-gray-700">{exerciseData.description}</p>
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

        {milestoneAchieved && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-8 flex items-center">
            <CheckCircle className="h-6 w-6 mr-3 text-green-500" />
            <div>
              <h3 className="font-bold">Congratulations!</h3>
              <p>You've completed Milestone 4! You're now a list master!</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl p-6 shadow-md mb-8">
          {exerciseData.questions.map((question) => (
            <div key={question.id} className="mb-6 last:mb-0">
              <div className="flex items-start mb-2">
                <p className="text-gray-800 font-medium">{question.text}</p>
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
                  {question.options.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
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
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/code4")}
            className="px-6 py-2 bg-[#66cccc] hover:bg-[#55bbbb] text-white rounded-md transition-all duration-300"
          >
            Previous
          </button>

          {!showResults ? (
            <button
              onClick={handleCheck}
              className="px-6 py-2 bg-[#10b3b3] hover:bg-[#0d9999] text-white rounded-md transition-all duration-300"
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleNextClick}
              className="px-6 py-2 bg-[#10b3b3] hover:bg-[#0d9999] text-white rounded-md transition-all duration-300"
            >
              Next Milestone
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExercisePage4
