import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const subscribers = await db.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: {
        id: true,
        email: true,
        lang: true,
        active: true,
        createdAt: true,
      },
    })

    const formatted = subscribers.map((s) => ({
      id: s.id,
      email: s.email,
      lang: s.lang,
      active: s.active,
      createdAt: s.createdAt.toISOString(),
    }))

    return NextResponse.json({ success: true, data: formatted })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers.' },
      { status: 500 }
    )
  }
}
