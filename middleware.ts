import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
 
let locales = ['en', 'fr']
 
// Get the preferred locale from the Accept-Language header
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return 'fr';
  // Parse the Accept-Language header
  const preferred = acceptLanguage.split(',').map((lang: string) => lang.split(';')[0].trim());
  for (const lang of preferred) {
    const base = lang.split('-')[0];
    if (locales.includes(lang)) return lang;
    if (locales.includes(base)) return base;
  }
  return 'fr';
}
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip API routes, static files, and internal Next.js paths
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next()
  }
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next) and static assets (images, favicon, etc.)
    '/((?!_next|images|favicon|placeholder).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}