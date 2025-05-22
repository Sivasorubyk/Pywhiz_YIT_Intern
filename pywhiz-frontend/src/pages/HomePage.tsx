"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const HomePage = () => {
  const { isAuthenticated, userProgress } = useAuth()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const navigate = useNavigate()

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  // Get the appropriate link for the CTA buttons
  const getStartLink = () => {
    if (!isAuthenticated) {
      return "/signup"
    }

    if (userProgress && userProgress.current_milestone) {
      return `/learn/${userProgress.current_milestone.id}`
    }

    return "/dashboard"
  }

  // Handle CTA button clicks
  const handleStartClick = () => {
    navigate(getStartLink())
  }

  // Course topics with fun icons and descriptions
  const courseTopics = [
    {
      title: "Python Basics",
      description: "Learn the building blocks of Python programming!",
      image: "/images/1.jpeg",
      color: "bg-blue-100 border-blue-300",
      emoji: "🚀",
    },
    {
      title: "Fun with Variables",
      description: "Store and use data in your programs!",
      image: "/images/2.jpeg",
      color: "bg-green-100 border-green-300",
      emoji: "🧩",
    },
    {
      title: "Loops & Games",
      description: "Make things happen over and over again!",
      image: "/images/3.jpeg",
      color: "bg-purple-100 border-purple-300",
      emoji: "🎮",
    },
    {
      title: "If Statements",
      description: "Teach your program to make decisions!",
      image: "/images/4.jpeg",
      color: "bg-yellow-100 border-yellow-300",
      emoji: "🔍",
    },
    {
      title: "Awesome Functions",
      description: "Create your own special commands!",
      image: "/images/5.jpeg",
      color: "bg-pink-100 border-pink-300",
      emoji: "⚡",
    },
    {
      title: "Cool Projects",
      description: "Build amazing things with your new skills!",
      image: "/images/6.jpeg",
      color: "bg-teal-100 border-teal-300",
      emoji: "🏆",
    },
  ]

  const faqs = [
    {
      question: "What is PyWhiz?",
      answer:
        "PyWhiz is an interactive Python learning platform designed specifically for kids aged 11-15. It combines fun lessons with AI-powered assistance to make learning to code engaging and accessible.",
    },
    {
      question: "Why choose us?",
      answer:
        "We offer a unique approach to teaching Python with interactive lessons, real-time code execution, and personalized feedback. Our platform is designed specifically for young learners with age-appropriate content and engaging visuals.",
    },
    {
      question: "Can anyone follow our application?",
      answer:
        "Yes! While PyWhiz is designed for kids aged 11-15, anyone interested in learning Python basics can benefit from our platform. The lessons are structured to be accessible to beginners of all ages.",
    },
    {
      question: "Why is it great for beginners?",
      answer:
        "PyWhiz breaks down complex programming concepts into simple, digestible lessons with visual aids and interactive exercises. Our step-by-step approach ensures that beginners can build confidence as they progress.",
    },
    {
      question: "Can I improve my Python skills here?",
      answer:
        "PyWhiz offers progressive learning paths that start with the basics and gradually introduce more advanced concepts. Whether you're a complete beginner or looking to strengthen your fundamentals, our platform can help you grow.",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white">
      {/* Hero Section with Simple Video */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-md border-2 border-[#66cccc] transform transition-all duration-300 hover:scale-105">
            <h1 className="text-4xl font-bold mb-4 text-[#003366]">Welcome to PyWhiz!</h1>
            <p className="text-gray-700 mb-6 text-lg">
              
            வணக்கம், எதிர்கால Coders! 👋 நீங்கள் 11-16 வயதுக்குட்பட்டவராக இருந்து, Python ஐ இலகுவாக புரிந்து கொண்டு கற்றுக்கொள்ள விரும்பினால், நீங்கள் சரியான இடத்தில் இருக்கிறீர்கள்! </p>
            <p><center>🔍 Learn, 💻 Code , 🧠 Exercise and 🛠️ Build</center></p>
            
            <button
              onClick={handleStartClick}
              className="btn-primary inline-block text-lg px-8 py-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 hover:-rotate-2"
            >
              Start Your Coding Adventure! 🚀
            </button>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border-4 border-[#10b3b3]">
            <div className="relative aspect-w-16 aspect-h-9 bg-black">
              <video className="w-full h-full object-cover" controls playsInline poster="/images/intro.jpeg">
                <source src="https://d3t4ndznqmxbjg.cloudfront.net/01.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#003366]">What You'll Learn 🧠</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseTopics.map((topic, index) => (
            <div
              key={index}
              className={`card hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${topic.color} border-2 rounded-xl overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{topic.emoji}</span>
                  <h3 className="text-xl font-bold text-[#003366]">{topic.title}</h3>
                </div>
                <p className="text-gray-700">{topic.description}</p>
              </div>
              <img
                src={topic.image || "/placeholder.svg"}
                alt={topic.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=200&width=300"
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Video Demo - Simplified */}
      <section className="container mx-auto px-4 py-12 bg-[#e6f7f7] rounded-3xl shadow-inner">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#003366]">Watch How It Works! 📺</h2>
        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl border-4 border-[#10b3b3]">
          <div className="relative aspect-w-16 aspect-h-9 bg-black">
            <video className="w-full h-full object-cover" controls poster="/images/intro.jpeg">
              <source src="https://d3t4ndznqmxbjg.cloudfront.net/01.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#003366]">Frequently Asked Questions 🤔</h2>
        <div className="max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-5 border-2 border-[#66cccc] rounded-xl overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full p-5 text-left flex justify-between items-center bg-[#e6f7f7] hover:bg-[#d6f0f0] transition-colors duration-200"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-bold text-[#003366] text-lg">{faq.question}</span>
                <ChevronDown
                  className={`h-6 w-6 text-[#10b3b3] transition-transform duration-300 ${
                    expandedFaq === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="p-5 bg-white">
                  <p className="text-gray-700 text-lg">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-12 mb-8">
        <div className="bg-gradient-to-r from-[#003366] to-[#10b3b3] rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Coding Journey? 🚀</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join thousands of young coders who are learning Python in a fun and interactive way!
          </p>
          <button
            onClick={handleStartClick}
            className="inline-block bg-white text-[#003366] font-bold text-xl px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-yellow-100"
          >
            Get Started! ✨
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
