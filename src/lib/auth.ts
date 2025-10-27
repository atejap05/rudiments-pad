import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Provider } from "next-auth/providers";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

const providers: Provider[] = [
  ...authConfig.providers, // Provedores OAuth (Google, etc.)
  CredentialsProvider({
    id: "credentials",
    name: "Email e Senha",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Senha", type: "password" },
    },
    async authorize(credentials) {
      const email = (credentials?.email as string | undefined)
        ?.toLowerCase()
        .trim();
      const password = (credentials?.password as string | undefined) ?? "";

      if (!email || !password) return null;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.password) return null;

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return null;

      return {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        image: user.image ?? null,
      } as any;
    },
  }),
];

// Opcional: Email magic link habilitado SOMENTE quando SMTP estiver configurado
if (process.env.AUTH_EMAIL_ENABLED === "true" && process.env.EMAIL_SERVER) {
  providers.push(
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM || "noreply@example.com",
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers,
});
