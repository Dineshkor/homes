'use client'
import PropertySearch from '../property/PropertySearch'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/uttarakhand-hero.jpg"
          alt="Uttarakhand Mountains"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Find Your Dream Home in Uttarakhand
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Discover properties in the land of Gods - from mountain views to riverside homes
          </p>
          <PropertySearch />
        </div>
      </div>
    </section>
  )
}