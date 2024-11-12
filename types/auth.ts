export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'AGENT' | 'ADMIN'
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  
  login: (email: string, password: string) => Promise<void>
  register: (data: {
    name: string
    email: string
    password: string
    role?: 'USER' | 'AGENT'
  }) => Promise<void>
  logout: () => void
  clearError: () => void
} 