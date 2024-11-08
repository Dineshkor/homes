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

// Using similar property structure as seen in FeaturedProperties
interface Property {
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
  listedAt: string
  views: number
}

// Sample data - will be replaced with API call
const listedProperties: Property[] = [
  {
    id: '1',
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
    status: 'active',
    listedAt: '2024-01-01',
    views: 245
  },
  // Add more properties...
]

export default function PropertyListings() {
  const [properties, setProperties] = useState(listedProperties)

  const handleDelete = (propertyId: string) => {
    // Add confirmation modal here
    setProperties(properties.filter(p => p.id !== propertyId))
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">My Properties</h2>
          <Link
            href="/dashboard/properties/add"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Add New Property
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listed Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0">
                        <Image
                          src={property.image}
                          alt={property.title}
                          width={64}
                          height={64}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatPrice(property.price)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {property.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${property.status === 'active' ? 'bg-green-100 text-green-800' : 
                        property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}
                    >
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {property.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(property.listedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <Link
                        href={`/properties/${property.id}`}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FaEye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/dashboard/properties/edit/${property.id}`}
                        className="text-blue-400 hover:text-blue-500"
                      >
                        <FaEdit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties listed</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new property listing.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/properties/add"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add New Property
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}