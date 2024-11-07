'use client'
import Link from 'next/link'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">UK Homes</h3>
            <p className="mb-4">
              Your trusted partner in finding the perfect property in Uttarakhand.
            </p>
            <div className="space-y-2">
              <a href="tel:+911234567890" className="flex items-center hover:text-white">
                <FaPhone className="mr-2" />
                +91 123 456 7890
              </a>
              <a href="mailto:info@ukhomes.com" className="flex items-center hover:text-white">
                <FaEnvelope className="mr-2" />
                info@ukhomes.com
              </a>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                Dehradun, Uttarakhand
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Popular Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?location=dehradun" className="hover:text-white">
                  Dehradun
                </Link>
              </li>
              <li>
                <Link href="/properties?location=mussoorie" className="hover:text-white">
                  Mussoorie
                </Link>
              </li>
              <li>
                <Link href="/properties?location=nainital" className="hover:text-white">
                  Nainital
                </Link>
              </li>
              <li>
                <Link href="/properties?location=haridwar" className="hover:text-white">
                  Haridwar
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter for the latest property updates.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 UK Homes. All rights reserved.</p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}