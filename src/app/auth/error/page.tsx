"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const errorMessages = {
  Configuration: "Há um problema com a configuração do servidor.",
  AccessDenied: "Você não tem permissão para fazer login.",
  Verification: "O token de verificação expirou ou já foi usado.",
  Default: "Ocorreu um erro inesperado durante o login.",
};

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") as keyof typeof errorMessages;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-destructive">
            Erro de Autenticação
          </CardTitle>
          <CardDescription>
            {errorMessages[error] || errorMessages.Default}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Button asChild>
              <a href="/auth/signin">Tentar novamente</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Carregando...
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
