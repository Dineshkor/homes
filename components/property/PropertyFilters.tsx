'use client'
import { usePropertyStore } from '@/lib/propertyStore'
import { ListingType } from '@/types'

const PRICE_RANGES = {
  BUY: [
    { label: 'Under ₹20L', value: '0-2000000' },
    { label: '₹20L - ₹50L', value: '2000000-5000000' },
    { label: '₹50L - ₹1Cr', value: '5000000-10000000' },
    { label: 'Above ₹1Cr', value: '10000000-999999999' }
  ],
  RENT: [
    { label: 'Under ₹10K', value: '0-10000' },
    { label: '₹10K - ₹25K', value: '10000-25000' },
    { label: '₹25K - ₹50K', value: '25000-50000' },
    { label: 'Above ₹50K', value: '50000-999999' }
  ]
}

const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Villa',
  'Commercial'
]

const BEDROOMS = ['1', '2', '3', '4+']

export default function PropertyFilters() {
  const { listingType } = usePropertyStore()

  const priceRanges = PRICE_RANGES[listingType as ListingType]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary"
                  value={range.value}
                />
                <span className="ml-2 text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Property Type</h3>
          <div className="space-y-2">
            {PROPERTY_TYPES.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary"
                  value={type}
                />
                <span className="ml-2 text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Bedrooms</h3>
          <div className="space-y-2">
            {BEDROOMS.map((bedroom) => (
              <label key={bedroom} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary"
                  value={bedroom}
                />
                <span className="ml-2 text-gray-700">
                  {bedroom === '4+' ? '4 or more' : bedroom} Bedroom
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters Button */}
        <button
          className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}