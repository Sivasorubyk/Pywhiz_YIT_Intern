"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Play, Pause, Volume2, Maximize2, VolumeX, Award, RefreshCw } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import confetti from "canvas-confetti"
import { fetchLearnContent, fetchMilestones, type LearnContent, type Milestone } from "../services/learnApi"

const LearnPage = () => {
  const navigate = useNavigate()
  const { milestoneId } = useParams<{ milestoneId: string }>()
  const { userProgress, updateUserProgress, markVideoWatched, isVideoWatched, resetMilestoneProgress } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoWatched, setVideoWatched] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false)
  const [learnContent, setLearnContent] = useState<LearnContent | null>(null)
  const [milestone, setMilestone] = useState<Milestone | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showResetConfirmation, setShowResetConfirmation] = useState(false)
  const [localVideoWatched, setLocalVideoWatched] = useState(false)

  // Fetch milestone and learn content
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

        // Fetch learn content for this milestone
        const content = await fetchLearnContent(milestoneId!)
        setLearnContent(content)

        // Check if video was previously watched using the backend data
        if (milestoneId && isVideoWatched(milestoneId)) {
          setVideoWatched(true)
        }
      } catch (err) {
        console.error("Error fetching learn content:", err)
        setError("Failed to load learning content. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    if (milestoneId) {
      fetchData()
    }
  }, [milestoneId, isVideoWatched])

  useEffect(() => {
    if (milestoneId) {
      const storedWatched = localStorage.getItem(`video_watched_${milestoneId}`)
      if (storedWatched === "true") {
        setLocalVideoWatched(true)
      }
    }
  }, [milestoneId])

  // Handle video events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)

      // Mark as watched when 90% complete
      if (!videoWatched && videoRef.current.currentTime > videoRef.current.duration * 0.9) {
        setVideoWatched(true)
        setLocalVideoWatched(true)

        // Store in localStorage
        if (milestoneId) {
          localStorage.setItem(`video_watched_${milestoneId}`, "true")

          // Mark video as watched in the backend
          markVideoWatched(milestoneId)
        }

        // If this is the first milestone, award a badge
        if (milestone?.order === 1) {
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
    if (milestone) {
      navigate(`/code/${milestoneId}`)
    }
  }

  const handleReset = () => {
    setShowResetConfirmation(true)
  }

  const confirmReset = async () => {
    if (milestoneId) {
      await resetMilestoneProgress(milestoneId)
      setVideoWatched(false)
      setLocalVideoWatched(false)
      localStorage.removeItem(`video_watched_${milestoneId}`)
      setShowResetConfirmation(false)

      // Reset video to beginning
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.pause()
        setIsPlaying(false)
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

  if (error || !learnContent || !milestone) {
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
          {/* Video Player */}
          <div className="bg-[#003366] rounded-xl overflow-hidden shadow-lg">
            <div className="relative aspect-w-16 aspect-h-9 bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/images/intro.jpeg"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setVideoWatched(true)}
                onError={() => console.error("Video failed to load")}
              >
                <source src={learnContent.video_url} type="video/mp4" />
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
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
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
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{milestone.title}</h2>
                <button onClick={handleReset} className="text-red-500 hover:text-red-600 flex items-center text-sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reset Progress
                </button>
              </div>
              <p className="text-gray-700">{milestone.description}</p>

              {/* Transcript */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
                <h3 className="font-bold mb-2">Transcript</h3>
                <p className="text-sm text-gray-700">{learnContent.transcript}</p>
              </div>

              {/* Additional resources if available */}
              {Object.keys(learnContent.additional_resources).length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold mb-2">Additional Resources</h3>
                  <ul className="list-disc pl-5">
                    {Object.entries(learnContent.additional_resources).map(([key, value]) => (
                      <li key={key} className="text-sm text-gray-700">
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                  videoWatched || localVideoWatched
                    ? "bg-[#10b3b3] hover:bg-[#0d9999] text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!videoWatched && !localVideoWatched}
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

        {/* Reset confirmation modal */}
        {showResetConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md">
              <h3 className="text-xl font-bold text-red-600 mb-4">Reset This Milestone?</h3>
              <p className="text-gray-700 mb-6">
                This will reset your progress for this milestone only. You'll need to watch the video again.
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
    </div>
  )
}

export default LearnPage
