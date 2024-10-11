import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const authRoutes = ['/auth/signin', '/auth/signup']
const protectedRoutes = ['/user/profile', '/create-blog', '/dashboard']

export async function middleware(request) {
    const token = await getToken({ req: request });
    const isLoggedIn = !!token;
    
    // Jika pengguna sudah login dan mencoba mengakses /auth/signin
    if (authRoutes.includes(request.nextUrl.pathname) && isLoggedIn) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (protectedRoutes.includes(request.nextUrl.pathname) && !isLoggedIn) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    
    // Panggil middleware next-auth
    return NextResponse.next();
}

// export const config = {matcher: ['/user/profile']}