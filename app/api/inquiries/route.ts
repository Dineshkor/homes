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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await auth(req)
    if (!user) {
      return apiResponse(null, 'Unauthorized', 401)
    }

    const { status } = await req.json()
    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: { status }
    })

    return apiResponse(inquiry)
  } catch (error) {
    return apiResponse(null, 'Failed to update inquiry', 500)
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await auth(req)
    if (!user) {
      return apiResponse(null, 'Unauthorized', 401)
    }

    const inquiries = await prisma.inquiry.findMany({
      where: user.role === 'ADMIN' ? {} : { userId: user.id },
      include: {
        property: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    return apiResponse(inquiries)
  } catch (error) {
    return apiResponse(null, 'Failed to fetch inquiries', 500)
  }
} 