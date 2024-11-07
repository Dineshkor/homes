'use client'
import { useState } from 'react'
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaRupeeSign, 
  FaHome 
} from 'react-icons/fa'

export default function PropertySearch() {
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [priceRange, setPriceRange] = useState('')

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
          />
        </div>

        {/* Property Type */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaHome className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-white"
          >
            <option value="" className="text-gray-900">Property Type</option>
            <option value="house" className="text-gray-900">House</option>
            <option value="apartment" className="text-gray-900">Apartment</option>
            <option value="villa" className="text-gray-900">Villa</option>
            <option value="plot" className="text-gray-900">Plot</option>
            <option value="commercial" className="text-gray-900">Commercial</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaRupeeSign className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 bg-white"
          >
            <option value="" className="text-gray-900">Price Range</option>
            <option value="0-2000000" className="text-gray-900">Under 20 Lac</option>
            <option value="2000000-5000000" className="text-gray-900">20-50 Lac</option>
            <option value="5000000-10000000" className="text-gray-900">50 Lac - 1 Cr</option>
            <option value="10000000-20000000" className="text-gray-900">1-2 Cr</option>
            <option value="20000000+" className="text-gray-900">Above 2 Cr</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center space-x-2"
        >
          <FaSearch className="h-5 w-5" />
          <span>Search</span>
        </button>
      </form>

      {/* Popular Searches */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">Popular:</span>
        {['Dehradun', 'Mussoorie', 'Rishikesh', 'Haridwar'].map((place) => (
          <button
            key={place}
            onClick={() => setLocation(place)}
            className="text-sm text-primary hover:text-primary-dark"
          >
            {place}
          </button>
        ))}
      </div>
    </div>
  )
}