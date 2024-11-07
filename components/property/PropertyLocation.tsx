'use client'
import { useState } from 'react'
import { FaMapMarkerAlt, FaHospital, FaSchool, FaShoppingCart, FaBus, FaCheckCircle } from 'react-icons/fa'

interface LocationProps {
  location: {
    address: string
    city: string
    state: string
    
  }
}

const nearbyPlaces = [
  {
    category: 'Healthcare',
    icon: FaHospital,
    places: [
      { name: 'City Hospital', distance: '0.5 km' },
      { name: 'Medicare Center', distance: '1.2 km' }
    ]
  },
  {
    category: 'Education',
    icon: FaSchool,
    places: [
      { name: 'Public School', distance: '0.8 km' },
      { name: 'International School', distance: '1.5 km' }
    ]
  },
  {
    category: 'Shopping',
    icon: FaShoppingCart,
    places: [
      { name: 'City Mall', distance: '1.0 km' },
      { name: 'Local Market', distance: '0.3 km' }
    ]
  },
  {
    category: 'Transportation',
    icon: FaBus,
    places: [
      { name: 'Bus Station', distance: '0.6 km' },
      { name: 'Metro Station', distance: '1.8 km' }
    ]
  }
]

export default function PropertyLocation({ location }: LocationProps) {
  const [activeTab, setActiveTab] = useState('map')

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="flex items-start space-x-3">
          <FaMapMarkerAlt className="h-5 w-5 text-primary mt-1" />
          <div>
            <p className="text-gray-600">{location.address}</p>
            <p className="text-gray-600">{location.city}, {location.state}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'map'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('map')}
          >
            Map View
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'nearby'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('nearby')}
          >
            Nearby Places
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'map' ? (
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {/* Map will be integrated here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <p>Map integration will be added here</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nearbyPlaces.map((category) => (
              <div key={category.category} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">{category.category}</h3>
                </div>
                <div className="space-y-3">
                  {category.places.map((place) => (
                    <div 
                      key={place.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-600">{place.name}</span>
                      <span className="text-sm text-primary font-medium">
                        {place.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="p-6 bg-gray-50 rounded-b-lg">
        <h3 className="font-medium mb-4">Location Advantages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <span>Prime location</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <span>Well connected to main roads</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <span>Close to amenities</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" />
            <span>Safe neighborhood</span>
          </div>
        </div>
      </div>
    </div>
  )
}