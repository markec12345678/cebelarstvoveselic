import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Placeholder endpoint — blog posts are currently hardcoded in the Blog component.
    // This can be extended to serve posts from the database (Prisma BlogPost model).
    return NextResponse.json({
      success: true,
      posts: [],
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
