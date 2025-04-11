"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Play, Pause, Volume2, Maximize2, VolumeX } from 'lucide-react'

const LearnPage8 = () => {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoWatched, setVideoWatched] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Hardcoded lesson data for milestone 8
  const lessonData = {
    title: "Milestone 8: Building a Simple Project",
    description:
      "In this final milestone, we'll put together everything you've learned to build a simple project - a text-based adventure game. You'll apply your knowledge of variables, functions, conditionals, loops, lists, and error handling to create an interactive and entertaining game.",
    videoUrl: "/videos/milestone8-intro.mp4", // This should be your actual video path
  }

  // Handle video events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)

      // Mark as watched when 80% complete
      if (videoRef.current.currentTime > videoRef.current.duration * 0.8) {
        setVideoWatched(true)
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
    navigate("/code8")
  }

  // For demo purposes, enable the Next button after 5 seconds if video can't be loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!videoWatched) setVideoWatched(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [videoWatched])

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <span className="inline-block bg-[#10b3b3] text-white px-4 py-1 rounded-full text-sm font-medium">
            Milestone 8
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Video Player */}
          <div className="bg-[#003366] rounded-xl overflow-hidden shadow-lg">
            <div className="relative aspect-w-16 aspect-h-9 bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/images/milestone8-thumbnail.jpg"
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
                  It's time for the final challenge! You'll create your very own text adventure game using 
                  everything you've learned. This is going to be awesome!
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
      </div>
    </div>
  )
}

export default LearnPage8
