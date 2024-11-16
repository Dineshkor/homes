'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { 
  Property, 
  ListingType, 
  PropertyFilters, 
  PropertySearchQuery,
  SortBy 
} from '@/types'

interface PropertyState {
  // View state
  viewMode: 'grid' | 'list'
  sortBy: SortBy
  listingType: ListingType
  
  // Data state
  properties: Property[]
  favorites: string[]
  
  // Filter state
  filters: PropertyFilters
  searchQuery: PropertySearchQuery

  // Actions
  setViewMode: (mode: 'grid' | 'list') => void
  setSortBy: (sort: SortBy) => void
  setListingType: (type: ListingType) => void
  toggleFavorite: (propertyId: string) => void
  
  // Property actions
  setProperties: (properties: Property[]) => void
  addProperty: (property: Property) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  deleteProperty: (id: string) => void
  
  // Filter actions
  setFilters: (filters: Partial<PropertyFilters>) => void
  resetFilters: () => void
  setSearchQuery: (query: Partial<PropertySearchQuery>) => void
  resetSearchQuery: () => void
}

const initialFilters: PropertyFilters = {
  priceRange: [],
  propertyType: [],
  bedrooms: [],
  amenities: []
}

const initialSearchQuery: PropertySearchQuery = {
  listingType: 'BUY',
  location: '',
  propertyType: '',
}

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set) => ({
      // Initial view state
      viewMode: 'grid',
      sortBy: 'newest',
      listingType: 'BUY',
      
      // Initial data state
      properties: [],
      favorites: [],
      
      // Initial filter state
      filters: initialFilters,
      searchQuery: initialSearchQuery,

      // View actions
      setViewMode: (mode) => set({ viewMode: mode }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setListingType: (type) => 
        set((state) => ({ 
          listingType: type,
          searchQuery: { ...state.searchQuery, listingType: type }
        })),
      
      // Favorite actions
      toggleFavorite: (propertyId) => 
        set((state) => ({
          favorites: state.favorites.includes(propertyId)
            ? state.favorites.filter(id => id !== propertyId)
            : [...state.favorites, propertyId]
        })),

      // Property actions
      setProperties: (properties) => set({ properties }),
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
          properties: state.properties.filter(p => p.id !== id),
          favorites: state.favorites.filter(fId => fId !== id)
        })),

      // Filter actions
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters }
        })),
      resetFilters: () =>
        set({ filters: initialFilters }),
      setSearchQuery: (query) =>
        set((state) => ({
          searchQuery: { ...state.searchQuery, ...query }
        })),
      resetSearchQuery: () =>
        set((state) => ({
          searchQuery: { ...initialSearchQuery, listingType: state.listingType }
        })),
    }),
    {
      name: 'property-store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        favorites: state.favorites,
        viewMode: state.viewMode,
        sortBy: state.sortBy,
        listingType: state.listingType
      })
    }
  )
)


