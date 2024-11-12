'use client'
import Image from 'next/image'
import { Property } from '@/types'
import { usePropertyStore } from '@/lib/propertyStore'
import { formatPrice } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { toggleFavorite, favorites } = usePropertyStore()
  const isFavorite = favorites.includes(property.id)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
        <button
          onClick={() => toggleFavorite(property.id)}
          className="absolute top-2 right-2 p-2"
        >
          <span className={isFavorite ? 'text-red-500' : 'text-gray-500'}>
            ♥
          </span>
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-gray-600">{property.location.city}</p>
        <p className="text-xl font-bold mt-2">
          {property.listingType === 'RENT' 
            ? `${formatPrice(property.rentalPrice || 0)}/mo`
            : formatPrice(property.price)
          }
        </p>
      </div>
    </div>
  )
}