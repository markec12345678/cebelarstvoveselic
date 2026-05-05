import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const newsletterSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
  lang: z.string().default('sl'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Invalid input data.';
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const { email, lang } = result.data;

    const existing = await db.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed!',
        });
      }
      // Reactivate inactive subscriber
      await db.newsletterSubscriber.update({
        where: { email },
        data: { active: true },
      });
      return NextResponse.json({
        success: true,
        message: 'Subscription reactivated successfully.',
      });
    }

    await db.newsletterSubscriber.create({
      data: { email, lang },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing!',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
