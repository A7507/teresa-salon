import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  // Middleware desativado para permitir acesso local
  // Proteção será feita apenas no client-side com localStorage
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
