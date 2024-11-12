'use client'
import { usePropertyStore } from '@/lib/propertyStore'
import PropertyCard from './PropertyCard'
import { filterProperties, sortProperties } from '@/lib/utils'
import { Property } from '@/types'

export default function PropertyList() {
  const { 
    properties, 
    listingType, 
    filters, 
    sortBy 
  } = usePropertyStore()

  // First filter the properties
  const filteredProperties = filterProperties(properties, listingType, filters)
  
  // Then sort them
  const sortedProperties = sortProperties(filteredProperties, sortBy, listingType)

  return (
    <div>
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-600">
          {sortedProperties.length} properties found
        </p>
      </div>

      {/* Property grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProperties.map((property: Property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* No results message */}
      {sortedProperties.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No properties found matching your criteria
          </p>
        </div>
      )}
    </div>
  )
} 