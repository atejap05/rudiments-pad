import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

// Sample rhythm patterns for lessons
const singleStrokePatterns = [
  {
    title: "Single Stroke em Semínimas",
    description: "Pratique o single stroke em semínimas (notas de 1 tempo)",
    difficulty: "INICIANTE" as const,
    timeSignature: "[4,4]",
    minBpm: 60,
    targetBpm: 80,
    pattern: JSON.stringify([
      { beat: 1, subdivision: 1, hand: "R", isAccent: true },
      { beat: 2, subdivision: 1, hand: "L", isAccent: false },
      { beat: 3, subdivision: 1, hand: "R", isAccent: false },
      { beat: 4, subdivision: 1, hand: "L", isAccent: false },
    ]),
    order: 1,
  },
  {
    title: "Single Stroke em Colcheias",
    description: "Pratique o single stroke em colcheias (notas de meio tempo)",
    difficulty: "INICIANTE" as const,
    timeSignature: "[4,4]",
    minBpm: 60,
    targetBpm: 100,
    pattern: JSON.stringify([
      { beat: 1, subdivision: 1, hand: "R", isAccent: true },
      { beat: 1, subdivision: 2, hand: "L", isAccent: false },
      { beat: 2, subdivision: 1, hand: "R", isAccent: false },
      { beat: 2, subdivision: 2, hand: "L", isAccent: false },
      { beat: 3, subdivision: 1, hand: "R", isAccent: false },
      { beat: 3, subdivision: 2, hand: "L", isAccent: false },
      { beat: 4, subdivision: 1, hand: "R", isAccent: false },
      { beat: 4, subdivision: 2, hand: "L", isAccent: false },
    ]),
    order: 2,
  },
  {
    title: "Single Stroke em Semicolcheias",
    description:
      "Pratique o single stroke em semicolcheias (notas de 1/4 de tempo)",
    difficulty: "INTERMEDIARIO" as const,
    timeSignature: "[4,4]",
    minBpm: 80,
    targetBpm: 120,
    pattern: JSON.stringify([
      { beat: 1, subdivision: 1, hand: "R", isAccent: true },
      { beat: 1, subdivision: 2, hand: "L", isAccent: false },
      { beat: 1, subdivision: 3, hand: "R", isAccent: false },
      { beat: 1, subdivision: 4, hand: "L", isAccent: false },
      { beat: 2, subdivision: 1, hand: "R", isAccent: false },
      { beat: 2, subdivision: 2, hand: "L", isAccent: false },
      { beat: 2, subdivision: 3, hand: "R", isAccent: false },
      { beat: 2, subdivision: 4, hand: "L", isAccent: false },
      { beat: 3, subdivision: 1, hand: "R", isAccent: false },
      { beat: 3, subdivision: 2, hand: "L", isAccent: false },
      { beat: 3, subdivision: 3, hand: "R", isAccent: false },
      { beat: 3, subdivision: 4, hand: "L", isAccent: false },
      { beat: 4, subdivision: 1, hand: "R", isAccent: false },
      { beat: 4, subdivision: 2, hand: "L", isAccent: false },
      { beat: 4, subdivision: 3, hand: "R", isAccent: false },
      { beat: 4, subdivision: 4, hand: "L", isAccent: false },
    ]),
    order: 3,
  },
];

