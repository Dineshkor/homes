import { ReactNode } from "react"

export interface Property {
  id: string
  title: string
  description: string
  price: number
  rentalPrice?: number
  location: {
    address: string
    city: string
    state: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  image: string
  images?: string[]
  features: {
    bedrooms: number
    bathrooms: number
    area: number
    parking: number
    furnished: string
    floor: string
  }
  type: string
  status: 'active' | 'pending' | 'sold'
  listingType: ListingType
  isNew?: boolean
  isFeatured?: boolean
  listedAt?: string
  amenities: string[]
  views?: number
}

export type ListingType = 'BUY' | 'RENT'

export interface PropertyFilters {
  priceRange: string[]
  propertyType: string[]
  bedrooms: string[]
  amenities: string[]
}

export interface PropertySearchQuery {
  listingType: ListingType
  location: string
  propertyType: string
  priceRange?: {
    min: number
    max: number
  }
}

export type SortBy = 'newest' | 'price-asc' | 'price-desc'
