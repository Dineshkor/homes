'use client'
import { useState } from 'react'
import { 
  FaHome, 
  FaEnvelope, 
  FaHeart, 
  FaEye, 
  FaCalendarCheck,
  FaEllipsisH 
} from 'react-icons/fa'

// Define activity types and their corresponding icons
const activityIcons = {
  VIEW: FaEye,
  SAVE: FaHeart,
  INQUIRY: FaEnvelope,
  BOOKING: FaCalendarCheck,
  LISTING: FaHome,
} as const

type ActivityType = keyof typeof activityIcons

interface Activity {
  id: string
  type: ActivityType
  description: string
  propertyName: string
  propertyId: string
  timestamp: string
  status?: 'pending' | 'completed' | 'cancelled'
}

// Sample data - replace with actual data from your API
const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'VIEW',
    description: 'Viewed property',
    propertyName: 'Modern Apartment in City Center',
    propertyId: 'prop-1',
    timestamp: '2024-01-07T10:30:00Z'
  },
  {
    id: '2',
    type: 'SAVE',
    description: 'Saved property',
    propertyName: 'Luxury Villa with Pool',
    propertyId: 'prop-2',
    timestamp: '2024-01-07T09:15:00Z'
  },
  {
    id: '3',
    type: 'INQUIRY',
    description: 'Sent inquiry about',
    propertyName: 'Cozy Family Home',
    propertyId: 'prop-3',
    timestamp: '2024-01-06T16:45:00Z',
    status: 'pending'
  },
  {
    id: '4',
    type: 'BOOKING',
    description: 'Scheduled viewing for',
    propertyName: 'Penthouse Suite',
    propertyId: 'prop-4',
    timestamp: '2024-01-06T14:20:00Z',
    status: 'completed'
  },
  {
    id: '5',
    type: 'LISTING',
    description: 'Listed new property',
    propertyName: 'Garden Cottage',
    propertyId: 'prop-5',
    timestamp: '2024-01-06T11:00:00Z'
  }
]

export default function RecentActivity() {
  const [showAll, setShowAll] = useState(false)
  const displayedActivities = showAll ? recentActivities : recentActivities.slice(0, 3)

  // Format timestamp to relative time
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        
        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {displayedActivities.map((activity, activityIdx) => {
              const Icon = activityIcons[activity.type]
              return (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== displayedActivities.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`
                          h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                          ${activity.type === 'INQUIRY' ? 'bg-blue-500' :
                            activity.type === 'SAVE' ? 'bg-red-500' :
                            activity.type === 'VIEW' ? 'bg-green-500' :
                            activity.type === 'BOOKING' ? 'bg-purple-500' :
                            'bg-gray-500'}
                        `}>
                          <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="relative flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            {activity.description}{' '}
                            <a
                              href={`/properties/${activity.propertyId}`}
                              className="font-medium text-gray-900 hover:text-primary"
                            >
                              {activity.propertyName}
                            </a>
                          </p>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {getRelativeTime(activity.timestamp)}
                          </div>
                        </div>
                        {activity.status && (
                          <div className="mt-1">
                            <span className={`
                              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                                activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'}
                            `}>
                              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <FaEllipsisH className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {recentActivities.length > 3 && (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {showAll ? 'Show Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}