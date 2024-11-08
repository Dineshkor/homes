'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBed, FaBath, FaRulerCombined, FaArrowRight } from 'react-icons/fa'
import { usePropertyStore, formatPrice, type Property } from '@/lib/propertyStore'

interface SimilarPropertiesProps {
  currentPropertyId: string
}

export default function SimilarProperties({ currentPropertyId }: SimilarPropertiesProps) {
  const { properties } = usePropertyStore()
  const [isScrollable, setIsScrollable] = useState(false)
  
  // Filter out current property and get similar properties by type
  const currentProperty = properties.find(p => p.id === currentPropertyId)
  const filteredProperties = properties.filter(
    property => 
      property.id !== currentPropertyId && 
      property.type === currentProperty?.type
  ).slice(0, 3)

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Similar Properties</h2>
          <Link 
            href="/properties" 
            className="text-primary hover:text-primary-dark flex items-center space-x-1"
          >
            <span>View All</span>
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Link 
              key={property.id}
              href={`/properties/${property.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow duration-300">
                {/* Property Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.type}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {typeof property.location === 'string' 
                        ? property.location
                        : `${property.location.address}, ${property.location.city}, ${property.location.state}`}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <FaBed className="text-gray-400" />
                      <span>{property.features.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaBath className="text-gray-400" />
                      <span>{property.features.bathrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaRulerCombined className="text-gray-400" />
                      <span>{property.features.area} sq.ft</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="text-primary font-semibold">
                      {formatPrice(property.price)}
                    </div>
                    <button className="text-sm text-primary hover:text-primary-dark">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}