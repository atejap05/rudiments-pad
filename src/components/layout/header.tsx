"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold text-xl">🥁 Rudiment Pad</span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Navigation items can go here */}
          </div>

          <nav className="flex items-center space-x-2">
            <ThemeToggle />

            {status === "loading" ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            ) : session ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Olá, {session.user?.name || session.user?.email}
                </span>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="/auth/signin">Entrar</a>
                </Button>
                <Button size="sm" asChild>
                  <a href="/auth/signup">Criar conta</a>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
