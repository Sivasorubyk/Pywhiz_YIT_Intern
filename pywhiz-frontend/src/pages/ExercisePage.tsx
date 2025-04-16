"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Volume2, VolumeX, CheckCircle, AlertCircle } from "lucide-react"
import confetti from "canvas-confetti"
import { useAuth } from "../contexts/AuthContext"

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

const ExercisePage = () => {
  const navigate = useNavigate()
  const { milestoneId } = useParams<{ milestoneId?: string }>()
  const { addScore, addBadge } = useAuth()

  // Default to milestone 1 if no parameter is provided
  const currentMilestone = milestoneId ? Number.parseInt(milestoneId) : 1

  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [results, setResults] = useState<Record<number, boolean>>({})
  const [showResults, setShowResults] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [milestoneAchieved, setMilestoneAchieved] = useState(false)

  // Exercise data for all milestones
  const exercisesData: Exercise[] = [
    {
      id: 1,
      title: "Python Basics Quiz - Milestone 1",
      description: "This exercise tests your understanding of Python basics. Select the best answer for each question.",
      questions: [
        {
          id: 1,
          text: "What function is used to display output in Python?",
          options: ["console.log()", "print()", "echo()", "display()"],
          correctAnswer: 1,
        },
        {
          id: 2,
          text: "Which of the following is a valid variable name in Python?",
          options: ["2variable", "my-var", "my_var", "class"],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "What is the correct way to create a comment in Python?",
          options: [
            "// This is a comment",
            "/* This is a comment */",
            "# This is a comment",
            "<!-- This is a comment -->",
          ],
          correctAnswer: 2,
        },
      ],
      milestone: 1,
    },
    {
      id: 2,
      title: "Python Variables Quiz - Milestone 2",
      description: "Test your knowledge of Python variables and how they work.",
      questions: [
        {
          id: 1,
          text: "Which of the following is NOT a valid variable assignment in Python?",
          options: ["x = 5", "y = 'Hello'", "z = 3.14", "1a = 10"],
          correctAnswer: 3,
        },
        {
          id: 2,
          text: "What happens when you assign a new value to an existing variable?",
          options: [
            "Python creates a second variable with the same name",
            "Python raises an error",
            "The original value is overwritten",
            "Python keeps both values in memory",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "Which statement about Python variables is true?",
          options: [
            "Variables must be declared with a type before use",
            "Variables can change type during program execution",
            "Variables cannot contain numbers in their names",
            "Variables must start with a capital letter",
          ],
          correctAnswer: 1,
        },
      ],
      milestone: 2,
    },
    {
      id: 3,
      title: "Python Data Types Quiz - Milestone 3",
      description: "Test your understanding of Python's data types including numbers, strings, and booleans.",
      questions: [
        {
          id: 1,
          text: "Which of the following is NOT a basic data type in Python?",
          options: ["int", "string", "boolean", "array"],
          correctAnswer: 3,
        },
        {
          id: 2,
          text: "What is the data type of the value returned by the expression: 10 / 3",
          options: ["int", "float", "double", "decimal"],
          correctAnswer: 1,
        },
        {
          id: 3,
          text: "Which of the following is a valid boolean value in Python?",
          options: ["true", "True", "TRUE", "yes"],
          correctAnswer: 1,
        },
      ],
      milestone: 3,
    },
    {
      id: 4,
      title: "Python Operators Quiz - Milestone 4",
      description: "Test your knowledge of Python operators and how they work with different data types.",
      questions: [
        {
          id: 1,
          text: "What does the ** operator do in Python?",
          options: ["Multiplication", "Exponentiation", "Bitwise XOR", "String repetition"],
          correctAnswer: 1,
        },
        {
          id: 2,
          text: "What is the result of 7 % 3 in Python?",
          options: ["2.33", "2", "1", "0"],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "Which operator is used for string concatenation in Python?",
          options: ["+", "&", ".", "||"],
          correctAnswer: 0,
        },
      ],
      milestone: 4,
    },
    {
      id: 5,
      title: "Python If-Else Quiz - Milestone 5",
      description: "Test your understanding of conditional statements in Python.",
      questions: [
        {
          id: 1,
          text: "What is the correct syntax for an if statement in Python?",
          options: [
            "if (x > 5) { print('Greater') }",
            "if x > 5: print('Greater')",
            "if x > 5 then print('Greater')",
            "if x > 5 print('Greater') end",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          text: "How do you write an if-else statement in Python?",
          options: [
            "if x > 5: print('Greater') else: print('Less')",
            "if x > 5 { print('Greater') } else { print('Less') }",
            "if x > 5 then print('Greater') else print('Less') endif",
            "if (x > 5) print('Greater') else print('Less')",
          ],
          correctAnswer: 0,
        },
        {
          id: 3,
          text: "What is the purpose of the 'elif' keyword in Python?",
          options: [
            "It's a syntax error, the correct keyword is 'elseif'",
            "It's used to create a nested if statement",
            "It's used to check additional conditions after an 'if' statement",
            "It's used to end an if-else block",
          ],
          correctAnswer: 2,
        },
      ],
      milestone: 5,
    },
    {
      id: 6,
      title: "Python For Loops Quiz - Milestone 6",
      description: "Test your knowledge of for loops in Python.",
      questions: [
        {
          id: 1,
          text: "What is the output of the following code?\nfor i in range(3):\n    print(i)",
          options: ["0 1 2", "1 2 3", "0 1 2 3", "1 2"],
          correctAnswer: 0,
        },
        {
          id: 2,
          text: "How do you iterate over a list called 'fruits' in Python?",
          options: [
            "for (i=0; i<len(fruits); i++) { print(fruits[i]) }",
            "for i in range(fruits): print(i)",
            "for fruit in fruits: print(fruit)",
            "foreach (fruit in fruits) print(fruit)",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "What does the range(1, 5) function return?",
          options: [
            "A list containing [1, 2, 3, 4, 5]",
            "A sequence of numbers starting from 1 and ending at 5",
            "A sequence of numbers starting from 1 and ending at 4",
            "A list containing [1, 5]",
          ],
          correctAnswer: 2,
        },
      ],
      milestone: 6,
    },
    {
      id: 7,
      title: "Python While Loops Quiz - Milestone 7",
      description: "Test your understanding of while loops in Python.",
      questions: [
        {
          id: 1,
          text: "What is the correct syntax for a while loop in Python?",
          options: [
            "while (x > 0) { x = x - 1; }",
            "while x > 0: x = x - 1",
            "while x > 0 do x = x - 1 end",
            "while (x > 0) x = x - 1",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          text: "How do you break out of a while loop in Python?",
          options: ["exit loop", "stop", "break", "return"],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "What happens if the condition in a while loop never becomes false?",
          options: [
            "Python automatically stops after 1000 iterations",
            "The loop runs indefinitely (infinite loop)",
            "Python raises a TimeoutError",
            "The loop exits and continues with the next statement",
          ],
          correctAnswer: 1,
        },
      ],
      milestone: 7,
    },
    {
      id: 8,
      title: "Python Functions Quiz - Milestone 8",
      description: "Test your knowledge of functions in Python.",
      questions: [
        {
          id: 1,
          text: "What is the correct way to define a function in Python?",
          options: ["function myFunc(): ...", "def myFunc(): ...", "define myFunc(): ...", "func myFunc(): ..."],
          correctAnswer: 1,
        },
        {
          id: 2,
          text: "How do you return a value from a function in Python?",
          options: ["return value", "output value", "print value", "yield value"],
          correctAnswer: 0,
        },
        {
          id: 3,
          text: "What happens if a function doesn't have a return statement?",
          options: ["It returns 0", "It returns None", "It raises an error", "It returns the last calculated value"],
          correctAnswer: 1,
        },
      ],
      milestone: 8,
    },
    {
      id: 9,
      title: "Python Arrays Quiz - Milestone 9",
      description: "Test your understanding of arrays in Python.",
      questions: [
        {
          id: 1,
          text: "Which module provides array support in Python?",
          options: ["array", "arrays", "list", "collection"],
          correctAnswer: 0,
        },
        {
          id: 2,
          text: "What is the main difference between Python lists and arrays?",
          options: [
            "Lists can store mixed data types, arrays store only one type",
            "Arrays can be multi-dimensional, lists cannot",
            "Lists are mutable, arrays are immutable",
            "There is no difference",
          ],
          correctAnswer: 0,
        },
        {
          id: 3,
          text: "How do you create an array of integers in Python?",
          options: ["array.array('i', [1, 2, 3])", "array([1, 2, 3])", "Array(1, 2, 3)", "new Array('i', [1, 2, 3])"],
          correctAnswer: 0,
        },
      ],
      milestone: 9,
    },
    {
      id: 10,
      title: "Python Math Quiz - Milestone 10",
      description: "Test your knowledge of mathematical operations in Python.",
      questions: [
        {
          id: 1,
          text: "Which module provides mathematical functions in Python?",
          options: ["math", "mathlib", "calculator", "numeric"],
          correctAnswer: 0,
        },
        {
          id: 2,
          text: "How do you calculate the square root of a number in Python?",
          options: ["num.sqrt()", "sqrt(num)", "math.sqrt(num)", "num^0.5"],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "What is the value of math.pi in Python?",
          options: ["3", "3.14", "3.14159...", "22/7"],
          correctAnswer: 2,
        },
      ],
      milestone: 10,
    },
    {
      id: 11,
      title: "Python Lists Quiz - Milestone 11",
      description: "Test your understanding of lists in Python.",
      questions: [
        {
          id: 1,
          text: "How do you create an empty list in Python?",
          options: ["list()", "[]", "new List()", "Both A and B"],
          correctAnswer: 3,
        },
        {
          id: 2,
          text: "How do you add an element to the end of a list?",
          options: ["list.add(element)", "list.push(element)", "list.append(element)", "list.insert(element)"],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "What does the list method sort() do?",
          options: [
            "Returns a new sorted list",
            "Sorts the list in-place",
            "Counts the number of occurrences of each element",
            "Reverses the list",
          ],
          correctAnswer: 1,
        },
      ],
      milestone: 11,
    },
    {
      id: 12,
      title: "Python Tuples Quiz - Milestone 12",
      description: "Test your knowledge of tuples in Python.",
      questions: [
        {
          id: 1,
          text: "Which of the following correctly creates a tuple in Python?",
          options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "<1, 2, 3>"],
          correctAnswer: 0,
        },
        {
          id: 2,
          text: "What is the main characteristic of a tuple in Python?",
          options: [
            "It can only contain numbers",
            "It is ordered and mutable",
            "It is ordered and immutable",
            "It cannot contain duplicate elements",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "How do you access the second element in a tuple named 'my_tuple'?",
          options: ["my_tuple[1]", "my_tuple[2]", "my_tuple.get(1)", "my_tuple.second()"],
          correctAnswer: 0,
        },
      ],
      milestone: 12,
    },
    {
      id: 13,
      title: "Python Sets Quiz - Milestone 13",
      description: "Test your understanding of sets in Python.",
      questions: [
        {
          id: 1,
          text: "How do you create a set in Python?",
          options: ["set(1, 2, 3)", "{1, 2, 3}", "Set[1, 2, 3]", "new Set(1, 2, 3)"],
          correctAnswer: 1,
        },
        {
          id: 2,
          text: "What is a key characteristic of sets in Python?",
          options: [
            "They maintain insertion order",
            "They can contain duplicate elements",
            "They cannot contain mutable elements",
            "They are accessed by index",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          text: "Which method adds an element to a set?",
          options: ["set.append()", "set.insert()", "set.add()", "set.push()"],
          correctAnswer: 2,
        },
      ],
      milestone: 13,
    },
    {
      id: 14,
      title: "Python Dictionaries Quiz - Milestone 14",
      description: "Test your knowledge of dictionaries in Python.",
      questions: [
        {
          id: 1,
          text: "How do you create a dictionary in Python?",
          options: [
            "dict(key1=value1, key2=value2)",
            "{key1: value1, key2: value2}",
            "Dictionary[key1, value1, key2, value2]",
            "Both A and B",
          ],
          correctAnswer: 3,
        },
        {
          id: 2,
          text: "How do you access the value for a key in a dictionary?",
          options: ["dict.get(key)", "dict[key]", "dict.value(key)", "Both A and B"],
          correctAnswer: 3,
        },
        {
          id: 3,
          text: "What happens if you try to access a key that doesn't exist in a dictionary?",
          options: [
            "It returns None",
            "It returns an empty string",
            "It raises a KeyError",
            "It creates the key with a None value",
          ],
          correctAnswer: 2,
        },
      ],
      milestone: 14,
    },
    {
      id: 15,
      title: "Python File Handling Quiz - Milestone 15",
      description: "Test your understanding of file handling in Python.",
      questions: [
        {
          id: 1,
          text: "What is the correct way to open a file for reading in Python?",
          options: [
            "open('file.txt', 'r')",
            "file.open('file.txt', 'read')",
            "open_file('file.txt')",
            "read('file.txt')",
          ],
          correctAnswer: 0,
        },
        {
          id: 2,
          text: "What does the 'with' statement do when opening files?",
          options: [
            "It makes file operations faster",
            "It automatically closes the file when the block is exited",
            "It allows multiple files to be opened simultaneously",
            "It prevents other programs from accessing the file",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          text: "How do you write to a file in Python?",
          options: ["file.write('text')", "write(file, 'text')", "file.put('text')", "file << 'text'"],
          correctAnswer: 0,
        },
      ],
      milestone: 15,
    },
  ]

  // Get current exercise data
  const exerciseData = exercisesData.find((e) => e.milestone === currentMilestone) || exercisesData[0]

  // Add constant for milestone ID
  const MILESTONE_ID = `milestone_${currentMilestone}`
  const NEXT_MILESTONE = currentMilestone + 1

  // Add useEffect to check localStorage for completed state
  useEffect(() => {
    // Store the current page as the last visited page
    localStorage.setItem("lastVisitedPage", `/exercise${currentMilestone > 1 ? currentMilestone : ""}`)

    // Check if exercise was previously completed
    const wasCompleted = localStorage.getItem(`exercise_${MILESTONE_ID}_completed`)
    if (wasCompleted === "true") {
      setShowResults(true)
      setMilestoneAchieved(true)
    }
  }, [MILESTONE_ID, currentMilestone])

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

      // Store completion in localStorage
      localStorage.setItem(`exercise_${MILESTONE_ID}_completed`, "true")

      // Add score for completing the exercise
      addScore(20)

      // Add badge for completing milestone
      if (currentMilestone === 5) {
        addBadge("Halfway There!")
      } else if (currentMilestone === 15) {
        addBadge("Python Master!")
      }

      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const handleNextClick = () => {
    // Navigate to the next milestone's learn page
    if (currentMilestone < 15) {
      navigate(`/learn${NEXT_MILESTONE}`)
    } else {
      // If this is the last milestone, go to dashboard
      navigate("/dashboard")
    }
  }

  const handlePreviousClick = () => {
    navigate(`/code${currentMilestone > 1 ? currentMilestone : ""}`)
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
              <p>You've reached Milestone {currentMilestone}! Keep up the great work.</p>
            </div>
          </div>
        )}

        {milestoneAchieved && (
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
            onClick={handlePreviousClick}
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
              {currentMilestone < 15 ? "Next Milestone" : "Complete Course"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExercisePage
