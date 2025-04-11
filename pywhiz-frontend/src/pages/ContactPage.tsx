// src/pages/ContactPage.tsx
import { useState, FormEvent } from 'react'
import api from '../services/api'
import { CheckCircle, AlertCircle } from 'lucide-react'

const ContactPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      // Updated to match Django backend endpoint
      await api.post('/contact/submit/', { 
        name, 
        email, 
        message 
      })
      setSuccess('Your message has been sent successfully!')
      // Clear form
      setName('')
      setEmail('')
      setMessage('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#e6f7f7] to-white min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Get In Touch</h1>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="input-field"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="input-field"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here"
                  rows={6}
                  className="input-field resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#10b3b3] hover:bg-[#0d9999] text-white font-medium py-3 rounded-md transition-all duration-300 flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage