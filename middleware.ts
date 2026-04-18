import { NextResponse, type NextRequest } from "next/server";

import { getCurrentUserFromRequest } from "@/lib/auth";
import { SESSION_COOKIE_NAME } from "@/lib/auth-constants";

/**
 * Este middleware protege as rotas administrativas
 * Se não houver token de sessão válido, o usuário é redirecionado para /admin/login
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Se a rota começa com /admin (exceto /admin/login e /admin/login/...)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const user = await getCurrentUserFromRequest(request);

    // Se não houver usuário autenticado, redireciona para o login
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Protege rotas de admin mas permite:
     * - API routes
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
import { NextResponse, type NextRequest } from "next/server";

import { getCurrentUserFromRequest } from "@/lib/auth";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  // Permitir acesso direto ao login
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Proteger todas as outras rotas de admin
  const user = await getCurrentUserFromRequest(request);

  if (!user) {
    // Redirecionar para login se não autenticado
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}
