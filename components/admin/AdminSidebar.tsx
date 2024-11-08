'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaHome, 
  FaBuilding, 
  FaUsers, 
  FaChartBar, 
  FaCog,
  FaList,
  FaNewspaper,
  FaComments
} from 'react-icons/fa'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: FaHome,
    color: 'bg-blue-50 text-blue-500' 
  },
  { 
    name: 'Properties', 
    href: '/admin/properties', 
    icon: FaBuilding,
    color: 'bg-green-50 text-green-500' 
  },
  { 
    name: 'Users', 
    href: '/admin/users', 
    icon: FaUsers,
    color: 'bg-purple-50 text-purple-500' 
  },
  { 
    name: 'Analytics', 
    href: '/admin/analytics', 
    icon: FaChartBar,
    color: 'bg-yellow-50 text-yellow-500' 
  },
  { 
    name: 'Inquiries', 
    href: '/admin/inquiries', 
    icon: FaComments,
    color: 'bg-pink-50 text-pink-500' 
  },
  { 
    name: 'Blog Posts', 
    href: '/admin/posts', 
    icon: FaNewspaper,
    color: 'bg-indigo-50 text-indigo-500' 
  },
  { 
    name: 'Categories', 
    href: '/admin/categories', 
    icon: FaList,
    color: 'bg-orange-50 text-orange-500' 
  },
  { 
    name: 'Settings', 
    href: '/admin/settings', 
    icon: FaCog,
    color: 'bg-gray-50 text-gray-500' 
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm min-h-screen">
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-500">Manage your real estate platform</p>
      </div>
      
      <nav className="mt-2 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
                  transition-all duration-200
                  ${isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className={`
                  p-2 rounded-lg mr-3
                  ${isActive ? 'bg-white/20' : item.color}
                `}>
                  <item.icon className={`
                    h-5 w-5
                    ${isActive ? 'text-white' : ''}
                  `} />
                </div>
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}