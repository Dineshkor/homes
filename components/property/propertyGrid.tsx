'use client'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaHeart,
  FaRegHeart,
  FaList,
  FaThLarge,
  FaSort 
} from 'react-icons/fa'
import { usePropertyStore, formatPrice, Property } from '@/lib/propertyStore'

export default function PropertyGrid() {
  const { 
    viewMode, 
    setViewMode, 
    sortBy, 
    setSortBy, 
    favorites, 
    toggleFavorite,
    properties 
  } = usePropertyStore()


  return (
    <div>
      {/* Header with controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            {properties.length} Properties Found
          </h2>
          <p className="text-gray-600">
            Showing all available properties
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex items-center space-x-2 border rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaThLarge className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaList className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Property Grid */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-6'
      }>
        {properties.map((property) => (
          <div 
            key={property.id}
            className={`bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow duration-300
              ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}
            `}
          >
            {/* Property Card Content */}
            <div className={`relative ${viewMode === 'list' ? 'md:w-1/3' : 'h-48'}`}>
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => toggleFavorite(property.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                {favorites.includes(property.id) ? (
                  <FaHeart className="w-4 h-4 text-red-500" />
                ) : (
                  <FaRegHeart className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>

            {/* Rest of the property card content remains the same */}
          </div>
        ))}
      </div>
    </div>
  )
}