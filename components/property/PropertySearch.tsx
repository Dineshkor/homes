'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const cities = [
  'Dehradun',
  'Mussoorie',
  'Nainital',
  'Haridwar',
  'Rishikesh',
  'Almora',
  'Haldwani',
  'Roorkee'
]

const propertyTypes = [
  'House',
  'Apartment',
  'Villa',
  'Plot',
  'Commercial',
  'Resort'
]

export default function PropertySearch() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState({
    city: '',
    type: '',
    priceRange: '',
    keyword: ''
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value)
    })
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <select
          className="w-full p-3 border rounded-md"
          onChange={(e) => setSearchParams({...searchParams, city: e.target.value})}
          value={searchParams.city}
        >
          <option value="">Select Location</option>
          {cities.map((city) => (
            <option key={city} value={city.toLowerCase()}>{city}</option>
          ))}
        </select>

        {/* Property Type */}
        <select
          className="w-full p-3 border rounded-md"
          onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
          value={searchParams.type}
        >
          <option value="">Property Type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>

        {/* Price Range */}
        <select
          className="w-full p-3 border rounded-md"
          onChange={(e) => setSearchParams({...searchParams, priceRange: e.target.value})}
          value={searchParams.priceRange}
        >
          <option value="">Price Range</option>
          <option value="0-2000000">Under 20 Lakhs</option>
          <option value="2000000-5000000">20-50 Lakhs</option>
          <option value="5000000-10000000">50 Lakhs - 1 Crore</option>
          <option value="10000000-30000000">1-3 Crores</option>
          <option value="30000000+">Above 3 Crores</option>
        </select>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full p-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Search Property
        </button>
      </div>
    </form>
  )
}