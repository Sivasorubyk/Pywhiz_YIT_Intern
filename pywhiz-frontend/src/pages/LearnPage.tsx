"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Play, Pause, Volume2, Maximize2, VolumeX, Award } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import confetti from "canvas-confetti"

const LearnPage = () => {
  const navigate = useNavigate()
  const { milestoneId } = useParams<{ milestoneId?: string }>()
  const { user, updateUserProgress, addScore, addBadge } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoWatched, setVideoWatched] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false)

  // Default to milestone 1 if no parameter is provided
  const currentMilestone = milestoneId ? Number.parseInt(milestoneId) : 1
  const VIDEO_ID = 1000 + currentMilestone

  // Milestone content data
  const milestonesData = [
    {
      id: 1,
      title: "Introduction to Python",
      description:
        "In this lesson, we will explore the basics of Python, one of the most popular programming languages. You'll learn about syntax, comments, and user input. By the end of this lesson, you'll be able to write your first Python program and understand how it runs.",
      videoUrl: "/videos/intro.mp4",
      funFact:
        "Python was named after the British comedy group Monty Python, not the snake! The creator, Guido van Rossum, was a fan of Monty Python's Flying Circus.",
    },
    {
      id: 2,
      title: "Python Variables",
      description:
        "In this lesson, you'll learn about variables in Python. Variables are containers for storing data values. You'll learn how to create, name, and use variables in your Python programs.",
      videoUrl: "/videos/variables.mp4",
      funFact:
        "In Python, you don't need to declare variable types explicitly. Python automatically determines the variable type based on the assigned value!",
    },
    {
      id: 3,
      title: "Python Data Types",
      description:
        "This lesson covers Python's built-in data types including numbers, strings, and booleans. You'll learn how to work with different types of data and convert between them.",
      videoUrl: "/videos/datatypes.mp4",
      funFact: "Python has a special data type called 'None' which represents the absence of a value or a null value.",
    },
    {
      id: 4,
      title: "Python Operators",
      description:
        "Learn about Python's operators for performing operations on variables and values. This includes arithmetic, comparison, logical, and assignment operators.",
      videoUrl: "/videos/operators.mp4",
      funFact:
        "Python uses the '**' operator for exponentiation. For example, 2**3 equals 8 (2 raised to the power of 3).",
    },
    {
      id: 5,
      title: "Python If-Else Statements",
      description:
        "This lesson teaches you how to make decisions in your code using if, elif, and else statements. You'll learn how to create conditional logic in your programs.",
      videoUrl: "/videos/ifelse.mp4",
      funFact:
        "Python uses indentation to define code blocks instead of curly braces {} like many other programming languages.",
    },
    {
      id: 6,
      title: "Python For Loops",
      description:
        "Learn how to use for loops to iterate over sequences like lists, tuples, and strings. This lesson will teach you how to repeat actions efficiently in your code.",
      videoUrl: "/videos/forloops.mp4",
      funFact:
        "Python's for loops are actually 'for-each' loops that iterate over items in a sequence, rather than incrementing a counter variable.",
    },
    {
      id: 7,
      title: "Python While Loops",
      description:
        "This lesson covers while loops, which execute a block of code as long as a condition is true. You'll learn when to use while loops and how to avoid infinite loops.",
      videoUrl: "/videos/whileloops.mp4",
      funFact:
        "Python has a special 'else' clause for loops that executes when the loop condition becomes false, but not when the loop is terminated by a break statement.",
    },
    {
      id: 8,
      title: "Python Functions",
      description:
        "Learn how to create and use functions in Python. Functions help you organize your code into reusable blocks, making your programs more modular and easier to understand.",
      videoUrl: "/videos/functions.mp4",
      funFact:
        "In Python, functions are 'first-class citizens', which means they can be passed as arguments to other functions, returned from functions, and assigned to variables.",
    },
    {
      id: 9,
      title: "Python Arrays",
      description:
        "This lesson introduces arrays in Python. You'll learn how to create, access, and manipulate arrays to store collections of items.",
      videoUrl: "/videos/arrays.mp4",
      funFact:
        "Python doesn't have built-in array data structures, but it has lists which are more versatile. For true arrays, Python programmers use the NumPy library.",
    },
    {
      id: 10,
      title: "Python Math",
      description:
        "Learn about Python's math module and how to perform mathematical operations. This lesson covers basic arithmetic, mathematical functions, and constants.",
      videoUrl: "/videos/math.mp4",
      funFact:
        "Python's math module includes a constant for pi (math.pi) that gives you the value of π to 15 decimal places!",
    },
    {
      id: 11,
      title: "Python Lists",
      description:
        "This lesson covers Python lists in depth. You'll learn how to create, access, modify, and iterate through lists, as well as common list methods and operations.",
      videoUrl: "/videos/lists.mp4",
      funFact:
        "Python lists can contain items of different types. You can mix integers, strings, and even other lists within a single list!",
    },
    {
      id: 12,
      title: "Python Tuples",
      description:
        "Learn about tuples in Python. Tuples are similar to lists but are immutable, meaning they cannot be changed after creation. You'll learn when and why to use tuples.",
      videoUrl: "/videos/tuples.mp4",
      funFact:
        "A tuple with just one item needs a trailing comma, like (1,). Without the comma, Python treats it as a regular number in parentheses.",
    },
    {
      id: 13,
      title: "Python Sets",
      description:
        "This lesson introduces sets in Python. Sets are unordered collections of unique items. You'll learn how to create and use sets for tasks like removing duplicates.",
      videoUrl: "/videos/sets.mp4",
      funFact:
        "Python sets implement mathematical set operations like union, intersection, and difference, making them perfect for comparing collections of data.",
    },
    {
      id: 14,
      title: "Python Dictionaries",
      description:
        "Learn about dictionaries in Python. Dictionaries store data as key-value pairs, allowing you to quickly look up values using keys. This lesson covers creating, accessing, and modifying dictionaries.",
      videoUrl: "/videos/dictionaries.mp4",
      funFact:
        "As of Python 3.7, dictionaries maintain the order of items as they are inserted. In earlier versions, dictionaries were unordered.",
    },
    {
      id: 15,
      title: "Python File Handling",
      description:
        "This final lesson teaches you how to work with files in Python. You'll learn how to read from and write to files, which is essential for data processing and storage.",
      videoUrl: "/videos/filehandling.mp4",
      funFact:
        "Python's 'with' statement automatically takes care of closing files for you, even if errors occur during file operations. This is called context management.",
    },
  ]

  // Get current milestone data
  const lessonData = milestonesData.find((m) => m.id === currentMilestone) || milestonesData[0]

  // Check if video was previously completed
  useEffect(() => {
    // Check if video was previously completed
    if (user && user.completedVideos.includes(VIDEO_ID)) {
      setVideoWatched(true)
    }

    // Store the watched state in localStorage as a backup
    const isWatched = localStorage.getItem(`video_${VIDEO_ID}_watched`)
    if (isWatched === "true") {
      setVideoWatched(true)
    }
  }, [user, VIDEO_ID])

  // Add useEffect to track last visited page
  useEffect(() => {
    // Store the current page as the last visited page
    localStorage.setItem("lastVisitedPage", `/learn${currentMilestone > 1 ? currentMilestone : ""}`)
  }, [currentMilestone])

  // Handle video events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)

      // Mark as watched when 90% complete
      if (!videoWatched && videoRef.current.currentTime > videoRef.current.duration * 0.9) {
        setVideoWatched(true)

        // Store in localStorage
        localStorage.setItem(`video_${VIDEO_ID}_watched`, "true")

        // Update user progress
        if (user) {
          updateUserProgress(currentMilestone, VIDEO_ID)

          // Add points for completing the video
          addScore(10)

          // If this is the first video, award a badge
          if (currentMilestone === 1 && !user.badges.includes("First Step")) {
            addBadge("First Step")
            setShowBadgeAnimation(true)

            // Trigger confetti
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })
          }
        }
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleNextClick = () => {
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

        <div className="grid md:grid-cols-2 gap-6">
          {/* Video Player */}
          <div className="bg-[#003366] rounded-xl overflow-hidden shadow-lg">
            <div className="relative aspect-w-16 aspect-h-9 bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/images/video-thumbnail.jpg"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setVideoWatched(true)}
                onError={() => console.error("Video failed to load")}
              >
                <source src={lessonData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="bg-white bg-opacity-80 rounded-full p-4 shadow-lg hover:bg-opacity-100 transition-all duration-300"
                  >
                    <Play className="h-8 w-8 text-[#003366]" />
                  </button>
                </div>
              )}

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                <div
                  className="h-full bg-[#10b3b3]"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-[#003366] text-white p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration || 267)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <button onClick={handleFullscreen}>
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="flex flex-col">
            <div className="bg-white rounded-xl p-6 shadow-md mb-6 flex-grow">
              <h2 className="text-xl font-bold mb-4">{lessonData.title}</h2>
              <p className="text-gray-700">{lessonData.description}</p>

              {/* Fun fact box */}
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Fun Fact:</span> {lessonData.funFact}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md flex items-center">
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
              <div>
                <p className="text-gray-700">
                  An exercise will follow after you press the next button to test your knowledge.
                </p>
              </div>
              <button
                onClick={handleNextClick}
                className={`ml-auto px-6 py-2 rounded-md transition-all duration-300 ${
                  videoWatched
                    ? "bg-[#10b3b3] hover:bg-[#0d9999] text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!videoWatched}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Badge animation */}
        {showBadgeAnimation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl">
              <div className="text-center">
                <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#003366] mb-2">New Badge Earned!</h3>
                <p className="text-lg text-gray-700 mb-4">First Step</p>
                <p className="text-sm text-gray-600 mb-6">You've completed your first Python lesson!</p>
                <button
                  onClick={() => setShowBadgeAnimation(false)}
                  className="bg-[#10b3b3] text-white px-6 py-2 rounded-lg hover:bg-[#0d9999]"
                >
                  Awesome!
                </button>
              </div>
            </div>
          </div>
        )}

        {videoWatched && !showBadgeAnimation && (
          <div className="fixed bottom-4 right-4 z-40 bg-white rounded-lg shadow-lg p-2 max-w-xs animate-bounce">
            <div className="flex items-center">
              <img
                src="/images/encouragement.gif"
                alt="Great job!"
                className="w-16 h-16 rounded-md mr-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=80&width=80"
                }}
              />
              <div>
                <p className="font-bold text-[#003366]">Great job!</p>
                <p className="text-sm text-gray-600">Keep going! You're doing amazing!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LearnPage
