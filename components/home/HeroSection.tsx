'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa'

export default function HeroSection() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/properties?search=${searchTerm}&location=${location}`)
  }

  return (
    <div className="relative h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Beautiful homes"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Find Your Dream Home
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover the perfect property from our extensive collection of homes, apartments, and luxury estates
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/95 focus:bg-white focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div className="flex-1 relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/95 focus:bg-white focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <button
              type="submit"
              className="md:w-auto w-full px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-white">
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-white/80">Properties Listed</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-white/80">Happy Customers</div>
          </div>
          <div className="text-white hidden md:block">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-white/80">Cities Covered</div>
          </div>
        </div>
      </div>
    </div>
  )
}