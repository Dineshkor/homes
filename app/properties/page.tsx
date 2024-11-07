import PropertySearch from '@/components/property/PropertySearch'
import PropertyFilters from '@/components/property/PropertyFilters'
import PropertyGrid from '@/components/property/PropertyGrid'

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-white/90 mb-8 max-w-2xl">
            Explore our wide range of properties in Uttarakhand. From mountain views to riverside homes, find your ideal property.
          </p>
          <PropertySearch />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <PropertyFilters />
          </div>

          {/* Property Grid */}
          <div className="lg:w-3/4">
            <PropertyGrid />
          </div>
        </div>
      </div>
    </div>
  )
}