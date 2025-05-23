"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Play, Pause, Volume2, Maximize2, VolumeX, Award, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [learnContents, setLearnContents] = useState<LearnContent[]>([])
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [milestone, setMilestone] = useState<Milestone | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [localVideoWatched, setLocalVideoWatched] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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
        const contents = await fetchLearnContent(milestoneId!)
        if (Array.isArray(contents) && contents.length > 0) {
          setLearnContents(contents)
        } else {
          setError("No learning content available")
        }

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

  // Add this useEffect to check if the video was previously watched
  useEffect(() => {
    // Check if video was previously watched from backend or localStorage
    if ((milestoneId && isVideoWatched(milestoneId)) || localVideoWatched) {
      setVideoWatched(true)
    }
  }, [milestoneId, isVideoWatched, localVideoWatched])

  // Reset video player when changing content
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
      setDuration(0)
    }
  }, [currentContentIndex])

  // Update the handleTimeUpdate function to mark video as watched at 100% instead of 90%
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)

      // Mark as watched when 100% complete
      if (!videoWatched && videoRef.current.currentTime >= videoRef.current.duration) {
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
    if (currentContentIndex < learnContents.length - 1) {
      // Go to next video in the sequence
      setCurrentContentIndex(currentContentIndex + 1)
    } else {
      // All videos watched, go to code page
      if (milestone) {
        navigate(`/code/${milestoneId}`)
      }
    }
  }

  const handlePreviousClick = () => {
    if (currentContentIndex > 0) {
      // Go to previous video in the sequence
      setCurrentContentIndex(currentContentIndex - 1)
    } else {
      // First video, go back to dashboard
      navigate("/dashboard")
    }
  }

  const currentContent = learnContents[currentContentIndex]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10b3b3]"></div>
      </div>
    )
  }

  if (error || !milestone || !currentContent) {
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
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-block bg-[#10b3b3] text-white px-4 py-1 rounded-full text-sm font-medium">
            {milestone.title}
          </span>

          <button onClick={() => navigate("/dashboard")} className="text-[#10b3b3] hover:text-[#0d9999] font-medium">
            Back to Dashboard
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
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
                <source src={currentContent.video_url} type="video/mp4" />
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
                  {isPlaying ? <Pause className="h-4 w-4 md:h-5 md:w-5" /> : <Play className="h-4 w-4 md:h-5 md:w-5" />}
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

          {/* Lesson Content */}
          <div className="flex flex-col">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md mb-4 md:mb-6 flex-grow">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg md:text-xl font-bold">{milestone.title}</h2>
                  {learnContents.length > 1 && (
                    <div className="text-sm text-gray-600">
                      Video {currentContentIndex + 1} of {learnContents.length}
                    </div>
                  )}
                </div>
                {currentContent.title && <p className="text-[#10b3b3] font-medium">{currentContent.title}</p>}
              </div>
              <p className="text-gray-700 mb-4">{milestone.description}</p>

              {/* Transcript */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-32 md:max-h-48 overflow-y-auto">
                <h3 className="font-bold mb-2 text-sm md:text-base">Transcript</h3>
                <p className="text-xs md:text-sm text-gray-700">{currentContent.transcript}</p>
              </div>

              {/* Additional resources if available */}
              {Object.keys(currentContent.additional_resources || {}).length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold mb-2 text-sm md:text-base">Additional Resources</h3>
                  <ul className="list-disc pl-5">
                    {Object.entries(currentContent.additional_resources).map(([key, value]) => (
                      <li key={key} className="text-xs md:text-sm text-gray-700">
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md flex items-center">
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
              <div>
                <p className="text-gray-700 text-sm md:text-base">
                  {currentContentIndex < learnContents.length - 1
                    ? "Watch all videos before proceeding to the coding exercise."
                    : "An exercise will follow after you press the next button to test your knowledge."}
                </p>
              </div>
              <div className="ml-auto flex space-x-2">
                {currentContentIndex > 0 && (
                  <button
                    onClick={handlePreviousClick}
                    className="px-3 py-1 md:px-4 md:py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-all duration-300 flex items-center text-xs md:text-sm"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                )}
                <button
                  onClick={handleNextClick}
                  className={`px-3 py-1 md:px-4 md:py-2 rounded-md transition-all duration-300 flex items-center text-xs md:text-sm ${
                    videoWatched || localVideoWatched
                      ? "bg-[#10b3b3] hover:bg-[#0d9999] text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!videoWatched && !localVideoWatched}
                >
                  {currentContentIndex < learnContents.length - 1 ? (
                    <>
                      Next Video <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Badge animation */}
        {showBadgeAnimation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl">
              <div className="text-center">
                <Award className="h-12 w-12 md:h-16 md:w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-[#003366] mb-2">New Badge Earned!</h3>
                <p className="text-base md:text-lg text-gray-700 mb-4">First Step</p>
                <p className="text-xs md:text-sm text-gray-600 mb-6">You've completed your first Python lesson!</p>
                <button
                  onClick={() => setShowBadgeAnimation(false)}
                  className="bg-[#10b3b3] text-white px-4 md:px-6 py-2 rounded-lg hover:bg-[#0d9999]"
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
                className="w-12 h-12 md:w-16 md:h-16 rounded-md mr-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=80&width=80"
                }}
              />
              <div>
                <p className="font-bold text-[#003366] text-sm md:text-base">Great job!</p>
                <p className="text-xs md:text-sm text-gray-600">Keep going! You're doing amazing!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LearnPage
