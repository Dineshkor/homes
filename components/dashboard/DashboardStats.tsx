'use client'
import { 
  FaHeart, 
  FaEnvelope, 
  FaEye, 
  FaCalendarCheck 
} from 'react-icons/fa'

// You would typically get this data from your API
const stats = [
  {
    id: 1,
    name: 'Saved Properties',
    value: '12',
    icon: FaHeart,
    change: '+2.5%',
    changeType: 'increase',
    href: '/dashboard/saved'
  },
  {
    id: 2,
    name: 'Property Inquiries',
    value: '8',
    icon: FaEnvelope,
    change: '+14%',
    changeType: 'increase',
    href: '/dashboard/inquiries'
  },
  {
    id: 3,
    name: 'Property Views',
    value: '147',
    icon: FaEye,
    change: '+3.2%',
    changeType: 'increase',
    href: '/dashboard/analytics'
  },
  {
    id: 4,
    name: 'Scheduled Viewings',
    value: '4',
    icon: FaCalendarCheck,
    change: '-1',
    changeType: 'decrease',
    href: '/dashboard/viewings'
  },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <dt>
            <div className="absolute bg-primary rounded-md p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a
                  href={stat.href}
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  View all
                  <span className="sr-only"> {stat.name} stats</span>
                </a>
              </div>
            </div>
          </dd>
        </div>
      ))}
    </div>
  )
}