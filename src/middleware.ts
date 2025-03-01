import { auth } from '../auth'

// Export the auth middleware directly
export default auth

// Configure which paths should be protected by the middleware
export const config = {
  matcher: [
    // Match all API routes except auth and health endpoints
    '/api/((?!auth|health).*)',
    // Match all pages except public ones
    '/((?!api|_next/static|_next/image|favicon.ico|health|login|register).*)',
  ],
} 