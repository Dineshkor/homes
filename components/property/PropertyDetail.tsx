'use client'
import { FaBed, FaBath, FaRulerCombined, FaParking, FaCouch, FaBuilding } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { type Property } from '@/lib/propertyStore'

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`
    }
    return `₹${price.toLocaleString()}`
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Title and Verification */}
      <div className="flex items-start justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {property.title}
        </h1>
        <span className="flex items-center text-primary">
          <MdVerified className="h-6 w-6" />
          <span className="ml-2 text-sm">Verified</span>
        </span>
      </div>

      {/* Location */}
      <div className="text-gray-600 mb-6">
        <p>{typeof property.location === 'string' ? property.location : property.location.address}</p>
        <p>
          {typeof property.location === 'string' 
            ? ''
            : `${property.location.city}, ${property.location.state}`}
        </p>
      </div>

      {/* Price */}
      <div className="bg-primary/5 rounded-lg p-4 mb-6">
        <div className="text-3xl font-bold text-primary">
          {formatPrice(property.price)}
        </div>
        <div className="text-sm text-gray-600">
          {`${(property.price / property.features.area).toFixed(2)} per sq.ft`}
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <FaBed className="h-5 w-5 text-gray-400" />
          <span>{property.features.bedrooms} Bedrooms</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaBath className="h-5 w-5 text-gray-400" />
          <span>{property.features.bathrooms} Bathrooms</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaRulerCombined className="h-5 w-5 text-gray-400" />
          <span>{property.features.area} sq.ft</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaParking className="h-5 w-5 text-gray-400" />
          <span>{property.features.parking} Parking</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaCouch className="h-5 w-5 text-gray-400" />
          <span>{property.features.furnished}</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaBuilding className="h-5 w-5 text-gray-400" />
          <span>{property.features.floor} Floor</span>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div className="prose max-w-none text-gray-600">
          <p>{property.description}</p>
        </div>
      </div>

      {/* Share and Save Buttons */}
      <div className="flex items-center space-x-4 mt-6 pt-6 border-t">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Share</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Save</span>
        </button>
      </div>
    </div>
  )
}