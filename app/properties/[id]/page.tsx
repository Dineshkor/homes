import PropertyDetails from '@/components/property/PropertyDetail'
import PropertyGallery from '@/components/property/PropertyGallery'
import PropertyFeatures from '@/components/property/PropertyFeatures'
import PropertyLocation from '@/components/property/PropertyLocation'
import PropertyContact from '@/components/property/PropertyContact'
import SimilarProperties from '@/components/property/SimilarProperties'

// This is temporary data. Will be replaced with API call later
const propertyData = {
  id: '1',
  title: 'Luxury Villa in Mussoorie',
  description: 'Beautiful 4 bedroom villa with panoramic valley views...',
  price: 25000000,
  location: {
    address: 'Happy Valley, Mussoorie',
    city: 'Mussoorie',
    state: 'Uttarakhand',
    coordinates: {
      lat: 30.4598,
      lng: 78.0644
    }
  },
  features: {
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    parking: 2,
    furnished: 'Semi',
    floor: '2nd'
  },
  amenities: [
    'Swimming Pool',
    'Garden',
    'Security',
    'Power Backup',
    'Modular Kitchen',
    'Valley View'
  ],
  images: [
    '/images/properties/property-1-1.jpg',
    '/images/properties/property-1-2.jpg',
    '/images/properties/property-1-3.jpg',
    '/images/properties/property-1-4.jpg'
  ],
  agent: {
    name: 'Rahul Kumar',
    phone: '+91 98765 43210',
    email: 'rahul@ukhomes.com',
    image: '/images/agents/agent-1.jpg'
  }
}

export default function PropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Gallery */}
      <PropertyGallery images={propertyData.images} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyDetails property={propertyData} />
            <PropertyFeatures 
              features={propertyData.features}
              amenities={propertyData.amenities}
            />
            <PropertyLocation location={propertyData.location} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <PropertyContact agent={propertyData.agent} />
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-16">
          <SimilarProperties currentPropertyId={propertyData.id} />
        </div>
      </div>
    </div>
  )
}