import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const [
      totalSubmissions,
      totalSubscribers,
      activeSubscribers,
      recentSubmissions,
      recentSubscribers,
    ] = await Promise.all([
      db.contactSubmission.count(),
      db.newsletterSubscriber.count(),
      db.newsletterSubscriber.count({ where: { active: true } }),
      db.contactSubmission.count({
        where: { createdAt: { gte: sevenDaysAgo } },
      }),
      db.newsletterSubscriber.count({
        where: { createdAt: { gte: sevenDaysAgo } },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalSubmissions,
        totalSubscribers,
        activeSubscribers,
        recentSubmissions,
        recentSubscribers,
      },
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats.' },
      { status: 500 }
    )
  }
}
