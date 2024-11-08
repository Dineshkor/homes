'use client'
import { 
  FaBuilding, 
  FaUsers, 
  FaChartLine, 
  FaEnvelope,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa'
import Link from 'next/link'

// Following the structure from DashboardStats.tsx (lines 10-47)
const stats = [
  {
    id: 1,
    name: 'Total Properties',
    value: '156',
    icon: FaBuilding,
    change: '+12%',
    changeType: 'increase',
    color: 'bg-blue-50 text-blue-500',
    href: '/admin/properties'
  },
  {
    id: 2,
    name: 'Active Users',
    value: '2,345',
    icon: FaUsers,
    change: '+8%',
    changeType: 'increase',
    color: 'bg-green-50 text-green-500',
    href: '/admin/users'
  },
  {
    id: 3,
    name: 'Monthly Revenue',
    value: '₹45L',
    icon: FaChartLine,
    change: '+23%',
    changeType: 'increase',
    color: 'bg-purple-50 text-purple-500',
    href: '/admin/analytics'
  },
  {
    id: 4,
    name: 'New Inquiries',
    value: '43',
    icon: FaEnvelope,
    change: '+5%',
    changeType: 'increase',
    color: 'bg-yellow-50 text-yellow-500',
    href: '/admin/inquiries'
  },
]

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Link
          key={stat.id}
          href={stat.href}
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span 
              className={`text-sm font-medium flex items-center
                ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}
              `}
            >
              {stat.changeType === 'increase' ? (
                <FaArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <FaArrowDown className="h-3 w-3 mr-1" />
              )}
              {stat.change}
            </span>
            <span className="ml-2 text-sm text-gray-500">from last month</span>
          </div>
        </Link>
      ))}
    </div>
  )
}