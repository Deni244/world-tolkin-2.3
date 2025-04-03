
import { NextRequest, NextResponse } from 'next/server';


export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    if (url.pathname.startsWith('/books/')) {
        const name = url.pathname.split('/')[2];

        try {
            decodeURIComponent(name);
        } catch {
            console.error(`Некоректний URI: ${name}`);
            const url = req.nextUrl.clone()
            url.pathname = '/404'
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/books/:path*'],
};



