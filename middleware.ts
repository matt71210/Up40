import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Pour le MVP local, on passe le middleware en "transparent"
export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
