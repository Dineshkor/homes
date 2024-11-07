'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle, FaFacebook } from 'react-icons/fa'
import { validatePassword, type PasswordStrength } from '@/lib/passwordValidation'

interface FormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  // Update password strength when password changes
  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(validatePassword(formData.password))
    } else {
      setPasswordStrength(null)
    }
  }, [formData.password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Password validation
    if (!passwordStrength?.isStrong) {
      setError('Please create a stronger password')
      setIsLoading(false)
      return
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      // Add your registration logic here
      console.log('Registration attempt:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard on success
      router.push('/dashboard')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function for password strength color
  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0: return 'bg-red-500'
      case 1: return 'bg-red-400'
      case 2: return 'bg-yellow-500'
      case 3: return 'bg-yellow-400'
      case 4: return 'bg-green-500'
      default: return 'bg-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaEnvelope className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaPhone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Password Field with Strength Indicator */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 space-y-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Create a password"
              />
            </div>

            {/* Password Strength Indicator */}
            {passwordStrength && (
              <div className="space-y-2">
                <div className="flex gap-1 h-1">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`h-full w-1/4 rounded-full transition-colors ${
                        index <= passwordStrength.score
                          ? getStrengthColor(passwordStrength.score)
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Strength Label */}
                <div className="flex justify-between text-sm">
                  <span className={`font-medium ${
                    passwordStrength.isStrong ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    Password Strength: {
                      passwordStrength.score === 0 ? 'Very Weak' :
                      passwordStrength.score === 1 ? 'Weak' :
                      passwordStrength.score === 2 ? 'Fair' :
                      passwordStrength.score === 3 ? 'Good' :
                      'Strong'
                    }
                  </span>
                </div>

                {/* Requirements List */}
                <div className="text-sm space-y-1">
                  <p className="font-medium text-gray-700">Password must have:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                    <li className={`flex items-center space-x-2 ${
                      passwordStrength.hasMinLength ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <span>✓</span>
                      <span>At least 8 characters</span>
                    </li>
                    <li className={`flex items-center space-x-2 ${
                      passwordStrength.hasUpperCase ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <span>✓</span>
                      <span>Uppercase letter</span>
                    </li>
                    <li className={`flex items-center space-x-2 ${
                      passwordStrength.hasLowerCase ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <span>✓</span>
                      <span>Lowercase letter</span>
                    </li>
                    <li className={`flex items-center space-x-2 ${
                      passwordStrength.hasNumber ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <span>✓</span>
                      <span>Number</span>
                    </li>
                    <li className={`flex items-center space-x-2 ${
                      passwordStrength.hasSpecialChar ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      <span>✓</span>
                      <span>Special character</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            id="agreeToTerms"
            type="checkbox"
            required
            checked={formData.agreeToTerms}
            onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
            I agree to the{' '}
            <a href="/terms" className="text-primary hover:text-primary-dark">
              Terms and Conditions
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      {/* Social Registration */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <FaGoogle className="h-5 w-5 text-red-500" />
            <span className="ml-2">Google</span>
          </button>
          <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <FaFacebook className="h-5 w-5 text-blue-600" />
            <span className="ml-2">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  )
}