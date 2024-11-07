'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaShare, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'

interface SavedProperty {
  id: string
  title: string
  address: string
  price: number
  image: string
  beds: number
  baths: number
  sqft: number
  savedAt: string
}

// Sample data - replace with actual data from your API
const savedProperties: SavedProperty[] = [
  {
    id: 'prop1',
    title: 'Modern Apartment with City View',
    address: '123 City Center, London',
    price: 450000,
    image: '/images/properties/property-1.jpg', // Add your image path
    beds: 2,
    baths: 2,
    sqft: 1200,
    savedAt: '2024-01-07T10:30:00Z'
  },
  {
    id: 'prop2',
    title: 'Luxury Villa with Pool',
    address: '456 Suburb Street, Manchester',
    price: 850000,
    image: '/images/properties/property-2.jpg', // Add your image path
    beds: 4,
    baths: 3,
    sqft: 2800,
    savedAt: '2024-01-06T15:45:00Z'
  },
  {
    id: 'prop3',
    title: 'Cozy Family Home',
    address: '789 Quiet Lane, Birmingham',
    price: 350000,
    image: '/images/properties/property-3.jpg', // Add your image path
    beds: 3,
    baths: 2,
    sqft: 1800,
    savedAt: '2024-01-05T09:15:00Z'
  }
]

export default function SavedProperties() {
  const [showAll, setShowAll] = useState(false)
  const displayedProperties = showAll ? savedProperties : savedProperties.slice(0, 2)

  // Format price with commas and currency symbol
  const formatPrice = (price: number) => {
    return `£${price.toLocaleString()}`
  }

  // Format date to relative time
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Saved Properties</h3>
          <Link 
            href="/dashboard/saved"
            className="text-sm text-primary hover:text-primary-dark"
          >
            View all
          </Link>
        </div>

        <div className="space-y-6">
          {displayedProperties.map((property) => (
            <div 
              key={property.id}
              className="flex space-x-4 bg-white rounded-lg overflow-hidden border hover:shadow-md transition-shadow"
            >
              {/* Property Image */}
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Property Details */}
              <div className="flex-1 min-w-0 py-2 pr-4">
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/properties/${property.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-primary truncate"
                  >
                    {property.title}
                  </Link>
                  <span className="text-xs text-gray-500">
                    Saved {getRelativeTime(property.savedAt)}
                  </span>
                </div>

                <p className="text-sm text-gray-500 truncate">{property.address}</p>
                
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">
                    {formatPrice(property.price)}
                  </span>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaBed className="h-4 w-4 mr-1" />
                      {property.beds}
                      <FaBath className="h-4 w-4 mx-1 ml-2" />
                      {property.baths}
                      <FaRulerCombined className="h-4 w-4 mx-1 ml-2" />
                      {property.sqft} sq ft
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {savedProperties.length > 2 && (
          <div className="mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {showAll ? 'Show Less' : 'View More'}
            </button>
          </div>
        )}

        {savedProperties.length === 0 && (
          <div className="text-center py-12">
            <FaHeart className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No saved properties</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start saving properties you're interested in!
            </p>
            <div className="mt-6">
              <Link
                href="/properties"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}