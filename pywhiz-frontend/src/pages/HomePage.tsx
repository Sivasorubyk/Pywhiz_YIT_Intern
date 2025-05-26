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
        "ஆம்! PyWhiz 11-16 வயதுடைய மாணவர்களுக்காக வடிவமைக்கப்பட்டிருந்தாலும், python அடிப்படைகளைக் கற்றுக்கொள்ள ஆர்வமுள்ள எவரும் எங்கள் தளத்திலிருந்து பயனடையலாம். பாடங்கள் அனைத்து வயதினரும் அணுகக்கூடிய வகையில் கட்டமைக்கப்பட்டுள்ளன.",
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
      {/* Hero Section with Simple Video */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-md border-2 border-[#66cccc] transform transition-all duration-300 hover:scale-105">
            <h1 className="text-4xl font-bold mb-4 text-[#003366]">PyWhiz தளத்திற்கு வரவேற்கின்றோம்.</h1>
            <p className="text-gray-700 mb-6 text-lg">
              
            வணக்கம், எதிர்கால Coders! 👋 நீங்கள் 11-16 வயதுக்குட்பட்டவராக இருந்து, Python ஐ இலகுவாக புரிந்து கொண்டு கற்றுக்கொள்ள விரும்பினால், நீங்கள் சரியான இடத்தில் இருக்கிறீர்கள்! </p>
            {/* <p><center>🔍 Learn, 💻 Code , 🧠 Exercise and 🛠️ Build</center></p> */}
            
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
        <h2 className="text-3xl font-bold text-center mb-8 text-[#003366]">நீங்கள் என்ன கற்றுக்கொள்வீர்கள்? 🧠</h2>
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

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#003366]">அடிக்கடி கேட்கப்படும் கேள்விகள் 🤔</h2>
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
