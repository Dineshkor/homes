'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaQuoteRight, FaStar } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Property Buyer',
    image: '/images/testimonials/person1.jpg',
    content: 'Found my dream home in Dehradun through UK Homes. The team was extremely professional and helped me throughout the buying process.',
    rating: 5
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Property Seller',
    image: '/images/testimonials/person2.jpg',
    content: 'Excellent service! They helped me sell my property in Mussoorie at the best price. Very satisfied with their market knowledge.',
    rating: 5
  },
  {
    id: 3,
    name: 'Amit Singh',
    role: 'Investor',
    image: '/images/testimonials/person3.jpg',
    content: 'Great investment opportunities in Uttarakhand. UK Homes team provided valuable insights that helped me make informed decisions.',
    rating: 5
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read testimonials from our satisfied clients about their experience with UK Homes
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300
                  ${index === activeIndex ? 'border-2 border-primary' : 'border border-gray-100'}`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="relative mb-8">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -right-4 bg-primary/10 p-3 rounded-full">
                    <FaQuoteRight className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-600 mb-6">
                  {testimonial.content}
                </p>

                {/* Rating */}
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}