import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const progress = await prisma.userProgress.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
      },
      orderBy: {
        lastPracticedAt: "desc",
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Erro ao buscar progresso:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId, completed, bestScore } = body;

    if (!lessonId) {
      return NextResponse.json(
        { error: "ID da lição é obrigatório" },
        { status: 400 }
      );
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId,
        },
      },
      update: {
        completed: completed ?? undefined,
        bestScore: bestScore ?? undefined,
        lastPracticedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        lessonId,
        completed: completed ?? false,
        bestScore: bestScore ?? undefined,
        lastPracticedAt: new Date(),
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Erro ao salvar progresso:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