const doubleStrokePatterns = [
  {
    title: "Double Stroke em Semínimas",
    description: "Pratique o double stroke em semínimas",
    difficulty: "INICIANTE" as const,
    timeSignature: "[4,4]",
    minBpm: 60,
    targetBpm: 80,
    pattern: JSON.stringify([
      { beat: 1, subdivision: 1, hand: "R", isAccent: true },
      { beat: 1, subdivision: 1.5, hand: "R", isAccent: false },
      { beat: 2, subdivision: 1, hand: "L", isAccent: false },
      { beat: 2, subdivision: 1.5, hand: "L", isAccent: false },
      { beat: 3, subdivision: 1, hand: "R", isAccent: false },
      { beat: 3, subdivision: 1.5, hand: "R", isAccent: false },
      { beat: 4, subdivision: 1, hand: "L", isAccent: false },
      { beat: 4, subdivision: 1.5, hand: "L", isAccent: false },
    ]),
    order: 1,
  },
  {
    title: "Double Stroke em Colcheias",
    description: "Pratique o double stroke em colcheias",
    difficulty: "INTERMEDIARIO" as const,
    timeSignature: "[4,4]",
    minBpm: 80,
    targetBpm: 120,
    pattern: JSON.stringify([
      { beat: 1, subdivision: 1, hand: "R", isAccent: true },
      { beat: 1, subdivision: 1.5, hand: "R", isAccent: false },
      { beat: 1, subdivision: 2, hand: "L", isAccent: false },
      { beat: 1, subdivision: 2.5, hand: "L", isAccent: false },
      { beat: 2, subdivision: 1, hand: "R", isAccent: false },
      { beat: 2, subdivision: 1.5, hand: "R", isAccent: false },
      { beat: 2, subdivision: 2, hand: "L", isAccent: false },
      { beat: 2, subdivision: 2.5, hand: "L", isAccent: false },
      { beat: 3, subdivision: 1, hand: "R", isAccent: false },
      { beat: 3, subdivision: 1.5, hand: "R", isAccent: false },
      { beat: 3, subdivision: 2, hand: "L", isAccent: false },
      { beat: 3, subdivision: 2.5, hand: "L", isAccent: false },
      { beat: 4, subdivision: 1, hand: "R", isAccent: false },
      { beat: 4, subdivision: 1.5, hand: "R", isAccent: false },
      { beat: 4, subdivision: 2, hand: "L", isAccent: false },
      { beat: 4, subdivision: 2.5, hand: "L", isAccent: false },
    ]),
    order: 2,
  },
];

