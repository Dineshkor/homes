'use client'
import { useState } from 'react'
import PropertyForm from '@/components/dashboard/PropertyForm'
import { useRouter } from 'next/navigation'

export default function AddPropertyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)
    try {
      // TODO: Add API call to save property
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard/properties')
    } catch (error) {
      console.error('Error adding property:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Add New Property</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the information below to list a new property.
        </p>
      </div>
      
      <PropertyForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  )
}