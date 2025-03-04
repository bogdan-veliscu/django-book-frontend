import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Define public paths that don't require authentication
  const isPublicPath = path.startsWith('/login') || 
                       path.startsWith('/register') || 
                       path.startsWith('/api/auth') || 
                       path.startsWith('/api/health') ||
                       path.startsWith('/_next') || 
                       path.startsWith('/favicon.ico') ||
                       path.startsWith('/health') ||
                       path === '/'
  
  // If it's a public path, allow access without checking auth
  if (isPublicPath) {
    return NextResponse.next()
  }
  
  // For API routes, we need to check if they're auth-related
  if (path.startsWith('/api')) {
    // For API routes, we'll let the backend handle authentication
    return NextResponse.next()
  }
  
  try {
    // For protected routes, check for a session token
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })
    
    // If no token and trying to access a protected route, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      // Don't add callback URL to prevent potential redirect loops
      return NextResponse.redirect(loginUrl)
    }
    
    // Otherwise, allow access
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    // In case of error, allow the request to proceed
    // This prevents blocking users due to auth errors
    return NextResponse.next()
  }
}

// Configure which paths should be protected by the middleware
export const config = {
  matcher: [
    // Match all pages except public ones
    '/((?!api|_next/static|_next/image|favicon.ico|health|login|register).*)',
  ],
} 