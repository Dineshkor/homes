'use client'
import { useState, useEffect } from 'react'
import PropertyForm from '@/components/dashboard/PropertyForm'
import { useRouter } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
}

interface PropertyData {
  id: string
  title: string
  description: string
  price: number
  location: string
  image: string
  features: {
    bedrooms: number
    bathrooms: number
    area: number
  }
  type: string
  status: 'active' | 'pending' | 'sold'
}

export default function EditPropertyPage({ params }: PageProps) {
  const router = useRouter()
  const [property, setProperty] = useState<PropertyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // TODO: Replace with actual API call
        const mockProperty: PropertyData = {
          id: params.id,
          title: 'Modern Villa in Dehradun',
          description: 'Beautiful 4 bedroom villa with mountain views',
          price: 25000000,
          location: 'Rajpur Road, Dehradun',
          image: '/images/properties/property-1.jpg',
          features: {
            bedrooms: 4,
            bathrooms: 3,
            area: 2500,
          },
          type: 'Villa',
          status: 'active'
        }
        setProperty(mockProperty)
      } catch (error) {
        console.error('Error fetching property:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperty()
  }, [params.id])

 // ... existing code ...

const handleSubmit = async (formData: Partial<PropertyData>) => {
    setIsSubmitting(true)
    try {
      // TODO: Add API call to update property
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard/properties')
    } catch (error) {
      console.error('Error updating property:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // ... existing code ...

  if (isLoading) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">Property not found</h3>
          <div className="mt-2">
            <button
              onClick={() => router.back()}
              className="text-primary hover:text-primary-dark"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Property</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the property information below.
        </p>
      </div>
      
      <PropertyForm 
        initialData={property}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  )
}