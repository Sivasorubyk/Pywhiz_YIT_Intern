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
      title: "Python Basic Concepts I",
      description: "Learn the Introduction, Variable, Operators",
      image: "/images/1.jpeg",
      color: "bg-blue-100 border-blue-300",
      emoji: "🚀",
    },
    {
      title: "Python Basic Concepts II",
      description: "If Else, Match, Loops, Functions, Arrays, Math",
      image: "/images/2.jpeg",
      color: "bg-green-100 border-green-300",
      emoji: "🧩",
    },
    {
      title: "Python Basic Concepts III",
      description: "Lists, Tuples, Sets, Dictionaries, File Handling",
      image: "/images/3.jpeg",
      color: "bg-purple-100 border-purple-300",
      emoji: "🎮",
    },
    {
      title: "Python Coding Practice",
      description: "Learn Coding and its explanation in each milestone",
      image: "/images/4.jpeg",
      color: "bg-yellow-100 border-yellow-300",
      emoji: "🔍",
    },
    {
      title: "Python Exercise",
      description: "Practice questions and Understand concepts",
      image: "/images/5.jpeg",
      color: "bg-pink-100 border-pink-300",
      emoji: "⚡",
    },
    {
      title: "Personalized Exercises",
      description: "Practice multi concepts in each questions",
      image: "/images/6.jpeg",
      color: "bg-teal-100 border-teal-300",
      emoji: "🏆",
    },
  ]

  const faqs = [
    {
      question: "PyWhiz என்றால் என்ன?",
      answer:
        "PyWhiz என்பது 11-16 வயதுடைய மாணவர்களுக்காக பிரத்தியேகமாக  வடிவமைக்கப்பட்ட ஒரு interactive python கற்றல் தளமாகும். இது பாடங்களை video, coding and exercise என்ற அணுகுமுறையில் AI-உதவியுடன் இணைத்து coding கற்றலை ஈர்க்கக்கூடியதாகவும் அணுகக்கூடியதாகவும் ஆக்குகிறது.",
    },
    {
      question: "எங்களை ஏன் தேர்வு செய்ய வேண்டும்?",
      answer:
        "Interactive பாடங்கள்,real-time code execution, and personalized feedback மூலம் pythonஐ  கற்பிப்பதற்கான ஒரு தனித்துவமான அணுகுமுறையை நாங்கள் வழங்குகிறோம். எங்கள் தளம் வயதுக்கு ஏற்ற உள்ளடக்கம் மற்றும் ஈர்க்கக்கூடிய காட்சிகளுடன் ஆரம்ப மாணவர்களுக்காக பிரத்தியேகமாக வடிவமைக்கப்பட்டுள்ளது.",
    },
    {
      question: "எங்கள் applicationஐ  யார் வேண்டுமானாலும்  பின்பற்ற முடியுமா?",
      answer:
        "ஆம்! PyWhiz 11-16 வயதுடைய மாணவர்களுக்காக வடிவமைக்கப்பட்டிருந்தாலும், python அடிப்படைகளைக் கற்றுக்கொள்ள ஆர்வமுள்ள ���வரும் எங்கள் தளத்திலிருந்து பயனடையலாம். பாடங்கள் அனைத்து வயதினரும் அணுகக்கூடிய வகையில் கட்டமைக்கப்பட்டுள்ளன.",
    },
    {
      question: "ஆரம்பநிலையாளர்களுக்கு இது ஏன் சிறந்தது?",
      answer:
        "PyWhiz சிக்கலான coding கருத்துக்களை காட்சி உதவிகள் மற்றும் interactive பயிற்சிகள் மூலம் எளிமையாக , புரிந்துகொள்ளக்கூடிய வகையில் பாடங்களாகப் பிரிக்கிறது. தொடக்கநிலையாளர்கள் முன்னேறும்போது நம்பிக்கையை வளர்க்க முடியும் என்பதை எங்கள் படிப்படியான அணுகுமுறை உறுதி செய்கிறது.",
    },
    {
      question: "எனது python திறன்களை இங்கே மேம்படுத்த முடியுமா?",
      answer:
        "PyWhiz அடிப்படைகளுடன் தொடங்கி படிப்படியாக மேம்பட்ட கருத்துக்களை அறிமுகப்படுத்தும் முற்போக்கான கற்றல் பாதைகளை வழங்குகிறது. நீங்கள் ஒரு முழுமையான தொடக்கநிலையாளராக இருந்தாலும் சரி அல்லது உங்கள் அடிப்படைகளை வலுப்படுத்த விரும்பினாலும் சரி, எங்கள் தளம் உங்களுக்கு வளர உதவும்.",
    },
  ]

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white">
      {/* Hero Section with Enhanced Responsive Design */}
      <section className="container mx-auto px-4 py-2 sm:py-3 lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch min-h-[80vh] lg:min-h-[70vh]">
          {/* Left Content - Enhanced Tamil Text Design */}
          <div className="order-2 lg:order-1 space-y-4 lg:space-y-6 h-full flex flex-col">
            <div className="bg-white/95 backdrop-blur-sm p-2 sm:p-3 lg:p-4 rounded-2xl lg:rounded-3xl shadow-xl border-2 border-[#66cccc] transform transition-all duration-300 hover:scale-[1.02] flex-1">
              {/* Main Tamil Heading with Enhanced Typography */}
              <div className="text-center lg:text-left mb-2 lg:mb-3">
                <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black leading-tight mb-2 lg:mb-3">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#003366] via-[#10b3b3] to-[#66cccc]">
                    PyWhiz தளத்திற்கு
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10b3b3] via-[#003366] to-[#10b3b3] mt-1">
                    வரவேற்கின்றோம்! 🎉
                  </span>
                </h1>
              </div>

              {/* Welcome Message with Better Design */}
              <div className="bg-gradient-to-r from-[#10b3b3] to-[#0d9999] p-2 lg:p-3 rounded-xl lg:rounded-2xl border-2 border-[#10b3b3] shadow-lg mb-2 lg:mb-3">
                <div className="text-center lg:text-left">
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-white mb-2 lg:mb-3 flex items-center justify-center lg:justify-start gap-2">
                    வணக்கம், எதிர்கால Coders!
                    <span className="text-2xl animate-bounce">👋</span>
                  </p>

                  <div className="space-y-2 lg:space-y-3">
                    <p className="text-xs sm:text-xs lg:text-sm text-white leading-relaxed font-medium">
                      நீங்கள் 11-16 வயதுக்குட்பட்டவராக இருந்து,
                    </p>

                    <p className="text-xs sm:text-xs lg:text-sm text-white leading-relaxed font-medium">
                      Python ஐ இலகுவாக புரிந்து கொண்டு கற்றுக்கொள்ள விரும்பினால்,
                    </p>

                    <p className="text-xs sm:text-xs lg:text-sm text-white leading-relaxed font-medium">
                      நீங்கள் சரியான இடத்தில் இருக்கிறீர்கள்! 🎯
                    </p>
                  </div>
                </div>
              </div>

              {/* Fun Learning Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-4 mb-2 lg:mb-3">
                <div className="bg-blue-100 p-2 lg:p-3 rounded-lg text-center border border-blue-300 hover:scale-105 transition-transform">
                  <div className="text-lg lg:text-xl">🎥</div>
                  <div className="text-xs lg:text-sm font-bold text-blue-800">Videos</div>
                </div>
                <div className="bg-green-100 p-2 lg:p-3 rounded-lg text-center border border-green-300 hover:scale-105 transition-transform">
                  <div className="text-lg lg:text-xl">💻</div>
                  <div className="text-xs lg:text-sm font-bold text-green-800">Coding</div>
                </div>
                <div className="bg-purple-100 p-2 lg:p-3 rounded-lg text-center border border-purple-300 hover:scale-105 transition-transform">
                  <div className="text-lg lg:text-xl">🧠</div>
                  <div className="text-xs lg:text-sm font-bold text-purple-800">Exercise</div>
                </div>
                <div className="bg-yellow-100 p-2 lg:p-3 rounded-lg text-center border border-yellow-300 hover:scale-105 transition-transform">
                  <div className="text-lg lg:text-xl">🏆</div>
                  <div className="text-xs lg:text-sm font-bold text-yellow-800">Fun</div>
                </div>
              </div>

              {/* Enhanced CTA Button */}
              <div className="text-center">
                <button
                  onClick={handleStartClick}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 text-xs lg:text-sm font-bold text-white bg-gradient-to-r from-[#10b3b3] to-[#0d9999] rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
                >
                  <span className="mr-2">Start Your Coding Adventure!</span>
                  <span className="text-xl animate-bounce">🚀</span>

                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Responsive Video Player */}
          <div className="order-1 lg:order-2 h-full flex flex-col">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-[#10b3b3] transform transition-all duration-300 hover:scale-[1.02] flex-1">
              {/* Video Demo Badge */}
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-[#10b3b3] to-[#0d9999] text-white px-3 py-1 rounded-full text-xs lg:text-sm font-bold shadow-lg">
                📺 App Demo
              </div>

              <div className="relative aspect-video bg-gradient-to-br from-[#003366] to-[#10b3b3]">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  poster="/images/intro.jpeg"
                  preload="metadata"
                >
                  <source src="https://d3t4ndznqmxbjg.cloudfront.net/01.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Description */}
              <div className="bg-white m-0 p-2 border-t-2 border-[#e6f7f7]">
                <p className="text-xs text-gray-600 text-center font-medium">
                  🎬 Watch how PyWhiz makes Python learning fun and interactive!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Course Cards Section */}
      <section className="container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#003366] to-[#10b3b3] mb-3 lg:mb-4">
            நீங்கள் என்ன கற்றுக்கொள்வீர்கள்?
            <span className="inline-block animate-bounce ml-2">🧠</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            வேடிக்கையான மற்றும் interactive வழியில் Python programming கற்றுக்கொள்ளுங்கள்!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {courseTopics.map((topic, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border-2 ${topic.color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              {/* Card Content */}
              <div className="relative z-10 p-4 lg:p-6">
                <div className="flex items-center mb-3 lg:mb-4">
                  <span className="text-2xl lg:text-3xl mr-3 group-hover:animate-bounce">{topic.emoji}</span>
                  <h3 className="text-base lg:text-xl font-bold text-[#003366] leading-tight">{topic.title}</h3>
                </div>
                <p className="text-gray-700 font-medium text-sm lg:text-base mb-3 lg:mb-4">{topic.description}</p>

                {/* Progress indicator */}
                <div className="flex items-center space-x-2 text-xs lg:text-sm font-bold text-[#10b3b3]">
                  <div className="w-2 h-2 bg-[#10b3b3] rounded-full animate-pulse"></div>
                  <span>Ready to Learn!</span>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
                <img
                  src={topic.image || "/placeholder.svg"}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=300"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>

              {/* Lesson number badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#003366] px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Demo - Simplified */}
      {/* <section className="container mx-auto px-4 py-12 bg-[#e6f7f7] rounded-3xl shadow-inner">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#003366]">Watch How It Works! 📺</h2>
        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl border-4 border-[#10b3b3]">
          <div className="relative aspect-w-16 aspect-h-9 bg-black">
            <video className="w-full h-full object-cover" controls poster="/images/intro.jpeg">
              <source src="https://d3t4ndznqmxbjg.cloudfront.net/01.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section> */}

      {/* Enhanced FAQ Section */}
      <section className="container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#003366] to-[#10b3b3] mb-3 lg:mb-4">
            அடிக்கடி கேட்கப்படும் கேள்விகள்
            <span className="inline-block animate-bounce ml-2">🤔</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 lg:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl lg:rounded-2xl border-2 border-[#66cccc] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <button
                className="w-full p-4 lg:p-6 text-left flex justify-between items-center bg-gradient-to-r from-[#e6f7f7] to-[#f0f9ff] hover:from-[#d6f0f0] hover:to-[#e6f7f7] transition-all duration-300"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-bold text-[#003366] text-sm sm:text-base lg:text-lg pr-4 leading-relaxed">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 lg:h-6 lg:w-6 text-[#10b3b3] transition-transform duration-300 flex-shrink-0 ${
                    expandedFaq === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {expandedFaq === index && (
                <div className="p-4 lg:p-6 bg-white border-t-2 border-[#e6f7f7]">
                  <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="container mx-auto px-4 py-8 lg:py-16">
        <div className="relative bg-gradient-to-r from-[#003366] via-[#10b3b3] to-[#003366] rounded-2xl lg:rounded-3xl p-6 lg:p-12 text-center text-white shadow-2xl overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 lg:w-16 lg:w-16 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-8 w-6 h-6 lg:w-12 lg:h-12 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-4 left-8 w-4 h-4 lg:w-8 lg:h-8 bg-pink-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-8 right-4 w-10 h-10 lg:w-20 lg:h-20 bg-green-400 rounded-full animate-pulse delay-75"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 lg:mb-6">
              Ready to Start Your Coding Journey?
              <span className="inline-block animate-bounce ml-2">🚀</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of young coders who are learning Python in a fun and interactive way!
            </p>

            <button
              onClick={handleStartClick}
              className="group relative inline-flex items-center justify-center bg-white text-[#003366] font-black text-base sm:text-lg lg:text-xl px-6 lg:px-10 py-3 lg:py-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl hover:bg-yellow-100 active:scale-95"
            >
              <span className="mr-2">Get Started!</span>
              <span className="text-xl lg:text-2xl animate-bounce">✨</span>

              {/* Animated effects */}
              <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
