import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { db } from '@/lib/db';

const orderItemSchema = z.object({
  productId: z.number(),
  name: z.string(),
  quantity: z.number().int().min(1),
  price: z.number().min(0),
});

const orderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please provide a valid email address.'),
  phone: z.string().min(5, 'Phone number must be at least 5 characters.'),
  street: z.string().min(2, 'Street address must be at least 2 characters.'),
  city: z.string().min(2, 'City must be at least 2 characters.'),
  postalCode: z.string().min(4, 'Postal code must be at least 4 characters.'),
  paymentMethod: z.string().min(1, 'Payment method is required.'),
  items: z.array(orderItemSchema).min(1, 'Order must contain at least one item.'),
  subtotal: z.number().min(0, 'Subtotal must be a positive number.'),
  shippingCost: z.number().min(0, 'Shipping cost must be a positive number.'),
  total: z.number().min(0, 'Total must be a positive number.'),
  notes: z.string().default(''),
  lang: z.string().default('sl'),
});

function generateOrderNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const bytes = crypto.randomBytes(7);
  for (let i = 0; i < 7; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return `VES-${result}`;
}

export async function POST(request: NextRequest) {
  try {
    // Only allow POST
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, error: 'Method not allowed.' },
        { status: 405 }
      );
    }

    const body = await request.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || 'Invalid input data.';
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const data = result.data;
    let orderNumber = generateOrderNumber();

    // Ensure uniqueness (very unlikely collision, but be safe)
    let attempts = 0;
    while (attempts < 5) {
      const existing = await db.honeyOrder.findUnique({
        where: { orderNumber },
      });
      if (!existing) break;
      orderNumber = generateOrderNumber();
      attempts++;
    }

    await db.honeyOrder.create({
      data: {
        orderNumber,
        name: data.name,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        postalCode: data.postalCode,
        notes: data.notes,
        paymentMethod: data.paymentMethod,
        items: JSON.stringify(data.items),
        subtotal: data.subtotal,
        shippingCost: data.shippingCost,
        total: data.total,
        lang: data.lang,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully.',
      orderNumber,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
