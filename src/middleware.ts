import { NextResponse } from 'next/server'

export function middleware() {
  return NextResponse.next()
}

// Temporary disable auth during build
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
} 