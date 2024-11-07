'use client'
import { useState } from 'react'
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

interface FilterState {
  priceRange: string[]
  propertyType: string[]
  bedrooms: string[]
  bathrooms: string[]
  furnishing: string[]
  amenities: string[]
  areaRange: string[]
  facing: string[]
  possession: string[]
}

export default function PropertyFilters() {
  const [isOpen, setIsOpen] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [],
    propertyType: [],
    bedrooms: [],
    bathrooms: [],
    furnishing: [],
    amenities: [],
    areaRange: [],
    facing: [],
    possession: []
  })

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }))
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [],
      propertyType: [],
      bedrooms: [],
      bathrooms: [],
      furnishing: [],
      amenities: [],
      areaRange: [],
      facing: [],
      possession: []
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
          onClick={clearFilters}
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

        {/* Property Type */}
        <div className="space-y-2">
          <h3 className="font-medium">Property Type</h3>
          <div className="space-y-2">
            {[
              'House', 'Apartment', 'Villa', 'Plot', 'Commercial'
            ].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.propertyType.includes(type)}
                  onChange={() => handleFilterChange('propertyType', type)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <h3 className="font-medium">Bedrooms</h3>
          <div className="flex flex-wrap gap-2">
            {['1', '2', '3', '4', '4+']. map((bed) => (
              <button
                key={bed}
                onClick={() => handleFilterChange('bedrooms', bed)}
                className={`px-4 py-2 rounded-full text-sm
                  ${filters.bedrooms.includes(bed)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {bed} {bed === '4+' ? '' : 'BHK'}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <h3 className="font-medium">Bathrooms</h3>
          <div className="flex flex-wrap gap-2">
            {['1', '2', '3', '3+']. map((bath) => (
              <button
                key={bath}
                onClick={() => handleFilterChange('bathrooms', bath)}
                className={`px-4 py-2 rounded-full text-sm
                  ${filters.bathrooms.includes(bath)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {bath}
              </button>
            ))}
          </div>
        </div>

        {/* Furnishing Status */}
        <div className="space-y-2">
          <h3 className="font-medium">Furnishing</h3>
          <div className="space-y-2">
            {[
              'Fully Furnished',
              'Semi Furnished',
              'Unfurnished'
            ].map((status) => (
              <label key={status} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.furnishing.includes(status)}
                  onChange={() => handleFilterChange('furnishing', status)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2">
          <h3 className="font-medium">Amenities</h3>
          <div className="space-y-2">
            {[
              { label: 'Swimming Pool', icon: FaSwimmingPool },
              { label: 'Garden', icon: FaTree },
              { label: 'Parking', icon: FaParking },
              { label: 'Gym', icon: FaDumbbell },
              { label: 'Security', icon: FaLock },
              { label: 'Power Backup', icon: FaBolt }
            ].map(({ label, icon: Icon }) => (
              <label key={label} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(label)}
                  onChange={() => handleFilterChange('amenities', label)}
                  className="rounded text-primary focus:ring-primary"
                />
                <Icon className="text-gray-400 w-4 h-4" />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Area Range */}
        <div className="space-y-2">
          <h3 className="font-medium">Area (sq.ft)</h3>
          <div className="space-y-2">
            {[
              { label: 'Under 1000', value: '0-1000' },
              { label: '1000-2000', value: '1000-2000' },
              { label: '2000-3000', value: '2000-3000' },
              { label: 'Above 3000', value: '3000+' }
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.areaRange.includes(value)}
                  onChange={() => handleFilterChange('areaRange', value)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Filters Button - Mobile Only */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}