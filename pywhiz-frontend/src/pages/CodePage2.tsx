"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { Volume2, VolumeX, AlertCircle, CheckCircle } from "lucide-react"

interface CodeSubmission {
  id: number
  code: string
  output: string
  hints: string
  suggestions: string
  created_at: string
}

const CodePage2 = () => {
  const navigate = useNavigate()
  const [code, setCode] = useState(`# Milestone 2: Functions
# Define a function that calculates the area of a rectangle
def calculate_area(length, width):
    # Your code here
    pass

# Test your function
length = 5
width = 3
area = calculate_area(length, width)
print(f"The area of a rectangle with length {length} and width {width} is {area}")
`)
  const [output, setOutput] = useState("")
  const [hints, setHints] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isMuted, setIsMuted] = useState(false)

  // Hardcoded lesson data for milestone 2
  const lessonData = {
    title: "Milestone 2: Functions in Python",
    description:
      "In this exercise, you'll learn how to create and use functions in Python. Functions are reusable blocks of code that perform specific tasks. They help make your code more organized, readable, and maintainable. Complete the function to calculate the area of a rectangle.",
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput("")
    setHints("")
    setSuggestions("")
    setError("")
    setIsSuccess(false)

    try {
      console.log("Submitting code to /code-practice/code-submissions/")
      const response = await api.post("/code-practice/code-submissions/", { code })
      console.log("Code submission response:", response.data)

      // Extract data from response
      const { output, hints, suggestions } = response.data

      setOutput(output || "No output")
      setHints(hints || "")
      setSuggestions(suggestions || "")

      // Check if the code is correct (contains "area = length * width" or similar)
      const isCorrect =
        code.includes("return length * width") ||
        code.includes("return width * length") ||
        (output && output.includes("The area of a rectangle with length 5 and width 3 is 15"))

      // If we got a response without errors and the code is correct, consider it successful
      setIsSuccess(isCorrect)
    } catch (err: any) {
      console.error("Error submitting code:", err)
      setError(err.response?.data?.detail || "Error running code. Please try again.")
      setOutput(err.response?.data?.output || "")
    } finally {
      setIsRunning(false)
    }
  }

  const handleNextClick = () => {
    navigate("/exercise2")
  }

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <span className="inline-block bg-[#10b3b3] text-white px-4 py-1 rounded-full text-sm font-medium">
            Milestone 2
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Lesson Info & Output */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">{lessonData.title}</h2>
              <p className="text-gray-700 mb-6">{lessonData.description}</p>

              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
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
                  <span>Great job! Your function correctly calculates the area of a rectangle.</span>
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
                onClick={() => navigate("/learn2")}
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
                disabled={!isSuccess}
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  isSuccess
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
    </div>
  )
}

export default CodePage2
