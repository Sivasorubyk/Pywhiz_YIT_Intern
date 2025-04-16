"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
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

const CodePage = () => {
  const navigate = useNavigate()
  const { milestoneId } = useParams<{ milestoneId?: string }>()

  // Default to milestone 1 if no parameter is provided
  const currentMilestone = milestoneId ? Number.parseInt(milestoneId) : 1

  // Define milestone-specific starter code
  const getStarterCode = (milestone: number) => {
    switch (milestone) {
      case 1:
        return 'print("Hello, World!")'
      case 2:
        return '# Create variables and print them\nname = "Python Learner"\nage = 12\nprint(name)\nprint(age)'
      case 3:
        return '# Explore different data types\nmy_number = 42\nmy_string = "Python is fun!"\nmy_boolean = True\n\nprint(type(my_number))\nprint(type(my_string))\nprint(type(my_boolean))'
      case 4:
        return "# Try different operators\na = 10\nb = 3\n\n# Arithmetic operators\nprint(a + b)  # Addition\nprint(a - b)  # Subtraction\nprint(a * b)  # Multiplication\nprint(a / b)  # Division\nprint(a % b)  # Modulus\nprint(a ** b) # Exponentiation"
      case 5:
        return '# If-else statements\nage = 12\n\nif age >= 13:\n    print("You are a teenager")\nelse:\n    print("You are not yet a teenager")'
      case 6:
        return "# For loop example\nfor i in range(5):\n    print(i)"
      case 7:
        return "# While loop example\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1"
      case 8:
        return '# Function example\ndef greet(name):\n    return "Hello, " + name + "!"\n\nresult = greet("Python Learner")\nprint(result)'
      case 9:
        return '# Arrays in Python using lists\nimport array\n\n# Create an array of integers\nnumbers = array.array("i", [1, 2, 3, 4, 5])\n\n# Print the array\nprint(numbers)\n\n# Access elements\nprint(numbers[0])  # First element\nprint(numbers[-1]) # Last element'
      case 10:
        return "# Math operations in Python\nimport math\n\n# Basic math\nprint(math.sqrt(16))  # Square root\nprint(math.pi)       # Pi constant\nprint(math.ceil(4.2)) # Round up\nprint(math.floor(4.8)) # Round down"
      case 11:
        return '# Python lists\nfruits = ["apple", "banana", "cherry"]\n\n# Print the list\nprint(fruits)\n\n# Access elements\nprint(fruits[0])  # First element\n\n# Add an element\nfruits.append("orange")\nprint(fruits)'
      case 12:
        return '# Python tuples\ncolors = ("red", "green", "blue")\n\n# Print the tuple\nprint(colors)\n\n# Access elements\nprint(colors[0])  # First element\n\n# Tuples are immutable (cannot be changed)\n# This would cause an error:\n# colors[0] = "yellow"'
      case 13:
        return '# Python sets\nfruits = {"apple", "banana", "cherry", "apple"}\n\n# Print the set (notice duplicates are removed)\nprint(fruits)\n\n# Add an element\nfruits.add("orange")\nprint(fruits)\n\n# Remove an element\nfruits.remove("banana")\nprint(fruits)'
      case 14:
        return '# Python dictionaries\nstudent = {\n    "name": "John",\n    "age": 12,\n    "grade": 7\n}\n\n# Print the dictionary\nprint(student)\n\n# Access values\nprint(student["name"])\n\n# Add or modify elements\nstudent["subject"] = "Python"\nprint(student)'
      case 15:
        return '# Python file handling\n\n# Writing to a file\nwith open("example.txt", "w") as file:\n    file.write("Hello, Python learner!\\n")\n    file.write("This is file handling in Python.")\n\n# Reading from a file\nwith open("example.txt", "r") as file:\n    content = file.read()\n    print(content)'
      default:
        return 'print("Hello, World!")'
    }
  }

  // Milestone-specific lesson data
  const milestonesData = [
    {
      id: 1,
      title: "Introduction to Python",
      description:
        "In this lesson, we will explore the basics of Python, one of the most popular programming languages. You'll learn about syntax, comments, and user input. By the end of this lesson, you'll be able to write your first Python program and understand how it runs.",
    },
    {
      id: 2,
      title: "Python Variables",
      description:
        "In this lesson, you'll learn about variables in Python. Variables are containers for storing data values. You'll learn how to create, name, and use variables in your Python programs.",
    },
    {
      id: 3,
      title: "Python Data Types",
      description:
        "This lesson covers Python's built-in data types including numbers, strings, and booleans. You'll learn how to work with different types of data and convert between them.",
    },
    {
      id: 4,
      title: "Python Operators",
      description:
        "Learn about Python's operators for performing operations on variables and values. This includes arithmetic, comparison, logical, and assignment operators.",
    },
    {
      id: 5,
      title: "Python If-Else Statements",
      description:
        "This lesson teaches you how to make decisions in your code using if, elif, and else statements. You'll learn how to create conditional logic in your programs.",
    },
    {
      id: 6,
      title: "Python For Loops",
      description:
        "Learn how to use for loops to iterate over sequences like lists, tuples, and strings. This lesson will teach you how to repeat actions efficiently in your code.",
    },
    {
      id: 7,
      title: "Python While Loops",
      description:
        "This lesson covers while loops, which execute a block of code as long as a condition is true. You'll learn when to use while loops and how to avoid infinite loops.",
    },
    {
      id: 8,
      title: "Python Functions",
      description:
        "Learn how to create and use functions in Python. Functions help you organize your code into reusable blocks, making your programs more modular and easier to understand.",
    },
    {
      id: 9,
      title: "Python Arrays",
      description:
        "This lesson introduces arrays in Python. You'll learn how to create, access, and manipulate arrays to store collections of items.",
    },
    {
      id: 10,
      title: "Python Math",
      description:
        "Learn about Python's math module and how to perform mathematical operations. This lesson covers basic arithmetic, mathematical functions, and constants.",
    },
    {
      id: 11,
      title: "Python Lists",
      description:
        "This lesson covers Python lists in depth. You'll learn how to create, access, modify, and iterate through lists, as well as common list methods and operations.",
    },
    {
      id: 12,
      title: "Python Tuples",
      description:
        "Learn about tuples in Python. Tuples are similar to lists but are immutable, meaning they cannot be changed after creation. You'll learn when and why to use tuples.",
    },
    {
      id: 13,
      title: "Python Sets",
      description:
        "This lesson introduces sets in Python. Sets are unordered collections of unique items. You'll learn how to create and use sets for tasks like removing duplicates.",
    },
    {
      id: 14,
      title: "Python Dictionaries",
      description:
        "Learn about dictionaries in Python. Dictionaries store data as key-value pairs, allowing you to quickly look up values using keys. This lesson covers creating, accessing, and modifying dictionaries.",
    },
    {
      id: 15,
      title: "Python File Handling",
      description:
        "This final lesson teaches you how to work with files in Python. You'll learn how to read from and write to files, which is essential for data processing and storage.",
    },
  ]

  // Get current milestone data
  const lessonData = milestonesData.find((m) => m.id === currentMilestone) || milestonesData[0]

  const [code, setCode] = useState(getStarterCode(currentMilestone))
  const [output, setOutput] = useState("")
  const [hints, setHints] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  // Add state to track if code has been successfully run
  const [hasRunSuccessfully, setHasRunSuccessfully] = useState<boolean>(false)

  // Define MILESTONE_ID
  const MILESTONE_ID = `milestone_${currentMilestone}`

  // Add useEffect to track last visited page
  useEffect(() => {
    // Store the current page as the last visited page
    localStorage.setItem("lastVisitedPage", `/code${currentMilestone > 1 ? currentMilestone : ""}`)

    // Check if code was previously completed successfully
    const wasSuccessful = localStorage.getItem(`code_${MILESTONE_ID}_success`)
    if (wasSuccessful === "true") {
      setIsSuccess(true)
    }
  }, [MILESTONE_ID, currentMilestone])

  // Add useEffect to check localStorage for successful run
  useEffect(() => {
    const hasSuccess = localStorage.getItem(`code_${MILESTONE_ID}_success`)
    if (hasSuccess === "true") {
      setIsSuccess(true)
    }
  }, [MILESTONE_ID])

  // Modify handleRunCode to store success state
  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput("")
    setHints("")
    setSuggestions("")
    setError("")
    setIsSuccess(false)

    try {
      console.log("Submitting code to /code-practice/code-submissions/")
      const response = await api.post("/code-practice/code-submissions/", {
        code,
        milestone_id: currentMilestone,
      })
      console.log("Code submission response:", response.data)

      // Extract data from response
      const { output, hints, suggestions } = response.data

      setOutput(output || "No output")
      setHints(hints || "")
      setSuggestions(suggestions || "")

      // If we got a response without errors, consider it successful
      setIsSuccess(true)

      // Store success in localStorage
      localStorage.setItem(`code_${MILESTONE_ID}_success`, "true")
    } catch (err: any) {
      console.error("Error submitting code:", err)
      setError(err.response?.data?.detail || "Error running code. Please try again.")
      setOutput(err.response?.data?.output || "")
    } finally {
      setIsRunning(false)
    }
  }

  const handleNextClick = () => {
    navigate(`/exercise${currentMilestone > 1 ? currentMilestone : ""}`)
  }

  const handlePreviousClick = () => {
    navigate(`/learn${currentMilestone > 1 ? currentMilestone : ""}`)
  }

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-block bg-[#10b3b3] text-white px-4 py-1 rounded-full text-sm font-medium">
            Milestone {currentMilestone}
          </span>

          <button onClick={() => navigate("/dashboard")} className="text-[#10b3b3] hover:text-[#0d9999] font-medium">
            Back to Dashboard
          </button>
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
    </div>
  )
}

export default CodePage
