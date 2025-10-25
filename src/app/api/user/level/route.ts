import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { level } = body;

    if (!level || !["INICIANTE", "INTERMEDIARIO", "AVANCADO"].includes(level)) {
      return NextResponse.json({ error: "Nível inválido" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        level: level as "INICIANTE" | "INTERMEDIARIO" | "AVANCADO",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao atualizar nível:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
