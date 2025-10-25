import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ moduleId: string }> }
) {
  try {
    const { moduleId } = await params;

    const lessons = await prisma.lesson.findMany({
      where: {
        moduleId,
      },
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    console.error("Erro ao buscar lições:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
