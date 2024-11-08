'use client'
import AdminUserTable from '@/components/admin/AdminUserTable'

export default function AdminUsersPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Users Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all users and their roles
        </p>
      </div>

      {/* User Table */}
      <AdminUserTable />
    </div>
  )
}