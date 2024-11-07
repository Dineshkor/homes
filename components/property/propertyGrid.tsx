'use client'
import { useState } from 'react'
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

// This would come from your API/database
const properties = [
  {
    id: '1',
    title: 'Luxury Villa in Dehradun',
    description: 'Beautiful 4 bedroom villa with mountain views and modern amenities.',
    price: 25000000,
    location: 'Rajpur Road, Dehradun',
    image: '/images/properties/property-1.jpg',
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
    },
    type: 'Villa',
    isNew: true,
    isFeatured: true
  },
  // Add more properties...
]

export default function PropertyGrid() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`
    }
    return `₹${price.toLocaleString()}`
  }

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
              onClick={() => setView('grid')}
              className={`p-2 rounded ${
                view === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaThLarge className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded ${
                view === 'list' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaList className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Area: Largest First</option>
            </select>
            <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className={
        view === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-6'
      }>
        {properties.map((property) => (
          <div 
            key={property.id}
            className={`bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-shadow duration-300
              ${view === 'list' ? 'flex flex-col md:flex-row' : ''}
            `}
          >
            {/* Property Image */}
            <div className={`relative ${view === 'list' ? 'md:w-1/3' : 'h-48'}`}>
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => toggleFavorite(property.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
              >
                {favorites.includes(property.id) ? (
                  <FaHeart className="w-4 h-4 text-red-500" />
                ) : (
                  <FaRegHeart className="w-4 h-4 text-gray-600" />
                )}
              </button>
              {property.isNew && (
                <span className="absolute top-4 left-4 bg-primary text-white px-2 py-1 text-sm rounded">
                  New
                </span>
              )}
            </div>

            {/* Property Details */}
            <div className={`p-4 flex flex-col ${view === 'list' ? 'md:w-2/3' : ''}`}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <span className="text-primary font-semibold">
                    {formatPrice(property.price)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  {property.location}
                </p>
                {view === 'list' && (
                  <p className="text-gray-600 mb-4">
                    {property.description}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <FaBed className="text-gray-400" />
                  <span>{property.features.bedrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaBath className="text-gray-400" />
                  <span>{property.features.bathrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaRulerCombined className="text-gray-400" />
                  <span>{property.features.area} sq.ft</span>
                </div>
              </div>

              {/* View Details Button */}
              <div className={`mt-4 ${view === 'list' ? 'md:mt-auto' : ''}`}>
                <Link
                  href={`/properties/${property.id}`}
                  className="inline-block w-full text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {properties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No properties found matching your criteria</p>
          <button
            onClick={() => {/* Reset filters */}}
            className="text-primary hover:text-primary-dark"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}