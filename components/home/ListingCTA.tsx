'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FaHome, FaCheckCircle } from 'react-icons/fa'

const benefits = [
  'List your property for free',
  'Reach thousands of potential buyers',
  'Professional photography service',
  'Dedicated property consultant',
]

export default function ListingCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with darker overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta/listing-bg.jpg"
          alt="List your property"
          fill
          className="object-cover"
        />
        {/* Darker overlay with multiple layers for better contrast */}
        <div className="absolute inset-0 bg-black/60" /> {/* Base dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" /> {/* Gradient overlay */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content - Added text shadow for better readability */}
          <div className="text-white drop-shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
              List Your Property With Us
            </h2>
            <p className="text-white text-lg mb-8 drop-shadow">
              Join thousands of satisfied property owners who have successfully sold or rented their properties through UK Homes.
            </p>

            {/* Benefits List - Added background for better readability */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm rounded-lg p-2"
                >
                  <FaCheckCircle className="text-white h-5 w-5 flex-shrink-0" />
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/properties/add"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <FaHome className="mr-2" />
                List Your Property
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Content - Stats with darker background */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: '1200+', label: 'Properties Listed' },
              { number: '800+', label: 'Happy Clients' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-lg text-white border border-white/10 hover:bg-black/50 transition-colors duration-300"
              >
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}