import PropertyCard from '@/components/property/PorpertyCard'
import Link from 'next/link'

// Temporary sample data
const featuredProperties = [
  {
    id: '1',
    title: 'Luxury Villa in Mussoorie',
    location: 'Mussoorie',
    price: 25000000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    image: '/images/properties/property-1.jpg',
    type: 'Villa'
  },
  {
    id: '2',
    title: 'Modern Apartment in Dehradun',
    location: 'Dehradun',
    price: 7500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: '/images/properties/property-2.jpg',
    type: 'Apartment'
  },
  {
    id: '3',
    title: 'Lake View Home in Nainital',
    location: 'Nainital',
    price: 15000000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    image: '/images/properties/property-3.jpg',
    type: 'House'
  }
]

export default function FeaturedProperties() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked properties in prime locations across Uttarakhand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/properties" 
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  )
}