'use client'
import { 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaParking, 
  FaSwimmingPool,
  FaWifi,
  FaTree,
  FaVideo,
  FaLock,
  FaFan,
  FaFireExtinguisher,
  FaRegClock,
  FaDumbbell,
  FaUtensils,
    
  FaPowerOff,
  FaCheck
} from 'react-icons/fa'

interface PropertyFeaturesProps {
  features: {
    bedrooms: number
    bathrooms: number
    area: number
    parking: number
    furnished: string
    floor: string
  }
  amenities: string[]
}

// Map amenities to icons
const amenityIcons: { [key: string]: any } = {
  'Swimming Pool': FaSwimmingPool,
  'WiFi': FaWifi,
  'Garden': FaTree,
  'CCTV': FaVideo,
  'Security': FaLock,
  'Air Conditioning': FaFan,
  'Fire Safety': FaFireExtinguisher,
  '24/7 Access': FaRegClock,
  'Gym': FaDumbbell,
  'Modular Kitchen': FaUtensils,
  'Power Backup': FaPowerOff
}

export default function PropertyFeatures({ features, amenities }: PropertyFeaturesProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Main Features */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-6">Property Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FaBed className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Bedrooms</p>
              <p className="font-semibold">{features.bedrooms}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FaBath className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Bathrooms</p>
              <p className="font-semibold">{features.bathrooms}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FaRulerCombined className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Area</p>
              <p className="font-semibold">{features.area} sq.ft</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FaParking className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Parking</p>
              <p className="font-semibold">{features.parking} Cars</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-6">Additional Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Furnished Status</span>
            <span className="font-semibold">{features.furnished}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Floor</span>
            <span className="font-semibold">{features.floor}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Age of Property</span>
            <span className="font-semibold">2 Years</span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => {
            const IconComponent = amenityIcons[amenity] || FaCheck
            return (
              <div 
                key={index} 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <span className="text-gray-600">{amenity}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Property Documents */}
      <div className="p-6 bg-gray-50 rounded-b-lg">
        <h2 className="text-xl font-semibold mb-4">Available Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Floor Plan', 'Property Papers', 'NOC'].map((doc, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-primary transition-colors"
            >
              <span className="text-gray-600">{doc}</span>
              <button className="text-primary hover:text-primary-dark">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}