import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { apiResponse } from '@/lib/api'
import { sendEmail } from '@/lib/email' // You'll need to implement this

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        subject: data.subject,
        message: data.message,
        status: 'PENDING'
      }
    })

    // Send notification email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `
    })

    return apiResponse(contact)
  } catch (error) {
    console.error('Contact form error:', error)
    return apiResponse(null, 'Failed to submit contact form', 500)
  }
} 