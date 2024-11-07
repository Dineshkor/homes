export interface PasswordStrength {
    score: number // 0-4
    isStrong: boolean
    hasMinLength: boolean
    hasUpperCase: boolean
    hasLowerCase: boolean
    hasNumber: boolean
    hasSpecialChar: boolean
    suggestions: string[]
  }
  
  export function validatePassword(password: string): PasswordStrength {
    const minLength = 8
    const result: PasswordStrength = {
      score: 0,
      isStrong: false,
      hasMinLength: password.length >= minLength,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      suggestions: []
    }
  
    // Calculate score
    let score = 0
    if (result.hasMinLength) score++
    if (result.hasUpperCase) score++
    if (result.hasLowerCase) score++
    if (result.hasNumber) score++
    if (result.hasSpecialChar) score++
  
    result.score = Math.min(4, Math.floor(score * 0.8))
  
    // Add suggestions based on missing criteria
    if (!result.hasMinLength) {
      result.suggestions.push(`Add at least ${minLength} characters`)
    }
    if (!result.hasUpperCase) {
      result.suggestions.push('Add an uppercase letter')
    }
    if (!result.hasLowerCase) {
      result.suggestions.push('Add a lowercase letter')
    }
    if (!result.hasNumber) {
      result.suggestions.push('Add a number')
    }
    if (!result.hasSpecialChar) {
      result.suggestions.push('Add a special character')
    }
  
    // Password is strong if it meets at least 4 criteria
    result.isStrong = score >= 4
  
    return result
  }