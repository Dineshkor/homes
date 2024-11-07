'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaPhone, FaEnvelope, FaWhatsapp, FaStar } from 'react-icons/fa'

interface PropertyContactProps {
  agent: {
    name: string
    phone: string
    email: string
    image: string
    rating?: number
    experience?: string
    properties?: number
  }
}

export default function PropertyContact({ agent }: PropertyContactProps) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setMessage('')
    // Show success message (you can implement a toast notification here)
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Agent Info */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{agent.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < (agent.rating || 5) ? 'text-yellow-400' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <span>{agent.rating || 5}/5</span>
            </div>
          </div>
        </div>

        {/* Agent Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-lg font-semibold">{agent.experience || '5+ Years'}</div>
            <div className="text-sm text-gray-600">Experience</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-lg font-semibold">{agent.properties || '50+'}</div>
            <div className="text-sm text-gray-600">Properties</div>
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="p-6 border-b space-y-3">
        <a 
          href={`tel:${agent.phone}`}
          className="flex items-center justify-center space-x-2 w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <FaPhone />
          <span>{agent.phone}</span>
        </a>
        <a 
          href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <FaWhatsapp />
          <span>WhatsApp</span>
        </a>
        <a 
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center space-x-2 w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FaEnvelope />
          <span>Email</span>
        </a>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <h3 className="font-semibold mb-4">Send Message</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="I'm interested in this property..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-primary-dark'
              } transition-colors`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>

      {/* Privacy Note */}
      <div className="px-6 pb-6">
        <p className="text-xs text-gray-500 text-center">
          By sending a message, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}