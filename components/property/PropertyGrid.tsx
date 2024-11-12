'use client'
import { usePropertyStore } from '@/lib/propertyStore'
import PropertyCard from './PropertyCard'
import { Property } from '@/types'

export default function PropertyGrid() {
  const { properties, listingType } = usePropertyStore()

  // Filter properties based on listing type
  const filteredProperties = properties.filter((property: Property) => {
    // Basic filter by listing type
    if (property.listingType !== listingType) return false
    return true
  })

  return (
    <div>
      {/* Grid Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {filteredProperties.length} Properties Found
        </h2>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property: Property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* No Results */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No properties found for the selected criteria
          </p>
        </div>
      )}
    </div>
  )
} 