import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password)
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios." },
        { status: 400 }
      );

    const normalizedEmail = String(email).toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }
    if (String(password).length < 8) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 8 caracteres." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, password: true },
    });

    if (existing) {
      // Se já existe e não tem senha (ex: conta criada via OAuth), podemos permitir setar senha
      if (!existing.password) {
        const hashed = await bcrypt.hash(password, 10);
        await prisma.user.update({
          where: { id: existing.id },
          data: { password: hashed, name },
        });
        return NextResponse.json({ ok: true, updated: true }, { status: 200 });
      }
      return NextResponse.json(
        { error: "Já existe uma conta com este email." },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashed,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("/api/auth/signup error:", err);
    return NextResponse.json(
      { error: "Erro ao criar conta. Tente novamente." },
      { status: 500 }
    );
  }
}
