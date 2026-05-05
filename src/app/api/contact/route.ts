import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please provide a valid email address.'),
  subject: z.string().min(2, 'Subject must be at least 2 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
  lang: z.string().default('sl'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Invalid input data.';
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { name, email, subject, message, lang } = result.data;

    await db.contactSubmission.create({
      data: { name, email, subject, message, lang },
    });

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
