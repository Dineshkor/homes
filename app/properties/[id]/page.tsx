import PropertyDetails from "@/components/property/PropertyDetail";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyFeatures from "@/components/property/PropertyFeatures";
import PropertyLocation from "@/components/property/PropertyLocation";
import PropertyContact from "@/components/property/PropertyContact";
import SimilarProperties from "@/components/property/SimilarProperties";
import { Property } from "@/types";
import { ListingType } from "@/types";

// This is temporary data. Will be replaced with API call later
const propertyData: Property = {
  id: "1",
  title: "Luxury Villa",
  description: "Beautiful luxury villa with mountain views",
  price: 1500000,
  image: "/images/property-1.jpg",
  type: "Villa",
  status: "active",
  listingType: "RENT",
  location: {
    address: "123 Mountain View Road",
    city: "Mussoorie",
    state: "Uttarakhand",
    coordinates: {
      lat: 30.4598,
      lng: 78.0644,
    },
  },
  features: {
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    parking: 2,
    furnished: "Fully",
    floor: "Ground",
  },
  amenities: ["Swimming Pool", "Garden", "Security", "Power Backup"],
  images: [
    "/images/property-1.jpg",
    "/images/property-1-2.jpg",
    "/images/property-1-3.jpg",
  ],
};

export default function PropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Gallery */}
      <PropertyGallery images={propertyData.images || []} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyDetails property={propertyData} />
            <PropertyFeatures
              features={propertyData.features}
              amenities={propertyData.amenities}
              property={propertyData}
            />
            <PropertyLocation location={propertyData.location} />
          </div>

          {/* Sidebar */}
        </div>

        {/* Similar Properties */}
        <div className="mt-16">
          <SimilarProperties currentPropertyId={propertyData.id} />
        </div>
      </div>
    </div>
  );
}
