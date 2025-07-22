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

    // Email content
    const mailOptions: nodemailer.SendMailOptions = {
      from: emailUser,
      to: emailUser, // Send to yourself
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #4f46e5; padding-bottom: 10px; margin-bottom: 20px;">
              New Contact Form Submission
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #4f46e5; margin-bottom: 10px;">Contact Information:</h3>
              <p style="margin: 5px 0; color: #666;">
                <strong style="color: #333;">Name:</strong> ${name}
              </p>
              <p style="margin: 5px 0; color: #666;">
                <strong style="color: #333;">Email:</strong> 
                <a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #4f46e5; margin-bottom: 10px;">Message:</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #4f46e5;">
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="margin: 0; color: #888; font-size: 12px;">
                This message was sent from your portfolio contact form at ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        Sent at: ${new Date().toLocaleString()}
      `,
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