'use client'
import { useState, FormEvent } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import Map from '@/components/Map'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {}
    
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.subject) newErrors.subject = 'Subject is required'
    if (!formData.message) newErrors.message = 'Message is required'
    if (formData.phone && !/^[0-9+\-\s()]*$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Failed to send message')

      setSubmitStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.'
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions about our properties or services? We're here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <FaPhone className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Phone</h3>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <FaEnvelope className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <p className="text-gray-600">info@ukhomes.com</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <FaMapMarkerAlt className="w-8 h-8 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Office</h3>
          <p className="text-gray-600">123 Main Street, Dehradun</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded mb-6 ${
                  submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 px-6 rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Our Location</h2>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <Map
              center={{ lat: 30.3165, lng: 78.0322 }}
              zoom={14}
              markers={[
                {
                  position: { lat: 30.3165, lng: 78.0322 },
                  title: 'UK Homes Office'
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
