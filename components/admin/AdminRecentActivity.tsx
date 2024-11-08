'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  FaHome, 
  FaUserPlus, 
  FaEnvelope, 
  FaDollarSign, 
  FaEdit,
  FaTrash,
  FaEllipsisH 
} from 'react-icons/fa'

const activityIcons = {
  PROPERTY_ADDED: FaHome,
  USER_REGISTERED: FaUserPlus,
  INQUIRY_RECEIVED: FaEnvelope,
  PAYMENT_RECEIVED: FaDollarSign,
  PROPERTY_UPDATED: FaEdit,
  PROPERTY_DELETED: FaTrash,
} as const

type ActivityType = keyof typeof activityIcons

interface AdminActivity {
  id: string
  type: ActivityType
  description: string
  user: {
    name: string
    id: string
    role: 'user' | 'agent' | 'admin'
  }
  timestamp: string
  details: string
  status?: 'pending' | 'completed' | 'cancelled'
}

// Sample data - replace with API call
const recentActivities: AdminActivity[] = [
  {
    id: '1',
    type: 'PROPERTY_ADDED',
    description: 'New property listed',
    user: { name: 'John Smith', id: 'user-1', role: 'agent' },
    details: 'Modern Apartment in City Center',
    timestamp: '2024-01-07T10:30:00Z'
  },
  {
    id: '2',
    type: 'USER_REGISTERED',
    description: 'New user registration',
    user: { name: 'Sarah Wilson', id: 'user-2', role: 'user' },
    details: 'Completed profile setup',
    timestamp: '2024-01-07T09:15:00Z'
  },
  {
    id: '3',
    type: 'INQUIRY_RECEIVED',
    description: 'Property inquiry',
    user: { name: 'Mike Johnson', id: 'user-3', role: 'user' },
    details: 'Regarding Luxury Villa with Pool',
    timestamp: '2024-01-06T16:45:00Z',
    status: 'pending'
  }
]

function getRelativeTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  return `${minutes}m ago`
}

export default function AdminRecentActivity() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <Link 
            href="/admin/activity"
            className="text-sm font-medium text-primary hover:text-primary-dark"
          >
            View all
          </Link>
        </div>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200">
          {recentActivities.map((activity) => {
            const IconComponent = activityIcons[activity.type]
            return (
              <li key={activity.id} className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-2 rounded-lg 
                    ${activity.type === 'PROPERTY_ADDED' ? 'bg-green-50 text-green-500' :
                      activity.type === 'USER_REGISTERED' ? 'bg-blue-50 text-blue-500' :
                      activity.type === 'INQUIRY_RECEIVED' ? 'bg-yellow-50 text-yellow-500' :
                      'bg-gray-50 text-gray-500'}
                  `}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      by{' '}
                      <Link
                        href={`/admin/users/${activity.user.id}`}
                        className="font-medium text-gray-900 hover:text-primary"
                      >
                        {activity.user.name}
                      </Link>
                      {' - '}{activity.details}
                    </p>
                    {activity.status && (
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1
                        ${activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}
                      `}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {getRelativeTime(activity.timestamp)}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}