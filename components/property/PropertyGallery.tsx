'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaExpand, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

interface PropertyGalleryProps {
  images: string[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [showLightbox, setShowLightbox] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="relative h-[60vh] bg-gray-100">
        <div className="container mx-auto h-full">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
            {/* Main Image */}
            <div className="col-span-2 row-span-2 relative">
              <Image
                src={images[0]}
                alt="Property main view"
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Grid */}
            {images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Property view ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}

            {/* View All Button */}
            <button
              onClick={() => setShowLightbox(true)}
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-gray-50 transition-colors"
            >
              <FaExpand />
              <span>View All Photos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative h-[80vh] w-[80vw]">
            <Image
              src={images[currentImageIndex]}
              alt={`Property view ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}