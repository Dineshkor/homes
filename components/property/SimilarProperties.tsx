'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBed, FaBath, FaRulerCombined, FaArrowRight } from 'react-icons/fa'

// This would typically come from an API
const similarProperties = [
  {
    id: '2',
    title: 'Modern Villa in Dehradun',
    location: 'Rajpur Road, Dehradun',
    price: 18000000,
    image: '/images/properties/property-2.jpg',
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1800
    },
    type: 'Villa'
  },
  {
    id: '3',
    title: 'Luxury Apartment with Valley View',
    location: 'Mall Road, Mussoorie',
    price: 15000000,
    image: '/images/properties/property-3.jpg',
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 2200
    },
    type: 'Apartment'
  },
  {
    id: '4',
    title: 'Riverside Cottage',
    location: 'Rishikesh',
    price: 12000000,
    image: '/images/properties/property-4.jpg',
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1500
    },
    type: 'Cottage'
  }
]

interface SimilarPropertiesProps {
  currentPropertyId: string
}

export default function SimilarProperties({ currentPropertyId }: SimilarPropertiesProps) {
  const [isScrollable, setIsScrollable] = useState(false)
  
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`
    }
    return `₹${price.toLocaleString()}`
  }

  // Filter out current property
  const filteredProperties = similarProperties.filter(
    property => property.id !== currentPropertyId
  )

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
                      {property.location}
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

      {/* View More Link - Mobile */}
      <div className="p-6 border-t text-center md:hidden">
        <Link 
          href="/properties" 
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark"
        >
          <span>View All Properties</span>
          <FaArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}