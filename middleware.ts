import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    const url = request.nextUrl
    if(token &&  (
        url.pathname.startsWith('/login')||
        url.pathname.startsWith('/sign-up')||
        url.pathname.startsWith('/verify')
    )){
        return NextResponse.redirect(new URL('/', request.url))
    }
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/sign-up',
    '/verify/:path*',
  ],
}