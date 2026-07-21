import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const RECAPTCHA_ACTION = 'contact_form'
const RECAPTCHA_MIN_SCORE = 0.5

type RecaptchaResponse = {
  success: boolean
  score?: number
  action?: string
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[character] as string))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, interest, website, recaptchaToken } = body

    // Honeypot fields are invisible to people but are commonly filled by bots.
    if (website) {
      return NextResponse.json({ success: true })
    }

    // Validate required fields
    if (![name, email, company, interest, recaptchaToken].every((value) => typeof value === 'string' && value.trim())) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (name.length > 100 || email.length > 254 || company.length > 150 || interest.length > 3000) {
      return NextResponse.json({ error: 'One or more fields are too long' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (!recaptchaSecret) {
      console.error('RECAPTCHA_SECRET_KEY is not configured')
      return NextResponse.json({ error: 'Spam protection is unavailable' }, { status: 500 })
    }

    const verificationBody = new URLSearchParams({
      secret: recaptchaSecret,
      response: recaptchaToken,
    })
    const verificationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verificationBody,
      cache: 'no-store',
    })
    const verification = await verificationResponse.json() as RecaptchaResponse

    if (
      !verification.success ||
      verification.action !== RECAPTCHA_ACTION ||
      (verification.score ?? 0) < RECAPTCHA_MIN_SCORE
    ) {
      console.warn('Contact form rejected by reCAPTCHA', {
        success: verification.success,
        action: verification.action,
        score: verification.score,
      })
      return NextResponse.json({ error: 'Unable to verify submission' }, { status: 403 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'Email service is unavailable' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    const safeName = escapeHtml(name.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeCompany = escapeHtml(company.trim())
    const safeInterest = escapeHtml(interest.trim()).replace(/\n/g, '<br>')
    
    const { data, error } = await resend.emails.send({
      from: 'Business Culture Solution <info@businessculturesolution.com>',
      to: ['rachel@rewirehypnosis.ca'],
      replyTo: email.trim(),
      subject: `New Contact from Business Culture Solution Website`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2C2C2C; border-bottom: 2px solid #c89116; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${safeCompany}</p>
            <p style="margin: 10px 0;"><strong>Interest:</strong></p>
            <p style="margin: 10px 0; padding: 15px; background-color: #f7f8fa; border-left: 4px solid #c89116;">
              ${safeInterest}
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
