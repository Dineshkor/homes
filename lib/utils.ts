import { Property, ListingType, PropertyFilters } from '@/types'

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price)
}

export const filterProperties = (
  properties: Property[],
  listingType: ListingType,
  filters: PropertyFilters
) => {
  return properties.filter(property => {
    // Filter by listing type (BUY/RENT)
    if (property.listingType !== listingType) return false

    // Filter by property type
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.type)) {
      return false
    }

    // Filter by bedrooms
    if (filters.bedrooms.length > 0) {
      const bedroomCount = property.features.bedrooms.toString()
      const hasMatchingBedrooms = filters.bedrooms.some(bed => {
        if (bed === '4+') {
          return property.features.bedrooms >= 4
        }
        return bedroomCount === bed
      })
      if (!hasMatchingBedrooms) return false
    }

    // Filter by price range
    if (filters.priceRange.length > 0) {
      const price = listingType === 'RENT' ? (property.rentalPrice || 0) : property.price
      const isInPriceRange = filters.priceRange.some(range => {
        const [min, max] = range.split('-').map(Number)
        return price >= min && price <= max
      })
      if (!isInPriceRange) return false
    }

    return true
  })
}

// Helper function to parse price range string
export const parsePriceRange = (rangeStr: string) => {
  const [min, max] = rangeStr.split('-').map(Number)
  return { min, max }
}

// Format large numbers in Indian format
export const formatIndianNumber = (num: number) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  })
  return formatter.format(num)
}

// Format price range for display
export const formatPriceRange = (listingType: ListingType, min: number, max: number) => {
  if (listingType === 'RENT') {
    return `₹${formatIndianNumber(min)} - ₹${formatIndianNumber(max)}/month`
  }
  return `₹${formatIndianNumber(min)} - ₹${formatIndianNumber(max)}`
}

// Get readable bedroom count
export const getBedroomLabel = (count: string) => {
  if (count === '4+') return '4 or more bedrooms'
  return `${count} bedroom${count === '1' ? '' : 's'}`
}

// Sort properties by different criteria
export const sortProperties = (
  properties: Property[],
  sortBy: 'newest' | 'price-asc' | 'price-desc',
  listingType: ListingType
) => {
  return [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        const priceA = listingType === 'RENT' ? (a.rentalPrice || 0) : a.price
        const priceB = listingType === 'RENT' ? (b.rentalPrice || 0) : b.price
        return priceA - priceB
      case 'price-desc':
        const priceC = listingType === 'RENT' ? (a.rentalPrice || 0) : a.price
        const priceD = listingType === 'RENT' ? (b.rentalPrice || 0) : b.price
        return priceD - priceC
      case 'newest':
      default:
        return new Date(b.listedAt || 0).getTime() - new Date(a.listedAt || 0).getTime()
    }
  })
}
