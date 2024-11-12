import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { apiResponse } from '@/lib/api'

export async function POST(req: NextRequest) {
  try {
    const user = await auth(req)
    if (!user) {
      return apiResponse(null, 'Unauthorized', 401)
    }

    const { propertyId, message } = await req.json()
    const inquiry = await prisma.inquiry.create({
      data: {
        userId: user.id,
        propertyId,
        message
      }
    })

    return apiResponse(inquiry)

  } catch (error) {
    return apiResponse(null, 'Failed to create inquiry', 500)
  }
} 