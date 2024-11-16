import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { apiResponse } from '@/lib/api'

// Get single property
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!property) {
      return apiResponse(null, 'Property not found', 404)
    }

    // Increment views
    await prisma.property.update({
      where: { id: params.id },
      data: { views: { increment: 1 } }
    })

    return apiResponse(property)

  } catch (error) {
    return apiResponse(null, 'Failed to fetch property', 500)
  }
}

// Update property
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await auth(req)
    const property = await prisma.property.findUnique({
      where: { id: params.id }
    })

    if (!property) {
      return apiResponse(null, 'Property not found', 404)
    }

    if (!user || (user.id !== property.userId && user.role !== 'ADMIN')) {
      return apiResponse(null, 'Unauthorized', 401)
    }

    const data = await req.json()
    const updated = await prisma.property.update({
      where: { id: params.id },
      data
    })

    return apiResponse(updated)

  } catch (error) {
    return apiResponse(null, 'Failed to update property', 500)
  }
} 

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await auth(req)
    const property = await prisma.property.findUnique({
      where: { id: params.id }
    })

    if (!property) {
      return apiResponse(null, 'Property not found', 404)
    }

    if (!user || (user.id !== property.userId && user.role !== 'ADMIN')) {
      return apiResponse(null, 'Unauthorized', 401)
    }

    // Delete associated inquiries first due to foreign key constraints
    await prisma.inquiry.deleteMany({
      where: { propertyId: params.id }
    })

    // Delete the property
    await prisma.property.delete({
      where: { id: params.id }
    })

    return apiResponse({ success: true })

  } catch (error) {
    console.error('Error deleting property:', error)
    return apiResponse(null, 'Failed to delete property', 500)
  }
}