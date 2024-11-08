'use client'
import { 
  FaFilter, 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaParking,
  FaSwimmingPool,
  FaTree, 
  FaDumbbell,
  FaLock,
  FaBolt
} from 'react-icons/fa'
import { usePropertyStore } from '@/lib/propertyStore'
import { useState } from 'react'

export default function PropertyFilters() {
  const { filters, setFilters, resetFilters } = usePropertyStore()
  const [isOpen, setIsOpen] = useState(true)

  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    setFilters({
      [category]: filters[category].includes(value)
        ? filters[category].filter(item => item !== value)
        : [...filters[category], value]
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaFilter className="text-primary" />
          <h2 className="font-semibold">Filters</h2>
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-primary hover:text-primary-dark"
        >
          Clear All
        </button>
      </div>

      {/* Filter Sections */}
      <div className="p-4 space-y-6">
        {/* Price Range */}
        <div className="space-y-2">
          <h3 className="font-medium">Price Range</h3>
          <div className="space-y-2">
            {[
              { label: 'Under ₹20 Lac', value: '0-2000000' },
              { label: '₹20-50 Lac', value: '2000000-5000000' },
              { label: '₹50 Lac - 1 Cr', value: '5000000-10000000' },
              { label: '₹1-2 Cr', value: '10000000-20000000' },
              { label: 'Above ₹2 Cr', value: '20000000+' }
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.priceRange.includes(value)}
                  onChange={() => handleFilterChange('priceRange', value)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rest of the filter sections remain the same, just update the checked and onChange handlers */}
      </div>
    </div>
  )
}