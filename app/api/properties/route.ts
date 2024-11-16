import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { apiResponse } from '@/lib/api'
import { ListingType } from '@prisma/client'

// Get properties with filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const listingType = searchParams.get('listingType')
    const type = searchParams.get('type')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const location = searchParams.get('location')

    const where = {
      ...(listingType && { listingType: listingType as ListingType }),
      ...(type && { type }),
      ...(location && {
        location: {
          path: ['$'],
          string_contains: location,
          mode: 'insensitive'
        }
      }),
      ...(minPrice || maxPrice ? {
        OR: [
          {
            price: {
              ...(minPrice && { gte: parseFloat(minPrice) }),
              ...(maxPrice && { lte: parseFloat(maxPrice) })
            }
          },
          {
            rentalPrice: {
              ...(minPrice && { gte: parseFloat(minPrice) }),
              ...(maxPrice && { lte: parseFloat(maxPrice) })
            }
          }
        ]
      } : {})
    }
    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '9');

    const total = await prisma.property.count({ where });

    const properties = await prisma.property.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return apiResponse({
      properties,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching properties:', error);
    return apiResponse(null, 'Failed to fetch properties', 500)
  }
}
// Create new property
export async function POST(req: NextRequest) {
  try {
    const user = await auth(req)
    if (!user || (user.role !== 'AGENT' && user.role !== 'ADMIN')) {
      return apiResponse(null, 'Unauthorized', 401)
    }

    const data = await req.json()
    const property = await prisma.property.create({
      data: {
        ...data,
        userId: user.id
      }
    })

    return apiResponse(property)

  } catch (error) {
    return apiResponse(null, 'Failed to create property', 500)
  }
}