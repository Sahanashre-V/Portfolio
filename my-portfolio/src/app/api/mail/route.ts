import { NextRequest, NextResponse } from 'next/server';
import nodemailer, { Transporter } from 'nodemailer';

// Types for the request body
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Fixed validation function - using 'unknown' instead of 'any'
const validateContactForm = (data: unknown): data is ContactFormData => {
  return (
    data !== null &&
    data !== undefined &&
    typeof data === 'object' &&
    typeof (data as Record<string, unknown>).name === 'string' &&
    typeof (data as Record<string, unknown>).email === 'string' &&
    typeof (data as Record<string, unknown>).message === 'string' &&
    (data as ContactFormData).name.trim().length > 0 &&
    (data as ContactFormData).email.trim().length > 0 &&
    (data as ContactFormData).message.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data as ContactFormData).email)
  );
};

// POST handler for contact form
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input data
    if (!validateContactForm(body)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid form data. Please check your inputs.',
        },
        { status: 400 }
      );
    }

    const { name, email, message }: ContactFormData = body;

    // Check for environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('Email configuration missing in environment variables');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter: Transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error: unknown) {
      console.error('Email transporter verification failed:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Email service configuration error. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Simple email content - plain text format
    const mailOptions: nodemailer.SendMailOptions = {
      from: emailUser,
      to: emailUser, // Send to yourself
      subject: `New Contact Form Message from ${name}`,
      text: `New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
Sent at: ${new Date().toLocaleString()}`,
      replyTo: email, // Allow replying directly to the sender
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Contact form submission error:', error);

    // Handle specific nodemailer errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Email authentication failed. Please try again later.',
          },
          { status: 500 }
        );
      }
      
      if (error.message.includes('Network')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Network error. Please check your connection and try again.',
          },
          { status: 500 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}