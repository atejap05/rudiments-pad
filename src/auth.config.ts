import { type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user, token }) {
      if (session.user) {
        // Para database sessions (OAuth), user vem populado
        // Para JWT sessions (Credentials), usar token.sub
        session.user.id = user?.id ?? token?.sub ?? "";
      }
      return session;
    },
    jwt({ token, user }) {
      // Ao fazer login, user está disponível; adicionar id ao token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
} satisfies NextAuthConfig;
