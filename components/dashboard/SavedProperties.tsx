'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'
import { usePropertyStore, formatPrice, type Property } from '@/lib/propertyStore'

export default function SavedProperties() {
  const { favorites, properties } = usePropertyStore()
  const [showAll, setShowAll] = useState(false)

  // Get saved properties from the store's favorites array
  const savedProperties = properties.filter(prop => favorites.includes(prop.id))
  const displayedProperties = showAll ? savedProperties : savedProperties.slice(0, 2)

  // Format date to relative time
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'} ago`
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    } else {
      return 'Just now'
    }
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
          {displayedProperties.map((property: Property) => (
            <div 
              key={property.id}
              className="flex space-x-4 bg-white rounded-lg overflow-hidden border hover:shadow-md transition-shadow"
            >
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 py-2 pr-4">
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/properties/${property.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-primary truncate"
                  >
                    {property.title}
                  </Link>
                  <span className="text-xs text-gray-500">
                    Saved {getRelativeTime(property.listedAt || '')}
                  </span>
                </div>

                <p className="text-sm text-gray-500 truncate">
                  {typeof property.location === 'string' 
                    ? property.location 
                    : `${property.location.address}, ${property.location.city}, ${property.location.state}`}
                </p>
                
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">
                    {formatPrice(property.price)}
                  </span>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaBed className="h-4 w-4 mr-1" />
                      {property.features.bedrooms}
                      <FaBath className="h-4 w-4 mx-1 ml-2" />
                      {property.features.bathrooms}
                      <FaRulerCombined className="h-4 w-4 mx-1 ml-2" />
                      {property.features.area} sq ft
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