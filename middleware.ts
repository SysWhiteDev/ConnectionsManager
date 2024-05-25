import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from './utils/supabase/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  await updateSession(request)
  if (user && path.includes("/auth")) {
    return NextResponse.redirect(new URL('/dash', request.url));
  } else if (!user && !(path === "/" || path.startsWith("/auth") || path.startsWith("/qr") || path.startsWith("/api"))) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}