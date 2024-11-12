'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState } from '@/types/auth'

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null })
          
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })

          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.error || 'Login failed')
          }

          set({ 
            user: data.data.user,
            token: data.data.token,
            isLoading: false 
          })

        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          })
        }
      },

      register: async (userData) => {
        try {
          set({ isLoading: true, error: null })
          
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
          })

          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.error || 'Registration failed')
          }

          set({ 
            user: data.data.user,
            token: data.data.token,
            isLoading: false 
          })

        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false 
          })
        }
      },

      logout: () => {
        set({ user: null, token: null })
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      skipHydration: true
    }
  )
)
