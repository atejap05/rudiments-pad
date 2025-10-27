import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Buscar dados do usuário
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      progress: {
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
        take: 5,
      },
    },
  });

  if (!user) {
    redirect("/auth/signin");
  }

  // Buscar todos os cursos disponíveis
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  // Calcular estatísticas
  const totalLessons = courses.reduce(
    (acc, course) =>
      acc +
      course.modules.reduce((modAcc, mod) => modAcc + mod.lessons.length, 0),
    0
  );

  const completedLessons = await prisma.userProgress.count({
    where: {
      userId: user.id,
      completed: true,
    },
  });

  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Calcular tempo total praticado (estimativa baseada no número de práticas)
  const totalPractices = await prisma.userProgress.count({
    where: {
      userId: user.id,
      lastPracticedAt: { not: null },
    },
  });

  const estimatedHours = Math.floor(totalPractices * 0.25); // ~15 min por prática

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Olá, {user.name || "Estudante"}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue sua jornada de aprendizado de rudimentos
          </p>
        </section>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progresso Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {completedLessons} de {totalLessons} lições
                  </span>
                  <span className="font-semibold">
                    {progressPercentage.toFixed(0)}%
                  </span>
                </div>
                <Progress value={progressPercentage} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nível Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user.level === "INICIANTE"
                  ? "🌱 Iniciante"
                  : user.level === "INTERMEDIARIO"
                  ? "⭐ Intermediário"
                  : "🔥 Avançado"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tempo de Prática</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {estimatedHours > 0 ? `~${estimatedHours}h` : "Comece agora!"}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Total estimado
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Practice */}
        {user.progress.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Últimas Práticas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.progress.map(prog => (
                <Card key={prog.id}>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {prog.lesson.title}
                    </CardTitle>
                    <CardDescription>
                      {prog.lesson.module.title} •{" "}
                      {prog.lesson.module.course.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {prog.bestScore !== null && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Melhor score:
                          </span>
                          <span className="font-semibold">
                            {prog.bestScore.toFixed(0)}%
                          </span>
                        </div>
                      )}
                      {prog.completed && (
                        <div className="text-sm text-green-600 dark:text-green-400">
                          ✓ Completa
                        </div>
                      )}
                      <Button asChild size="sm" className="w-full">
                        <a href={`/practice/${prog.lessonId}`}>
                          Praticar novamente
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Recommended Courses */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Cursos Disponíveis</h2>
          {courses.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Nenhum curso disponível no momento. Em breve teremos conteúdo!
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map(course => {
                const totalCourseLessons = course.modules.reduce(
                  (acc, mod) => acc + mod.lessons.length,
                  0
                );

                return (
                  <Card key={course.id}>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-muted-foreground">
                          {course.modules.length} módulos • {totalCourseLessons}{" "}
                          lições
                        </div>
                        <Button asChild className="w-full">
                          <a href={`/courses/${course.id}`}>Explorar curso</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
