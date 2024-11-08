'use client'
import { FaMapMarkerAlt, FaHome } from 'react-icons/fa'
import { usePropertyStore } from '@/lib/propertyStore'

export default function PropertySearch() {
  const { searchQuery, setSearchQuery } = usePropertyStore()

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({ location: e.target.value })
  }

  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchQuery({ propertyType: e.target.value })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full">
      <form className="flex flex-col md:flex-row gap-4">
        {/* Location */}
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="location"
              value={searchQuery.location}
              onChange={handleLocationChange}
              placeholder="Where do you want to live?"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="flex-1">
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <div className="relative">
            <FaHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              id="propertyType"
              value={searchQuery.propertyType}
              onChange={handlePropertyTypeChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-white text-gray-900"
            >
              <option value="" className="text-gray-500">Select property type</option>
              <option value="house" className="text-gray-900">House</option>
              <option value="apartment" className="text-gray-900">Apartment</option>
              <option value="villa" className="text-gray-900">Villa</option>
              <option value="plot" className="text-gray-900">Plot</option>
              <option value="commercial" className="text-gray-900">Commercial</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}