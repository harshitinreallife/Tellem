
import { NextResponse, NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"
export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/",'/tells/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'
    ],
}

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl
    if (token &&
        (url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/verify') 
            
        )
    ) {
        return NextResponse.redirect(new URL('/tells', request.url))
    }
    if (!token && url.pathname.startsWith('/tells')) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }


    return NextResponse.next()
}
