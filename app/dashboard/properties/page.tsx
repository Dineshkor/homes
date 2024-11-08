'use client'

import { useState } from 'react'
import PropertyListing from '@/components/dashboard/PropertyListing'
import { FaPlus } from 'react-icons/fa'
import Link from 'next/link'

export default function DashboardPropertiesPage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Properties</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your property listings
          </p>
        </div>
        <Link
          href="/properties/add"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <FaPlus className="mr-2 h-4 w-4" />
          Add Property
        </Link>
      </div>

      {/* Property Listings */}
      <PropertyListing />
    </div>
  )
}