import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Inicializa o NextAuth de forma "leve" apenas com a configuração segura para o Edge.
// O adapter do Prisma não é incluído aqui.
export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    // Protege as rotas da aplicação
    "/dashboard/:path*",
    "/courses/:path*",
    "/modules/:path*",
    "/practice/:path*",
    "/profile/:path*",
    "/onboarding/:path*",

    // Exclui rotas que não devem ser protegidas
    // A expressão regular negativa garante que rotas como /api, /_next/static, etc. sejam ignoradas.
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
