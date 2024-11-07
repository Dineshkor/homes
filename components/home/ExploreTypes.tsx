'use client'

import Link from 'next/link'
import { 
  FaHome, 
  FaBuilding, 
  FaBriefcase, 
  FaWarehouse,
  FaHotel,
  FaStore,
  FaIndustry,
  FaLandmark
} from 'react-icons/fa'

const propertyTypes = [
  {
    name: 'Houses',
    count: 7,
    icon: FaHome,
    slug: 'houses',
    color: 'bg-blue-50 text-blue-500'
  },
  {
    name: 'Apartments',
    count: 3,
    icon: FaBuilding,
    slug: 'apartments',
    color: 'bg-green-50 text-green-500'
  },
  {
    name: 'Office',
    count: 4,
    icon: FaBriefcase,
    slug: 'office',
    color: 'bg-purple-50 text-purple-500'
  },
  {
    name: 'Villa',
    count: 4,
    icon: FaHotel,
    slug: 'villa',
    color: 'bg-red-50 text-red-500'
  },
  {
    name: 'Commercial',
    count: 2,
    icon: FaStore,
    slug: 'commercial',
    color: 'bg-yellow-50 text-yellow-600'
  },
  {
    name: 'Storage',
    count: 1,
    icon: FaWarehouse,
    slug: 'storage',
    color: 'bg-pink-50 text-pink-500'
  },
  {
    name: 'Industry',
    count: 2,
    icon: FaIndustry,
    slug: 'industry',
    color: 'bg-indigo-50 text-indigo-500'
  },
  {
    name: 'Land',
    count: 5,
    icon: FaLandmark,
    slug: 'land',
    color: 'bg-orange-50 text-orange-500'
  }
]

export default function ExploreTypes() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Property Types</h2>
          <p className="text-gray-600">
            Find your perfect property from our diverse selection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {propertyTypes.map((type) => (
            <Link 
              key={type.name}
              href={`/properties?type=${type.slug}`}
              className="group"
            >
              <div className="relative p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-full ${type.color} flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {type.count} {type.count === 1 ? 'Property' : 'Properties'}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <svg 
                    className="w-5 h-5 text-primary" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/properties" 
            className="inline-flex items-center text-primary hover:text-primary-dark"
          >
            <span>Browse All Properties</span>
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}