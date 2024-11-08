'use client'
import { useState } from 'react'
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

// Sample data - replace with API call
const inquiries: Inquiry[] = [
  {
    id: 'inq-1',
    propertyId: 'prop-1',
    propertyName: 'Modern Apartment in City Center',
    userId: 'user-1',
    userName: 'John Smith',
    userEmail: 'john@example.com',
    phone: '+1234567890',
    message: 'Interested in viewing this property. When is the next available showing?',
    status: 'pending',
    createdAt: '2024-01-07T10:30:00Z',
    updatedAt: '2024-01-07T10:30:00Z'
  },
  {
    id: 'inq-2',
    propertyId: 'prop-2',
    propertyName: 'Luxury Villa with Pool',
    userId: 'user-2',
    userName: 'Sarah Wilson',
    userEmail: 'sarah@example.com',
    message: 'Is this property still available? What are the payment terms?',
    status: 'responded',
    createdAt: '2024-01-06T15:45:00Z',
    updatedAt: '2024-01-07T09:15:00Z'
  }
]

const getStatusColor = (status: Inquiry['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'responded':
      return 'bg-green-100 text-green-800'
    case 'closed':
      return 'bg-gray-100 text-gray-800'
  }
}

export default function AdminInquiryList() {
  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {inquiries.map((inquiry) => (
          <li key={inquiry.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${getStatusColor(inquiry.status)}
                  `}>
                    {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                  </span>
                  <Link 
                    href={`/admin/properties/${inquiry.propertyId}`}
                    className="text-sm font-medium text-gray-900 hover:text-primary"
                  >
                    {inquiry.propertyName}
                  </Link>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{inquiry.message}</p>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <Link 
                    href={`/admin/users/${inquiry.userId}`}
                    className="flex items-center hover:text-primary"
                  >
                    <FaUser className="mr-1 h-4 w-4" />
                    {inquiry.userName}
                  </Link>
                  <span className="flex items-center">
                    <FaEnvelope className="mr-1 h-4 w-4" />
                    {inquiry.userEmail}
                  </span>
                  {inquiry.phone && (
                    <span className="flex items-center">
                      <FaPhone className="mr-1 h-4 w-4" />
                      {inquiry.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="ml-4">
                <button className="text-gray-400 hover:text-gray-600">
                  <FaEllipsisH className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}