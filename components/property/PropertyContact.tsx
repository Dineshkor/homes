'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaStar, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

interface PropertyContactProps {
  agent: {
    name: string
    image: string
    phone: string
    email: string
    rating?: number
    experience?: string
    properties?: string
  }
  property: {
    id: string
  }
}

export default function PropertyContact({ agent, property }: PropertyContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I am interested in this property. Please contact me.'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property.id,
          message: formData.message
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit inquiry')
      }

      // Reset form
      setFormData(prev => ({
        ...prev,
        message: 'I am interested in this property. Please contact me.'
      }))

      // Show success message (you'll need to implement this)
      alert('Inquiry sent successfully!')

    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Failed to send inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Agent Info Section - Referenced from existing code */}
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

        {/* Quick Contact Options */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FaPhone className="mr-2 text-primary" />
            <span>Call</span>
          </a>
          <a
            href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <FaWhatsapp className="mr-2 text-green-500" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="p-6">
        <h4 className="text-lg font-medium mb-4">Send Message</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}