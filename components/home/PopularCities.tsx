import Image from 'next/image'
import Link from 'next/link'

const cities = [
  {
    name: 'Dehradun',
    image: '/images/cities/dehradun.jpg',
    properties: 120,
    description: 'Capital city with modern amenities'
  },
  {
    name: 'Mussoorie',
    image: '/images/cities/mussoorie.jpg',
    properties: 85,
    description: 'Queen of Hills'
  },
  {
    name: 'Nainital',
    image: '/images/cities/nainital.jpg',
    properties: 95,
    description: 'Lake city with scenic beauty'
  },
  {
    name: 'Rishikesh',
    image: '/images/cities/rishikesh.jpg',
    properties: 75,
    description: 'Yoga capital of the world'
  }
]

export default function PopularCities() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Cities in Uttarakhand
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Link 
              key={city.name}
              href={`/properties?city=${city.name.toLowerCase()}`}
              className="group relative rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                  <p className="text-sm mb-1">{city.description}</p>
                  <p className="text-sm">{city.properties} Properties</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}