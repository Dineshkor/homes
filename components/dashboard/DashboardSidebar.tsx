'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaHome, 
  FaHeart, 
  FaEnvelope, 
  FaCog, 
  FaUser 
} from 'react-icons/fa'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FaHome },
  { name: 'Saved Properties', href: '/dashboard/saved', icon: FaHeart },
  { name: 'Inquiries', href: '/dashboard/inquiries', icon: FaEnvelope },
  { name: 'Profile', href: '/dashboard/profile', icon: FaUser },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5
                    ${isActive
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-gray-500'
                    }
                  `}
                />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}