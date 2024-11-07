'use client'
import Image from 'next/image'
import Link from 'next/link'
import {FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa'

interface PropertyCardProps {
  property: {
    id: string
    title: string
    location: string
    price: number
    bedrooms: number
    bathrooms: number
    area: number
    image: string
    type: string
  }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`
    }
    return `₹${price.toLocaleString()}`
  }

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Property Image */}
        <div className="relative h-48">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
              {property.type}
            </span>
          </div>
        </div>

        {/* Property Details */}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {property.title}
          </h3>
          <p className="text-gray-600 mb-4">
            <span className="flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              {property.location}
            </span>
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-primary">
              {formatPrice(property.price)}
            </span>
          </div>

          {/* Property Features */}
          <div className="flex justify-between text-gray-600 text-sm">
            <div className="flex items-center">
              <FaBed className="mr-2" />
              {property.bedrooms} Beds
            </div>
            <div className="flex items-center">
              <FaBath className="mr-2" />
              {property.bathrooms} Baths
            </div>
            <div className="flex items-center">
              <FaRulerCombined className="mr-2" />
              {property.area} sq.ft
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}