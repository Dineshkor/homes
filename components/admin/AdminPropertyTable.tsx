'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaCheck, FaTimes, FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { Property } from '@/types'

export default function AdminPropertyTable() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties')
      if (!response.ok) throw new Error('Failed to fetch properties')
      const data = await response.json()
      setProperties(data.properties)
    } catch (error) {
      setError('Failed to load properties')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (propertyId: string, status: string) => {
    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (!response.ok) throw new Error('Failed to update status')
      fetchProperties() // Refresh the list
    } catch (error) {
      console.error('Error updating property:', error)
      alert('Failed to update property status')
    }
  }

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return
    
    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete property')
      fetchProperties() // Refresh the list
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('Failed to delete property')
    }
  }

  if (isLoading) return <div>Loading properties...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header and body implementation */}
        <tbody className="bg-white divide-y divide-gray-200">
          {properties.map((property) => (
            <tr key={property.id}>
              {/* Property details cells */}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-3">
                  {property.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(property.id, 'active')}
                        className="text-green-600 hover:text-green-900"
                        title="Approve"
                      >
                        <FaCheck className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(property.id, 'rejected')}
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
                  <button 
                    onClick={() => handleDelete(property.id)}
                    className="text-gray-400 hover:text-red-500"
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
  )
}