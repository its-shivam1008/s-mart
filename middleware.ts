import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
export {default} from 'next-auth/middleware'
import type { NextRequest } from 'next/server'
import UserModel from './models/User'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    const url = request.nextUrl
    if(token){
      const user = await UserModel.findOne({email:token?.email})
      if(user){
        if(!user?.password){
          return NextResponse.redirect(new URL('/setup-password', request.url))
        }
      }
    }
    if(token &&  (
        url.pathname.startsWith('/login')||
        url.pathname.startsWith('/sign-up')||
        url.pathname.startsWith('/verify')
    )){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(!token && url.pathname.startsWith('/user/profile')){
        return NextResponse.redirect(new URL('/sign-up', request.url))
    }
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/sign-up',
    '/verify/:path*',
  ],
}