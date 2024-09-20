import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Checking if the user is authenticated
    if (token) {
        const apiUrl = new URL('/api/user/fetchRole', request.url);
        apiUrl.searchParams.append('userEmail', token.email as string);
        
        try {
            const user = await axios.get(apiUrl.toString());
            if (user.data.success) {
                const userRole = user.data.userRole;

                // Allow Admins and StoreOwners to access user routes
                if (url.pathname.startsWith('/user') && (userRole === 'Admin' || userRole === 'StoreOwner')) {
                  return NextResponse.next();
              }

              // Prevent redirect loops by allowing access to their own routes
              if ((url.pathname === '/admin' && userRole === 'Admin') || 
                  (url.pathname === '/store' && userRole === 'StoreOwner')) {
                  return NextResponse.next();
              }

                // Redirecting based on user role
                switch (userRole) {
                    case 'Admin':
                        return NextResponse.redirect(new URL('/admin', request.url));
                    case 'User':
                        return NextResponse.redirect(new URL('/', request.url));
                    case 'StoreOwner':
                        return NextResponse.redirect(new URL('/store', request.url));
                    default:
                        return NextResponse.next();
                }
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            return NextResponse.next();
        }
    }

    // Handle unauthenticated users
    if (!token && (url.pathname.startsWith('/user') || url.pathname.startsWith('/store') || url.pathname.startsWith('/admin') || url.pathname.startsWith('/checkout'))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && url.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url));
    }



    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/sign-up',
        '/verify/:path*',
        '/user/:path*',
        '/store/:path*',
        '/admin/:path*',
    ],
};
