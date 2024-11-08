'use client'
import { useState } from 'react'
import { FaUpload } from 'react-icons/fa'

interface PropertyFormData {
  id?: string
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
  status: 'active' | 'pending' | 'sold'
}

interface PropertyFormProps {
  initialData?: PropertyFormData
  onSubmit: (data: PropertyFormData) => void
  isLoading?: boolean
}

export default function PropertyForm({ initialData, onSubmit, isLoading }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    location: initialData?.location || '',
    image: initialData?.image || '',
    features: {
      bedrooms: initialData?.features.bedrooms || 0,
      bathrooms: initialData?.features.bathrooms || 0,
      area: initialData?.features.area || 0
    },
    type: initialData?.type || 'house',
    status: initialData?.status || 'active'
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name.startsWith('features.')) {
      const feature = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [feature]: Number(value)
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Property Type
              </label>
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                required
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Features</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="features.bedrooms" className="block text-sm font-medium text-gray-700">
                Bedrooms
              </label>
              <input
                type="number"
                name="features.bedrooms"
                id="features.bedrooms"
                value={formData.features.bedrooms}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="features.bathrooms" className="block text-sm font-medium text-gray-700">
                Bathrooms
              </label>
              <input
                type="number"
                name="features.bathrooms"
                id="features.bathrooms"
                value={formData.features.bathrooms}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="features.area" className="block text-sm font-medium text-gray-700">
                Area (sq ft)
              </label>
              <input
                type="number"
                name="features.area"
                id="features.area"
                value={formData.features.area}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : initialData ? 'Update Property' : 'Add Property'}
          </button>
        </div>
      </div>
    </form>
  )
}