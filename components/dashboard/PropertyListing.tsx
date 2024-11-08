'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaEdit, 
  FaTrash, 
  FaEye 
} from 'react-icons/fa'
import { usePropertyStore, formatPrice, type Property } from '@/lib/propertyStore'

export default function PropertyListing() {
  const { favorites, toggleFavorite, properties, deleteProperty } = usePropertyStore()
  const [selectedStatus, setSelectedStatus] = useState<Property['status']>('active')

  // Filter properties by status
  const filteredProperties = properties.filter(prop => prop.status === selectedStatus)

  const handleDeleteProperty = (id: string) => {
    deleteProperty(id)
    // TODO: Add API call to delete property
  }

  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div className="flex space-x-4 mb-6">
        {['active', 'pending', 'sold'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status as Property['status'])}
            className={`px-4 py-2 rounded-lg ${
              selectedStatus === status
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Property List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredProperties.map((property) => (
          <div 
            key={property.id}
            className="p-6 border-b last:border-b-0 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-6">
              {/* Property Image */}
              <div className="relative h-24 w-32 flex-shrink-0">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Property Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {property.title}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/properties/${property.id}/edit`}
                      className="text-gray-400 hover:text-primary"
                    >
                      <FaEdit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-500 mb-4">
                  {typeof property.location === 'string' 
                    ? property.location
                    : `${property.location.address}, ${property.location.city}, ${property.location.state}`}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaBed className="h-4 w-4 mr-1" />
                      {property.features.bedrooms}
                    </span>
                    <span className="flex items-center">
                      <FaBath className="h-4 w-4 mr-1" />
                      {property.features.bathrooms}
                    </span>
                    <span className="flex items-center">
                      <FaRulerCombined className="h-4 w-4 mr-1" />
                      {property.features.area} sq.ft
                    </span>
                    <span className="flex items-center">
                      <FaEye className="h-4 w-4 mr-1" />
                      {property.views || 0} views
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    {formatPrice(property.price)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No properties found</p>
          </div>
        )}
      </div>
    </div>
  )
}