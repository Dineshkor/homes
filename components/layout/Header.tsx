'use client'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

const regions = [
  { name: 'Dehradun', href: '/properties?region=dehradun' },
  { name: 'Mussoorie', href: '/properties?region=mussoorie' },
  { name: 'Nainital', href: '/properties?region=nainital' },
  { name: 'Haridwar', href: '/properties?region=haridwar' },
  { name: 'Rishikesh', href: '/properties?region=rishikesh' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/images/logo.png" 
              alt="Uttarakhand Homes" 
              width={40} 
              height={40} 
            />
            <span className="text-2xl font-bold text-primary">UK Homes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <div className="relative group">
              <button className="hover:text-primary">
                Regions
              </button>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2">
                {regions.map((region) => (
                  <Link
                    key={region.name}
                    href={region.href}
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    {region.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/properties" className="hover:text-primary">Properties</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="px-4 py-2 hover:text-primary"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Add hamburger icon */}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block py-2">Home</Link>
            <div className="py-2">
              <span className="font-medium">Regions</span>
              <div className="pl-4 mt-2 space-y-2">
                {regions.map((region) => (
                  <Link
                    key={region.name}
                    href={region.href}
                    className="block py-1"
                  >
                    {region.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/properties" className="block py-2">Properties</Link>
            <Link href="/contact" className="block py-2">Contact</Link>
            <Link href="/login" className="block py-2">Login</Link>
            <Link href="/register" className="block py-2">Register</Link>
          </div>
        )}
      </nav>
    </header>
  )
}