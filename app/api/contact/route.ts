import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    
    if (!apiKey) {
      console.error('RESEND_API_KEY not found in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, email, company, interest } = body

    // Validate required fields
    if (!name || !email || !company || !interest) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    const { data, error } = await resend.emails.send({
      from: 'Business Culture Solution <onboarding@resend.dev>', // Update this with your verified domain
      to: ['info@businessculturesolution.com'],
      subject: `New Contact from Business Culture Solution Website`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2C2C2C; border-bottom: 2px solid #c89116; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 10px 0;"><strong>Interest:</strong></p>
            <p style="margin: 10px 0; padding: 15px; background-color: #f7f8fa; border-left: 4px solid #c89116;">
              ${interest}
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          
          <p style="color: #6B6B6B; font-size: 12px;">
            This email was sent from the Business Culture Solution website contact form.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}