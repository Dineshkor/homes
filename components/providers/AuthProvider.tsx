'use client'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function AuthProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()

  useEffect(() => {
    // Rehydrate the store
    useAuth.persist.rehydrate()
  }, [])

  return <>{children}</>
} 