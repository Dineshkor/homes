'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Property Types
export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  image: string
  features: {
    bedrooms: number
    bathrooms: number
    area: number
  }
  type: string
  isNew?: boolean
  isFeatured?: boolean
  status?: 'active' | 'pending' | 'sold'
  listedAt?: string
  views?: number
}

// Store State Interface
interface PropertyState {
  // View Preferences
  viewMode: 'grid' | 'list'
  sortBy: 'newest' | 'price-asc' | 'price-desc'
  
  // User Preferences
  favorites: string[]
  
  // Search State
  searchQuery: {
    location: string
    propertyType: string
  }
  
  // Filter State
  filters: {
    priceRange: string[]
    propertyType: string[]
    bedrooms: string[]
    bathrooms: string[]
    furnishing: string[]
    amenities: string[]
    areaRange: string[]
    facing: string[]
    possession: string[]
  }

  // Actions
  setViewMode: (mode: 'grid' | 'list') => void
  setSortBy: (sort: PropertyState['sortBy']) => void
  toggleFavorite: (propertyId: string) => void
  setSearchQuery: (query: Partial<PropertyState['searchQuery']>) => void
  setFilters: (filters: Partial<PropertyState['filters']>) => void
  resetFilters: () => void
}

// Create Store
export const usePropertyStore = create<PropertyState>()(
  persist(
    (set) => ({
      // Initial State
      viewMode: 'grid',
      sortBy: 'newest',
      favorites: [],
      searchQuery: {
        location: '',
        propertyType: ''
      },
      filters: {
        priceRange: [],
        propertyType: [],
        bedrooms: [],
        bathrooms: [],
        furnishing: [],
        amenities: [],
        areaRange: [],
        facing: [],
        possession: []
      },

      // Actions
      setViewMode: (mode) => set({ viewMode: mode }),
      
      setSortBy: (sort) => set({ sortBy: sort }),
      
      toggleFavorite: (propertyId) =>
        set((state) => ({
          favorites: state.favorites.includes(propertyId)
            ? state.favorites.filter(id => id !== propertyId)
            : [...state.favorites, propertyId]
        })),

      setSearchQuery: (query) =>
        set((state) => ({
          searchQuery: { ...state.searchQuery, ...query }
        })),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        })),

      resetFilters: () =>
        set((state) => ({
          filters: {
            priceRange: [],
            propertyType: [],
            bedrooms: [],
            bathrooms: [],
            furnishing: [],
            amenities: [],
            areaRange: [],
            facing: [],
            possession: []
          }
        }))
    }),
    {
      name: 'property-store',
      version: 1
    }
  )
)

// Utility function for price formatting
export const formatPrice = (price: number) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lac`
  }
  return `₹${price.toLocaleString()}`
}