import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        lang: true,
        createdAt: true,
      },
    })

    const formatted = submissions.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      subject: s.subject,
      message: s.message,
      lang: s.lang,
      createdAt: s.createdAt.toISOString(),
    }))

    return NextResponse.json({ success: true, data: formatted })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions.' },
      { status: 500 }
    )
  }
}
