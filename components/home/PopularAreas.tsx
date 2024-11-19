'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FaMapMarkerAlt, FaHome } from 'react-icons/fa'

const areas = [
  {
    id: 1,
    name: 'Dehradun',
    propertyCount: 45,
    image: '/images/areas/dehradun.jpg',
    slug: 'dehradun'
  },
  {
    id: 2,
    name: 'Mussoorie',
    propertyCount: 32,
    image: '/images/areas/mussoorie.jpg',
    slug: 'mussoorie'
  },
  {
    id: 3,
    name: 'Nainital',
    propertyCount: 28,
    image: '/images/areas/nainital.jpg',
    slug: 'nainital'
  },
  {
    id: 4,
    name: 'Haridwar',
    propertyCount: 23,
    image: '/images/areas/haridwar.jpg',
    slug: 'haridwar'
  }
]

export default function PopularAreas() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Areas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover properties in Uttarakhand's most sought-after locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => (
            <Link 
              key={area.id}
              href={`/properties?location=${area.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <Image
                src={area.image}
                alt={area.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                  {area.name}
                </h3>
                <div className="flex items-center text-sm">
                  <FaHome className="mr-2" />
                  <span>{area.propertyCount} Properties</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/properties"
            className="inline-flex items-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
          >
            <FaMapMarkerAlt className="mr-2" />
            Explore All Areas
          </Link>
        </div>
      </div>
    </section>
  )
}