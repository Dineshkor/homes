'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FaHome,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaTimes,
  FaClock,
  FaEllipsisH 
} from 'react-icons/fa'
import { toast } from 'sonner'

interface Inquiry {
  id: string
  propertyId: string
  propertyName: string
  userId: string
  userName: string
  userEmail: string
  phone?: string
  message: string
  status: 'pending' | 'responded' | 'closed'
  createdAt: string
  updatedAt: string
}

export default function AdminEnquiryList() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries')
      if (!response.ok) throw new Error('Failed to fetch inquiries')
      const data = await response.json()
      setInquiries(data.inquiries)
    } catch (error) {
      setError('Failed to load inquiries')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (inquiryId: string, status: 'responded' | 'closed') => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (!response.ok) throw new Error('Failed to update inquiry')
      
      toast.success('Inquiry status updated')
      fetchInquiries() // Refresh the list
    } catch (error) {
      console.error('Error updating inquiry:', error)
      toast.error('Failed to update inquiry status')
    }
  }

  if (isLoading) return <div>Loading inquiries...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/properties/${inquiry.propertyId}`} className="flex items-center">
                  <FaHome className="mr-2 text-gray-400" />
                  <span className="text-sm text-gray-900">{inquiry.propertyName}</span>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{inquiry.userName}</span>
                  <span className="text-sm text-gray-500">{inquiry.userEmail}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm text-gray-500 truncate max-w-xs">{inquiry.message}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    inquiry.status === 'responded' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {inquiry.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(inquiry.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {
                  inquiry.status === 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate(inquiry.id, 'responded')}
                      className="text-primary hover:text-primary"
                    >
                      Respond
                    </button>
                  )
                }
                {
                  inquiry.status === 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate(inquiry.id, 'closed')}
                      className="text-red-500 hover:text-red-700"
                    >
                      Close
                    </button>
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}