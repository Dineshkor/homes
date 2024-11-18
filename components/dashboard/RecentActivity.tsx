'use client'
import { useState, useEffect } from 'react'
import { 
  FaHome, 
  FaEnvelope, 
  FaHeart, 
  FaEye, 
  FaCalendarCheck,
  FaEllipsisH 
} from 'react-icons/fa'
import { toast } from 'sonner'

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

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [displayCount, setDisplayCount] = useState(5)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/user/activities')
      if (!response.ok) throw new Error('Failed to fetch activities')
      const data = await response.json()
      setActivities(data.activities)
    } catch (error) {
      setError('Failed to load activities')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  const displayedActivities = activities.slice(0, displayCount)

  if (isLoading) return (
    <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )

  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {displayedActivities.map((activity, activityIdx) => {
          const Icon = activityIcons[activity.type]
          return (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== displayedActivities.length - 1 && (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                )}
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
                        <a href={`/properties/${activity.propertyId}`} className="font-medium text-gray-900 hover:text-primary">
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
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      {activities.length > displayCount && (
        <button
          onClick={() => setDisplayCount(prev => prev + 5)}
          className="mt-4 text-sm text-primary hover:text-primary-dark"
        >
          View more
        </button>
      )}
    </div>
  )
}