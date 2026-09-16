import { NextResponse, type NextRequest } from 'next/server';

const siteCookieName = 'globill_site_host';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const requestedSite = request.nextUrl.searchParams.get('site') ?? request.nextUrl.searchParams.get('host');
  const cookieSite = request.cookies.get(siteCookieName)?.value;
  const siteHost = requestedSite ?? cookieSite;

  if (siteHost) {
    requestHeaders.set('x-globill-preview-host', siteHost);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  if (requestedSite) {
    response.cookies.set(siteCookieName, requestedSite, {
      path: '/',
      sameSite: 'lax'
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
