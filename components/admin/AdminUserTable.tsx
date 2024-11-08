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
  FaTrash,
  FaSort,
  FaEye 
} from 'react-icons/fa'

// Reusing User interface from AdminUserList
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

export default function AdminUserTable() {
  const [sortField, setSortField] = useState<keyof User>('joinedAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  
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
    // Add more sample users...
  ]

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              { key: 'name', label: 'User' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' },
              { key: 'status', label: 'Status' },
              { key: 'properties', label: 'Properties' },
              { key: 'joinedAt', label: 'Joined Date' },
              { key: 'lastActive', label: 'Last Active' },
            ].map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort(column.key as keyof User)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  <FaSort className="h-3 w-3" />
                </div>
              </th>
            ))}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => {
            const RoleIcon = getRoleIcon(user.role)
            return (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`
                      p-2 rounded-lg mr-4
                      ${user.role === 'admin' ? 'bg-purple-50 text-purple-500' :
                        user.role === 'agent' ? 'bg-blue-50 text-blue-500' :
                        'bg-gray-50 text-gray-500'}
                    `}>
                      <RoleIcon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}
                  `}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.properties || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.lastActive ? new Date(user.lastActive).toLocaleString() : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    {user.status === 'active' ? (
                      <button
                        className="text-gray-400 hover:text-red-500"
                        title="Suspend User"
                      >
                        <FaBan className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        className="text-gray-400 hover:text-green-500"
                        title="Activate User"
                      >
                        <FaCheck className="h-4 w-4" />
                      </button>
                    )}
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-gray-400 hover:text-primary"
                    >
                      <FaEye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="text-gray-400 hover:text-primary"
                    >
                      <FaEdit className="h-4 w-4" />
                    </Link>
                    <button className="text-gray-400 hover:text-red-500">
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}