const paradiddlePatterns = [
  {
    title: "Paradiddle Básico",
    description: "Pratique o paradiddle básico: RLRR LRLL",
    difficulty: "INICIANTE" as const,
    timeSignature: "[4,4]",
    minBpm: 60,
    targetBpm: 100,
    pattern: JSON.stringify([
      { beat: 1, subdivision: 1, hand: "R", isAccent: true },
      { beat: 1, subdivision: 2, hand: "L", isAccent: false },
      { beat: 2, subdivision: 1, hand: "R", isAccent: false },
      { beat: 2, subdivision: 2, hand: "R", isAccent: false },
      { beat: 3, subdivision: 1, hand: "L", isAccent: false },
      { beat: 3, subdivision: 2, hand: "R", isAccent: false },
      { beat: 4, subdivision: 1, hand: "L", isAccent: false },
      { beat: 4, subdivision: 2, hand: "L", isAccent: false },
    ]),
    order: 1,
  },
  {
    title: "Paradiddle em Semicolcheias",
    description: "Pratique o paradiddle em semicolcheias",
    difficulty: "INTERMEDIARIO" as const,
    timeSignature: "[4,4]",
    minBpm: 80,
    targetBpm: 120,
    pattern: JSON.stringify([
      { beat: 1, subdivision: 1, hand: "R", isAccent: true },
      { beat: 1, subdivision: 2, hand: "L", isAccent: false },
      { beat: 1, subdivision: 3, hand: "R", isAccent: false },
      { beat: 1, subdivision: 4, hand: "R", isAccent: false },
      { beat: 2, subdivision: 1, hand: "L", isAccent: false },
      { beat: 2, subdivision: 2, hand: "R", isAccent: false },
      { beat: 2, subdivision: 3, hand: "L", isAccent: false },
      { beat: 2, subdivision: 4, hand: "L", isAccent: false },
      { beat: 3, subdivision: 1, hand: "R", isAccent: false },
      { beat: 3, subdivision: 2, hand: "L", isAccent: false },
      { beat: 3, subdivision: 3, hand: "R", isAccent: false },
      { beat: 3, subdivision: 4, hand: "R", isAccent: false },
      { beat: 4, subdivision: 1, hand: "L", isAccent: false },
      { beat: 4, subdivision: 2, hand: "R", isAccent: false },
      { beat: 4, subdivision: 3, hand: "L", isAccent: false },
      { beat: 4, subdivision: 4, hand: "L", isAccent: false },
    ]),
    order: 2,
  },
  {
    title: "Paradiddle Invertido",
    description: "Pratique o paradiddle invertido: LRLL RLRR",
    difficulty: "AVANCADO" as const,
    timeSignature: "[4,4]",
    minBpm: 100,
    targetBpm: 140,
    pattern: JSON.stringify([
      { beat: 1, subdivision: 1, hand: "L", isAccent: true },
      { beat: 1, subdivision: 2, hand: "R", isAccent: false },
      { beat: 2, subdivision: 1, hand: "L", isAccent: false },
      { beat: 2, subdivision: 2, hand: "L", isAccent: false },
      { beat: 3, subdivision: 1, hand: "R", isAccent: false },
      { beat: 3, subdivision: 2, hand: "L", isAccent: false },
      { beat: 4, subdivision: 1, hand: "R", isAccent: false },
      { beat: 4, subdivision: 2, hand: "R", isAccent: false },
    ]),
    order: 3,
  },
];

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // Create course
  const course = await prisma.course.upsert({
    where: { id: "rudiments-course" },
    update: {},
    create: {
      id: "rudiments-course",
      title: "Os 40 Rudimentos Essenciais",
      description:
        "Curso completo para dominar os rudimentos fundamentais da bateria e percussão",
      order: 1,
    },
  });

  console.log("✅ Curso criado:", course.title);

  // Create modules
  const singleStrokeModule = await prisma.module.upsert({
    where: { id: "single-strokes" },
    update: {},
    create: {
      id: "single-strokes",
      courseId: course.id,
      title: "Single Strokes",
      description:
        "Fundamentos do single stroke - a base de todos os rudimentos",
      order: 1,
      difficulty: "INICIANTE",
    },
  });

  const doubleStrokeModule = await prisma.module.upsert({
    where: { id: "double-strokes" },
    update: {},
    create: {
      id: "double-strokes",
      courseId: course.id,
      title: "Double Strokes",
      description: "Desenvolva controle e precisão com double strokes",
      order: 2,
      difficulty: "INTERMEDIARIO",
    },
  });

  const paradiddleModule = await prisma.module.upsert({
    where: { id: "paradiddles" },
    update: {},
    create: {
      id: "paradiddles",
      courseId: course.id,
      title: "Paradiddles",
      description: "Combine single e double strokes com paradiddles",
      order: 3,
      difficulty: "INTERMEDIARIO",
    },
  });

  console.log("✅ Módulos criados");

  // Create lessons for Single Strokes
  for (const lessonData of singleStrokePatterns) {
    await prisma.lesson.upsert({
      where: { id: `single-${lessonData.order}` },
      update: {},
      create: {
        id: `single-${lessonData.order}`,
        moduleId: singleStrokeModule.id,
        ...lessonData,
      },
    });
  }

  // Create lessons for Double Strokes
  for (const lessonData of doubleStrokePatterns) {
    await prisma.lesson.upsert({
      where: { id: `double-${lessonData.order}` },
      update: {},
      create: {
        id: `double-${lessonData.order}`,
        moduleId: doubleStrokeModule.id,
        ...lessonData,
      },
    });
  }

  // Create lessons for Paradiddles
  for (const lessonData of paradiddlePatterns) {
    await prisma.lesson.upsert({
      where: { id: `paradiddle-${lessonData.order}` },
      update: {},
      create: {
        id: `paradiddle-${lessonData.order}`,
        moduleId: paradiddleModule.id,
        ...lessonData,
      },
    });
  }

  console.log("✅ Lições criadas");
  console.log("🎉 Seed concluído com sucesso!");
}

main()
  .catch(e => {
    console.error("❌ Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
