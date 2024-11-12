import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import { apiResponse } from '@/lib/api'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return apiResponse(null, 'Invalid credentials', 401)
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return apiResponse(null, 'Invalid credentials', 401)
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return apiResponse({ token, user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }})

  } catch (error) {
    return apiResponse(null, 'Internal server error', 500)
  }
} 