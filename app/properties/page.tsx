'use client'
import { useState } from 'react'
import { usePropertyStore } from '@/lib/propertyStore'
import PropertyTypeToggle from '@/components/property/PropertyTypeToggle'
import PropertySearch from '@/components/property/PropertySearch'
import PropertyGrid from '@/components/property/PropertyGrid'
import PropertyFilters from '@/components/property/PropertyFilters'

export default function PropertiesPage() {
  const { listingType } = usePropertyStore()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Properties for {listingType === 'BUY' ? 'Sale' : 'Rent'}
        </h1>
        <PropertyTypeToggle />
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <PropertySearch />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <PropertyFilters />
        </div>

        {/* Property Grid */}
        <div className="w-full md:w-3/4">
          <PropertyGrid />
        </div>
      </div>
    </div>
  )
}