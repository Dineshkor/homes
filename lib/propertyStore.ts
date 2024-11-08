'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { featuredProperties } from '@/components/home/FeaturedProperties'

export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string | {
    address: string
    city: string
    state: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  image: string
  features: {
    bedrooms: number
    bathrooms: number
    area: number
    parking?: number
    furnished?: string
    floor?: string
  }
  type: string
  status?: 'active' | 'pending' | 'sold'
  isNew?: boolean
  isFeatured?: boolean
  listedAt?: string
  views?: number
  amenities?: string[]
  images?: string[]
  agent?: {
    name: string
    phone: string
    email: string
    image: string
  }
}

interface PropertyState {
  // View state
  viewMode: 'grid' | 'list'
  sortBy: 'newest' | 'price-asc' | 'price-desc'
  favorites: string[]
  properties: Property[]

  // Search state
  searchQuery: {
    location: string
    propertyType: string
    priceRange?: {
      min: number
      max: number
    }
    features?: {
      bedrooms?: number
      bathrooms?: number
      minArea?: number
    }
    amenities?: string[]
  }

  // Filter state
  filters: {
    priceRange: string[]
    propertyType: string[]
    bedrooms: string[]
    amenities: string[]
  }

  // Actions
  setViewMode: (mode: 'grid' | 'list') => void
  setSortBy: (sort: PropertyState['sortBy']) => void
  toggleFavorite: (propertyId: string) => void
  
  // Property actions
  addProperty: (property: Property) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  deleteProperty: (id: string) => void
  setProperties: (properties: Property[]) => void

  // Search actions
  setSearchQuery: (query: Partial<PropertyState['searchQuery']>) => void
  resetSearchQuery: () => void

  // Filter actions
  setFilters: (filters: Partial<PropertyState['filters']>) => void
  resetFilters: () => void
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set) => ({
      // Initial state
      viewMode: 'grid',
      sortBy: 'newest',
      favorites: [],
      properties: featuredProperties,
      searchQuery: {
        location: '',
        propertyType: '',
      },
      filters: {
        priceRange: [],
        propertyType: [],
        bedrooms: [],
        amenities: [],
      },

      // View actions
      setViewMode: (mode) => set({ viewMode: mode }),
      setSortBy: (sort) => set({ sortBy: sort }),
      toggleFavorite: (propertyId) => 
        set((state) => ({
          favorites: state.favorites.includes(propertyId)
            ? state.favorites.filter(id => id !== propertyId)
            : [...state.favorites, propertyId]
        })),

      // Property actions
      addProperty: (property) =>
        set((state) => ({
          properties: [...state.properties, property]
        })),
      updateProperty: (id, updates) =>
        set((state) => ({
          properties: state.properties.map(p =>
            p.id === id ? { ...p, ...updates } : p
          )
        })),
      deleteProperty: (id) =>
        set((state) => ({
          properties: state.properties.filter(p => p.id !== id)
        })),
      setProperties: (properties) => set({ properties }),

      // Search actions
      setSearchQuery: (query) => 
        set((state) => ({
          searchQuery: { ...state.searchQuery, ...query }
        })),
      resetSearchQuery: () => 
        set({ 
          searchQuery: { location: '', propertyType: '' }
        }),

      // Filter actions
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters }
        })),
      resetFilters: () =>
        set({
          filters: {
            priceRange: [],
            propertyType: [],
            bedrooms: [],
            amenities: [],
          }
        })
    }),
    {
      name: 'property-store'
    }
  )
)

// Utility functions
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price)
}