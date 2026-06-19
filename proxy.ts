import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const eventId = request.cookies.get('eventId')?.value

  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === '/'

  // Invalid session (missing token or eventId)
  if ((!token || !eventId) && !isLoginPage) {
    const response = NextResponse.redirect(new URL('/', request.url))

    response.cookies.delete('accessToken')
    response.cookies.delete('eventId')

    return response
  }

  // Already logged in
  if (token && eventId && isLoginPage) {
    return NextResponse.redirect(new URL(`/${eventId}/dashboard`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/:eventId/dashboard/:path*',
    '/:eventId/scan/:path*',
    '/:eventId/print/:path*',
  ],
}
