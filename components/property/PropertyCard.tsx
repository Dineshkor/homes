'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaHeart, 
  FaRegHeart,
  FaMapMarkerAlt 
} from 'react-icons/fa'

interface PropertyCardProps {
  property: {
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
    isNew?: boolean
    isFeatured?: boolean
  }
  layout?: 'grid' | 'list'
}

export default function PropertyCard({ property, layout = 'grid' }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`
    }
    return `₹${price.toLocaleString()}`
  }

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300
        ${layout === 'list' ? 'flex flex-col md:flex-row' : ''}
      `}
    >
      {/* Property Image */}
      <div className={`relative ${layout === 'list' ? 'md:w-1/3' : 'h-48'}`}>
        <Link href={`/properties/${property.id}`}>
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          {isFavorite ? (
            <FaHeart className="w-4 h-4 text-red-500" />
          ) : (
            <FaRegHeart className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Property Type Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
            {property.type}
          </span>
        </div>

        {/* New/Featured Badge */}
        {(property.isNew || property.isFeatured) && (
          <div className="absolute top-4 left-4">
            <span className={`px-2 py-1 text-sm text-white rounded ${
              property.isNew ? 'bg-green-500' : 'bg-primary'
            }`}>
              {property.isNew ? 'New' : 'Featured'}
            </span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className={`p-4 flex flex-col ${layout === 'list' ? 'md:w-2/3' : ''}`}>
        {/* Price and Title */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <Link 
              href={`/properties/${property.id}`}
              className="text-lg font-semibold hover:text-primary transition-colors"
            >
              {property.title}
            </Link>
            <span className="text-primary font-semibold">
              {formatPrice(property.price)}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <FaMapMarkerAlt className="mr-1 text-gray-400" />
            <span>{property.location}</span>
          </div>

          {/* Description - Only show in list view */}
          {layout === 'list' && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {property.description}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <FaBed className="text-gray-400" />
            <span>{property.features.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaBath className="text-gray-400" />
            <span>{property.features.bathrooms} Baths</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaRulerCombined className="text-gray-400" />
            <span>{property.features.area} sq.ft</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`mt-auto flex gap-2 ${layout === 'list' ? 'md:mt-0' : ''}`}>
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 bg-primary text-white text-center px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/contact?property=${property.id}`}
            className="flex-1 border border-primary text-primary text-center px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
          >
            Contact Agent
          </Link>
        </div>
      </div>
    </div>
  )
}