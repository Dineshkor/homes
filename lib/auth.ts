import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

export interface JWTPayload {
  userId: string
}

export async function auth(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    return user

  } catch (error) {
    return null
  }
}

export async function hashPassword(password: string) {
  const bcrypt = await import('bcryptjs')
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePasswords(password: string, hashedPassword: string) {
  const bcrypt = await import('bcryptjs')
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )
}
