'use client'
import { useState } from 'react'
import { FaSearch, FaMapMarkerAlt, FaHome } from 'react-icons/fa'

export default function PropertySearch() {
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')

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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
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

        {/* Search Button */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center md:self-end md:mb-0.5"
        >
          <FaSearch className="mr-2" />
          Search
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