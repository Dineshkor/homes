'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaTimes,
  FaSort,
  FaEye 
} from 'react-icons/fa'

interface AdminProperty {
  id: string
  title: string
  price: number
  location: string
  type: string
  status: 'pending' | 'active' | 'rejected' | 'sold'
  owner: {
    id: string
    name: string
  }
  createdAt: string
  views: number
  inquiries: number
}

export default function AdminPropertyTable() {
  const [sortField, setSortField] = useState<keyof AdminProperty>('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  
  // Sample data - replace with API call
  const properties: AdminProperty[] = [
    {
      id: 'prop-1',
      title: 'Modern Apartment',
      price: 2500000,
      location: 'Mumbai, Maharashtra',
      type: 'Apartment',
      status: 'pending',
      owner: {
        id: 'user-1',
        name: 'John Smith'
      },
      createdAt: '2024-01-07T10:30:00Z',
      views: 145,
      inquiries: 3
    },
    // Add more sample properties...
  ]

  const handleSort = (field: keyof AdminProperty) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              { key: 'title', label: 'Property' },
              { key: 'price', label: 'Price' },
              { key: 'location', label: 'Location' },
              { key: 'status', label: 'Status' },
              { key: 'owner', label: 'Owner' },
              { key: 'views', label: 'Views' },
              { key: 'inquiries', label: 'Inquiries' },
              { key: 'createdAt', label: 'Listed Date' },
            ].map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort(column.key as keyof AdminProperty)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  <FaSort className="h-3 w-3" />
                </div>
              </th>
            ))}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {properties.map((property) => (
            <tr key={property.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <Image
                      src={`/images/properties/${property.id}.jpg`}
                      alt={property.title}
                      width={40}
                      height={40}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {property.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.type}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatPrice(property.price)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{property.location}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${property.status === 'active' ? 'bg-green-100 text-green-800' :
                    property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    property.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'}
                `}>
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  href={`/admin/users/${property.owner.id}`}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  {property.owner.name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {property.views}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {property.inquiries}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(property.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-3">
                  {property.status === 'pending' && (
                    <>
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Approve"
                      >
                        <FaCheck className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        title="Reject"
                      >
                        <FaTimes className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <Link
                    href={`/properties/${property.id}`}
                    className="text-gray-400 hover:text-primary"
                  >
                    <FaEye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/properties/${property.id}/edit`}
                    className="text-gray-400 hover:text-primary"
                  >
                    <FaEdit className="h-4 w-4" />
                  </Link>
                  <button className="text-gray-400 hover:text-red-500">
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}