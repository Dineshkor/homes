'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaPlus, FaUser } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">UK Homes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/properties" className="hover:text-primary transition-colors">
              Properties
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth & Add Property Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Add Property Button */}
            <Link 
              href="/properties/add" 
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <FaPlus className="mr-2 h-4 w-4" />
              <span>Add Property</span>
            </Link>

            {/* Login/Register Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-colors">
                <FaUser className="h-4 w-4" />
                <span>Account</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link 
                  href="/login" 
                  className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="pt-4 space-y-4">
              <Link href="/" className="block hover:text-primary">
                Home
              </Link>
              <Link href="/properties" className="block hover:text-primary">
                Properties
              </Link>
              <Link href="/contact" className="block hover:text-primary">
                Contact
              </Link>
              
              {/* Mobile Add Property Button */}
              <Link 
                href="/properties/add" 
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <FaPlus className="mr-2 h-4 w-4" />
                <span>Add Property</span>
              </Link>

              {/* Mobile Auth Links */}
              <div className="pt-4 border-t border-gray-100">
                <Link href="/login" className="block py-2 hover:text-primary">
                  Login
                </Link>
                <Link href="/register" className="block py-2 hover:text-primary">
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}