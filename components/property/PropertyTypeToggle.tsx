'use client'
import { usePropertyStore } from '@/lib/propertyStore'
import { ListingType } from '@/types'

export default function PropertyTypeToggle() {
  const { listingType, setListingType } = usePropertyStore()

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setListingType('BUY')}
        className={`px-4 py-2 rounded ${
          listingType === 'BUY' 
            ? 'bg-primary text-white' 
            : 'bg-gray-100'
        }`}
      >
        Buy
      </button>
      <button
        onClick={() => setListingType('RENT')}
        className={`px-4 py-2 rounded ${
          listingType === 'RENT' 
            ? 'bg-primary text-white' 
            : 'bg-gray-100'
        }`}
      >
        Rent
      </button>
    </div>
  )
} 