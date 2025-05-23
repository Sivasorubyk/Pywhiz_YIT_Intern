"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Volume2, VolumeX, AlertCircle, CheckCircle, HelpCircle, Play, Pause, Maximize2, Video } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import {
  fetchCodeQuestions,
  fetchMilestones,
  fetchLearnContent,
  submitCode,
  type CodeQuestion,
  type Milestone,
  type LearnContent,
} from "../services/learnApi"

const CodePage = () => {
  const navigate = useNavigate()
  const { userProgress, isCodeCompleted, markCodeCompleted } = useAuth()
  const { milestoneId } = useParams()
  const videoRef = useRef<HTMLVideoElement>(null)
  const explanationVideoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [milestone, setMilestone] = useState<Milestone | null>(null)
  const [codeQuestions, setCodeQuestions] = useState<CodeQuestion[]>([])
  const [learnContent, setLearnContent] = useState<LearnContent | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [hints, setHints] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [localCodeSuccess, setLocalCodeSuccess] = useState(false)
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({})
  const [inputValue, setInputValue] = useState("")
  const [showInputHelp, setShowInputHelp] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExplanationPlaying, setIsExplanationPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [explanationCurrentTime, setExplanationCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [explanationDuration, setExplanationDuration] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [questionOutputs, setQuestionOutputs] = useState<Record<string, string>>({})
  const [pointsAwarded, setPointsAwarded] = useState<Record<string, boolean>>({})

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

  // Fetch milestone, code questions, and learn content
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
          setCodeQuestions(questions)
          setCode(questions[0].example_code)

          // Check which questions are completed
          const completed: Record<string, boolean> = {}
          const awarded: Record<string, boolean> = {}
          for (const question of questions) {
            // Check if this specific question is completed
            // We'll use localStorage for this
            const isCompleted = localStorage.getItem(`code_success_${question.id}`) === "true"
            completed[question.id] = isCompleted

            // Check if points were already awarded
            const isAwarded = localStorage.getItem(`points_awarded_${question.id}`) === "true"
            awarded[question.id] = isAwarded
          }
          setCompletedQuestions(completed)
          setPointsAwarded(awarded)
        } else {
          setError("No code questions available for this milestone")
        }

        // Fetch learn content for this milestone to get the video
        const content = await fetchLearnContent(milestoneId!)
        if (Array.isArray(content) && content.length > 0) {
          setLearnContent(content[0])
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

  // Video player controls
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleExplanationTimeUpdate = () => {
    if (explanationVideoRef.current) {
      setExplanationCurrentTime(explanationVideoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleExplanationLoadedMetadata = () => {
    if (explanationVideoRef.current) {
      setExplanationDuration(explanationVideoRef.current.duration)
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

  const toggleExplanationPlay = () => {
    if (explanationVideoRef.current) {
      if (isExplanationPlaying) {
        explanationVideoRef.current.pause()
      } else {
        explanationVideoRef.current.play()
      }
      setIsExplanationPlaying(!isExplanationPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
    if (explanationVideoRef.current) {
      explanationVideoRef.current.muted = !isMuted
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleExplanationFullscreen = () => {
    if (explanationVideoRef.current) {
      if (explanationVideoRef.current.requestFullscreen) {
        explanationVideoRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Modify handleRunCode to store success state in the backend
  const handleRunCode = async () => {
    const currentQuestion = codeQuestions[currentQuestionIndex]
    if (!currentQuestion || !milestoneId) return

    setIsRunning(true)
    setHints("")
    setSuggestions("")
    setError("")
    // Don't reset output here to preserve it during loading
    // setOutput("")
    setIsSuccess(false)

    try {
      // Send the code and input value to the backend
      const response = await submitCode(currentQuestion.id, code, [], inputValue)

      // Always display the output, regardless of success or failure
      // This ensures print statements are always visible
      setOutput(response.output || "No output")

      // Store output by question ID for persistence
      setQuestionOutputs((prev) => ({
        ...prev,
        [currentQuestion.id]: response.output || "No output",
      }))

      setHints(response.hints || "")
      setSuggestions(response.suggestions || "")

      // If we got a response without errors, consider it successful
      setIsSuccess(response.is_correct)

      // Store success in localStorage and update completedQuestions
      if (response.is_correct) {
        localStorage.setItem(`code_success_${currentQuestion.id}`, "true")
        localStorage.setItem(`code_output_${currentQuestion.id}`, response.output || "")

        setCompletedQuestions((prev) => ({
          ...prev,
          [currentQuestion.id]: true,
        }))

        // Check if points were already awarded for this question
        if (!pointsAwarded[currentQuestion.id]) {
          // Mark points as awarded to prevent duplicate points
          localStorage.setItem(`points_awarded_${currentQuestion.id}`, "true")
          setPointsAwarded((prev) => ({
            ...prev,
            [currentQuestion.id]: true,
          }))
        }

        // Check if all questions are now completed
        const updatedCompleted = {
          ...completedQuestions,
          [currentQuestion.id]: true,
        }

        const allCompleted = codeQuestions.every((q) => updatedCompleted[q.id])

        // If all questions are completed, mark the milestone as code completed
        if (allCompleted) {
          markCodeCompleted(milestoneId)
          setLocalCodeSuccess(true)
        }
      }
    } catch (err: any) {
      console.error("Error submitting code:", err)
      setError(err.response?.data?.detail || "Error running code. Please try again.")

      // Still display any output that might have been generated before the error
      if (err.response?.data?.output) {
        setOutput(err.response.data.output)

        // Store output by question ID for persistence
        setQuestionOutputs((prev) => ({
          ...prev,
          [currentQuestion.id]: err.response.data.output,
        }))
      }
    } finally {
      setIsRunning(false)
    }
  }

  const handleNextClick = () => {
    if (currentQuestionIndex < codeQuestions.length - 1) {
      // Go to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // All questions completed, go to exercise page
      navigate(`/exercise/${milestoneId}`)
    }
  }

  const handlePreviousClick = () => {
    navigate(`/learn/${milestoneId}`)
  }

  const currentQuestion = codeQuestions[currentQuestionIndex] || null

  const allQuestionsCompleted = codeQuestions.length > 0 && codeQuestions.every((q) => completedQuestions[q.id])

  useEffect(() => {
    if (currentQuestion) {
      setCode(currentQuestion.example_code)
      // Don't reset output if it exists for this question
      if (!output) {
        setOutput("")
      }
      setHints("")
      setSuggestions("")
      setError("")

      // Check if this question was previously completed
      const wasCompleted = completedQuestions[currentQuestion.id] || false
      setIsSuccess(wasCompleted)

      setInputValue("")
    }
  }, [currentQuestion, completedQuestions])

  // Load stored outputs when changing questions
  useEffect(() => {
    if (currentQuestion) {
      // Check if we have output for this question in state
      if (questionOutputs[currentQuestion.id]) {
        setOutput(questionOutputs[currentQuestion.id])
      } else {
        // Try to load from localStorage
        const storedOutput = localStorage.getItem(`code_output_${currentQuestion.id}`)
        if (storedOutput) {
          setOutput(storedOutput)
          setQuestionOutputs((prev) => ({
            ...prev,
            [currentQuestion.id]: storedOutput,
          }))
        }
      }
    }
  }, [currentQuestionIndex, currentQuestion])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b3b3]"></div>
      </div>
    )
  }

  if (!milestone || codeQuestions.length === 0) {
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
      <div className="container mx-auto px-4 py-4 md:py-8" ref={contentRef}>
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-block bg-[#10b3b3] text-white px-4 py-1 rounded-full text-sm font-medium">
            {milestone.title}
          </span>

          <button onClick={() => navigate("/dashboard")} className="text-[#10b3b3] hover:text-[#0d9999] font-medium">
            Back to Dashboard
          </button>
        </div>

        <div className={`grid ${isMobile ? "grid-cols-1" : "md:grid-cols-2"} gap-4 md:gap-6`}>
          {/* Left Column - Lesson Info & Output */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg md:text-xl font-bold">{milestone.title} - Coding Exercise</h2>
                  <div className="flex items-center">
                    <span className="text-xs md:text-sm text-gray-600">
                      Question {currentQuestionIndex + 1} of {codeQuestions.length}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-[#10b3b3] rounded-full"
                    style={{
                      width: `${(Object.values(completedQuestions).filter(Boolean).length / codeQuestions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm md:text-base">{milestone.description}</p>

              <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200 mb-4">
                <div className="flex justify-between items-start mb-2 md:mb-4">
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-2 md:mr-3 ${
                        completedQuestions[currentQuestion?.id]
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {completedQuestions[currentQuestion?.id] ? (
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                      ) : (
                        currentQuestionIndex + 1
                      )}
                    </div>
                    <h3 className="font-bold text-sm md:text-base">Exercise {currentQuestionIndex + 1}</h3>
                  </div>
                </div>
                {/* Preserve formatting for question */}
                <div
                  className="text-gray-700 text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: currentQuestion?.question || "" }}
                ></div>
              </div>

              {currentQuestion?.hint && (
                <div className="bg-yellow-50 p-3 md:p-4 rounded-lg border border-yellow-200 mb-4">
                  <h3 className="font-bold mb-2 text-sm md:text-base">Hint</h3>
                  {/* Preserve formatting for hint */}
                  <div
                    className="text-gray-700 text-sm md:text-base"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.hint }}
                  ></div>
                </div>
              )}

              {/* Show Video button after hint */}
              {learnContent && (
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="w-full mb-4 flex items-center justify-center bg-[#e6f7f7] hover:bg-[#d6f0f0] text-[#10b3b3] font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <Video className="h-4 w-4 mr-2" />
                  {showVideo ? "Hide Video" : "Show Video"}
                </button>
              )}

              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
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
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                  ) : (
                    <Volume2 className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Video Player (Collapsible) */}
            {showVideo && learnContent && (
              <div className="bg-[#003366] rounded-xl overflow-hidden shadow-lg">
                <div className="relative aspect-w-16 aspect-h-9 bg-black">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster="/images/video-thumbnail.jpg"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onError={() => console.error("Video failed to load")}
                  >
                    <source src={learnContent.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlay}
                        className="bg-white bg-opacity-80 rounded-full p-2 md:p-4 shadow-lg hover:bg-opacity-100 transition-all duration-300"
                      >
                        <Play className="h-6 w-6 md:h-8 md:w-8 text-[#003366]" />
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
                <div className="bg-[#003366] text-white p-2 md:p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button onClick={togglePlay}>
                      {isPlaying ? (
                        <Pause className="h-4 w-4 md:h-5 md:w-5" />
                      ) : (
                        <Play className="h-4 w-4 md:h-5 md:w-5" />
                      )}
                    </button>
                    <span className="text-xs md:text-sm">
                      {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <button onClick={toggleMute}>
                      {isMuted ? (
                        <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
                      ) : (
                        <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                      )}
                    </button>
                    <button onClick={handleFullscreen}>
                      <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base md:text-lg font-semibold">Output</h3>
                <button
                  onClick={() => setShowInputHelp(!showInputHelp)}
                  className="flex items-center text-xs md:text-sm text-blue-600 hover:text-blue-800"
                >
                  <HelpCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  Help with Input
                </button>
              </div>

              {showInputHelp && (
                <div className="mb-4 p-2 md:p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
                  <h4 className="font-medium mb-1 text-xs md:text-sm">How to provide input:</h4>
                  <p className="text-xs mb-2">
                    If your code uses <code>input()</code> to get user input, enter each input on a separate line in the
                    input box below. For example:
                  </p>
                  <pre className="bg-white p-2 rounded text-xs mb-2">
                    {`# For code like:
name = input("Enter your name: ")
age = input("Enter your age: ")

# Enter in the input box:
John
12`}
                  </pre>
                  <p className="text-xs">Each line will be sent as a separate input in the order they appear.</p>
                </div>
              )}

              {error && (
                <div className="mb-4 p-2 md:p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
                  <AlertCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-xs md:text-sm">{error}</span>
                </div>
              )}

              {isSuccess && (
                <div className="mb-4 p-2 md:p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg flex items-start">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-xs md:text-sm">Code executed successfully!</span>
                </div>
              )}

              <div className="text-gray-700 mb-4">
                {/* Always display output, regardless of success or failure */}
                <pre className="bg-gray-100 p-2 md:p-3 rounded-md overflow-auto max-h-32 md:max-h-48 text-xs md:text-sm whitespace-pre-wrap">
                  {output || questionOutputs[currentQuestion?.id] || "Run your code to see the output here."}
                </pre>
              </div>

              <div className="mb-4">
                <label htmlFor="input" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Input (one per line):
                </label>
                <textarea
                  id="input"
                  rows={3}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter inputs here...\nLine 1 = first input\nLine 2 = second input"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b3b3] font-mono text-xs md:text-sm"
                />
              </div>

              {hints && (
                <div className="mt-4">
                  <h4 className="font-medium mb-1 text-xs md:text-sm">Hints:</h4>
                  <div className="bg-blue-50 p-2 md:p-3 rounded-md text-xs md:text-sm">{hints}</div>
                </div>
              )}

              {suggestions && (
                <div className="mt-4">
                  <h4 className="font-medium mb-1 text-xs md:text-sm">Suggestions:</h4>
                  <div className="bg-purple-50 p-2 md:p-3 rounded-md text-xs md:text-sm">{suggestions}</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Code Editor */}
          <div className="flex flex-col space-y-4">
            <div className="bg-[#1e1e1e] rounded-xl p-3 md:p-4 shadow-md flex-grow">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full min-h-[250px] md:min-h-[300px] p-3 md:p-4 font-mono text-xs md:text-sm bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#10b3b3] resize-none"
                placeholder="Write your Python code here..."
              />
            </div>

            {/* Explanation Video - Now shown by default */}
            {currentQuestion?.video_url_2 && (
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base md:text-lg font-semibold">Explanation Video</h3>
                </div>

                <div className="bg-[#003366] rounded-xl overflow-hidden shadow-lg mt-2">
                  <div className="relative aspect-w-16 aspect-h-9 bg-black">
                    <video
                      ref={explanationVideoRef}
                      className="w-full h-full object-cover"
                      poster="/images/video-thumbnail.jpg"
                      onTimeUpdate={handleExplanationTimeUpdate}
                      onLoadedMetadata={handleExplanationLoadedMetadata}
                      onError={() => console.error("Explanation video failed to load")}
                    >
                      <source src={currentQuestion.video_url_2} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {!isExplanationPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={toggleExplanationPlay}
                          className="bg-white bg-opacity-80 rounded-full p-2 md:p-4 shadow-lg hover:bg-opacity-100 transition-all duration-300"
                        >
                          <Play className="h-6 w-6 md:h-8 md:w-8 text-[#003366]" />
                        </button>
                      </div>
                    )}

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                      <div
                        className="h-full bg-[#10b3b3]"
                        style={{ width: `${(explanationCurrentTime / (explanationDuration || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-[#003366] text-white p-2 md:p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button onClick={toggleExplanationPlay}>
                        {isExplanationPlaying ? (
                          <Pause className="h-4 w-4 md:h-5 md:w-5" />
                        ) : (
                          <Play className="h-4 w-4 md:h-5 md:w-5" />
                        )}
                      </button>
                      <span className="text-xs md:text-sm">
                        {formatTime(explanationCurrentTime)} / {formatTime(explanationDuration || 0)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <button onClick={toggleMute}>
                        {isMuted ? (
                          <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
                        ) : (
                          <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                        )}
                      </button>
                      <button onClick={handleExplanationFullscreen}>
                        <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1)
                  } else {
                    handlePreviousClick()
                  }
                }}
                className="px-3 md:px-6 py-2 bg-[#66cccc] hover:bg-[#55bbbb] text-white rounded-md transition-all duration-300 text-xs md:text-sm"
              >
                {currentQuestionIndex === 0 ? "Previous" : "Previous Question"}
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className={`px-3 md:px-6 py-2 rounded-md transition-all duration-300 text-xs md:text-sm ${
                  isRunning ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#10b3b3] hover:bg-[#0d9999] text-white"
                }`}
              >
                {isRunning ? "Running..." : "Run"}
              </button>

              <button
                onClick={handleNextClick}
                disabled={!completedQuestions[currentQuestion?.id]}
                className={`px-3 md:px-6 py-2 rounded-md transition-all duration-300 text-xs md:text-sm ${
                  completedQuestions[currentQuestion?.id]
                    ? "bg-[#10b3b3] hover:bg-[#0d9999] text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {currentQuestionIndex < codeQuestions.length - 1 ? "Next Question" : "Next"}
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
              className="w-12 h-12 md:w-16 md:h-16 rounded-md mr-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=80&width=80"
              }}
            />
            <div>
              <p className="font-bold text-[#003366] text-sm md:text-base">Code success!</p>
              <p className="text-xs md:text-sm text-gray-600">You're becoming a Python pro!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodePage
