'use client'
import PropertyCard from '../property/PropertyCard'

// Define the property type
interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  image: string
  features: {
    bedrooms: number
    bathrooms: number
    area: number
  }
  type: string
  isNew?: boolean
  isFeatured?: boolean
}

// Sample data
const featuredProperties: Property[] = [
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
  {
    id: '2',
    title: 'Modern Apartment in Mussoorie',
    description: 'Spacious 3 bedroom apartment with valley views.',
    price: 15000000,
    location: 'Mall Road, Mussoorie',
    image: '/images/properties/property-2.jpg',
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
    },
    type: 'Apartment',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Riverside Villa in Rishikesh',
    description: 'Beautiful villa with Ganga view and peaceful surroundings.',
    price: 35000000,
    location: 'Tapovan, Rishikesh',
    image: '/images/properties/property-3.jpg',
    features: {
      bedrooms: 5,
      bathrooms: 4,
      area: 3200,
    },
    type: 'Villa',
    isFeatured: true
  }
]

export default function FeaturedProperties() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium properties in Uttarakhand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="/properties" 
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            View All Properties
          </a>
        </div>
      </div>
    </section>
  )
}