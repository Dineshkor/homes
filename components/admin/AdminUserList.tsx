'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  FaUser, 
  FaUserTie, 
  FaUserShield,
  FaBan,
  FaCheck,
  FaEdit,
  FaTrash 
} from 'react-icons/fa'

interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'agent' | 'admin'
  status: 'active' | 'pending' | 'suspended'
  joinedAt: string
  properties?: number
  lastActive?: string
}

// Sample data - replace with API call
const users: User[] = [
  {
    id: 'user-1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'agent',
    status: 'active',
    joinedAt: '2024-01-01T10:00:00Z',
    properties: 5,
    lastActive: '2024-01-07T15:30:00Z'
  },
  {
    id: 'user-2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'user',
    status: 'pending',
    joinedAt: '2024-01-06T14:20:00Z',
    lastActive: '2024-01-07T09:15:00Z'
  }
]

const getRoleIcon = (role: User['role']) => {
  switch (role) {
    case 'admin':
      return FaUserShield
    case 'agent':
      return FaUserTie
    default:
      return FaUser
  }
}

export default function AdminUserList() {
  const [selectedStatus, setSelectedStatus] = useState<User['status']>('active')

  const handleSuspendUser = (userId: string) => {
    // TODO: Add API call to suspend user
    console.log('Suspend user:', userId)
  }

  const handleActivateUser = (userId: string) => {
    // TODO: Add API call to activate user
    console.log('Activate user:', userId)
  }

  const handleDeleteUser = (userId: string) => {
    // TODO: Add API call to delete user
    console.log('Delete user:', userId)
  }

  // Filter users by status
  const filteredUsers = users.filter(user => user.status === selectedStatus)

  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div className="flex space-x-4">
        {['active', 'pending', 'suspended'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status as User['status'])}
            className={`px-4 py-2 rounded-lg ${
              selectedStatus === status
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredUsers.map((user) => {
            const RoleIcon = getRoleIcon(user.role)
            return (
              <li key={user.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <div className={`
                      p-2 rounded-lg mr-4
                      ${user.role === 'admin' ? 'bg-purple-50 text-purple-500' :
                        user.role === 'agent' ? 'bg-blue-50 text-blue-500' :
                        'bg-gray-50 text-gray-500'}
                    `}>
                      <RoleIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="mt-1 flex items-center">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}
                        `}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                        {user.properties && (
                          <span className="ml-2 text-xs text-gray-500">
                            {user.properties} properties
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {user.status === 'active' ? (
                      <button
                        onClick={() => handleSuspendUser(user.id)}
                        className="text-gray-400 hover:text-red-500"
                        title="Suspend User"
                      >
                        <FaBan className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivateUser(user.id)}
                        className="text-gray-400 hover:text-green-500"
                        title="Activate User"
                      >
                        <FaCheck className="h-5 w-5" />
                      </button>
                    )}
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="text-gray-400 hover:text-primary"
                    >
                      <FaEdit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
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