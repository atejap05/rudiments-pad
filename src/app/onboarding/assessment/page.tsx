"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

type Question = {
  id: number;
  question: string;
  options: {
    text: string;
    level: "INICIANTE" | "INTERMEDIARIO" | "AVANCADO";
    points: number;
  }[];
};

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é sua experiência com bateria ou percussão?",
    options: [
      {
        text: "Nunca pratiquei antes",
        level: "INICIANTE",
        points: 0,
      },
      {
        text: "Pratiquei algumas vezes, mas não regularmente",
        level: "INICIANTE",
        points: 1,
      },
      {
        text: "Pratico há alguns meses",
        level: "INTERMEDIARIO",
        points: 2,
      },
      {
        text: "Pratico há mais de 1 ano regularmente",
        level: "AVANCADO",
        points: 3,
      },
    ],
  },
  {
    id: 2,
    question: "Você conhece rudimentos de bateria?",
    options: [
      {
        text: "Não sei o que são rudimentos",
        level: "INICIANTE",
        points: 0,
      },
      {
        text: "Já ouvi falar, mas nunca pratiquei",
        level: "INICIANTE",
        points: 1,
      },
      {
        text: "Conheço alguns rudimentos básicos (paradiddle, single stroke)",
        level: "INTERMEDIARIO",
        points: 2,
      },
      {
        text: "Conheço e pratico vários rudimentos regularmente",
        level: "AVANCADO",
        points: 3,
      },
    ],
  },
  {
    id: 3,
    question: "Como você descreveria seu controle de baquetas?",
    options: [
      {
        text: "Ainda estou aprendendo a segurar as baquetas corretamente",
        level: "INICIANTE",
        points: 0,
      },
      {
        text: "Consigo tocar ritmos simples, mas com dificuldade",
        level: "INICIANTE",
        points: 1,
      },
      {
        text: "Tenho controle razoável e consigo manter ritmos constantes",
        level: "INTERMEDIARIO",
        points: 2,
      },
      {
        text: "Tenho bom controle e consigo tocar ritmos complexos",
        level: "AVANCADO",
        points: 3,
      },
    ],
  },
  {
    id: 4,
    question: "Qual é sua familiaridade com metrônomo?",
    options: [
      {
        text: "Nunca usei um metrônomo",
        level: "INICIANTE",
        points: 0,
      },
      {
        text: "Já tentei usar, mas tenho dificuldade em acompanhar",
        level: "INICIANTE",
        points: 1,
      },
      {
        text: "Consigo acompanhar em tempos moderados (80-120 BPM)",
        level: "INTERMEDIARIO",
        points: 2,
      },
      {
        text: "Pratico regularmente com metrônomo em diversos tempos",
        level: "AVANCADO",
        points: 3,
      },
    ],
  },
  {
    id: 5,
    question: "Qual é seu objetivo com a plataforma?",
    options: [
      {
        text: "Aprender do zero e desenvolver fundamentos",
        level: "INICIANTE",
        points: 0,
      },
      {
        text: "Melhorar minha técnica básica",
        level: "INICIANTE",
        points: 1,
      },
      {
        text: "Expandir meu repertório de rudimentos",
        level: "INTERMEDIARIO",
        points: 2,
      },
      {
        text: "Aperfeiçoar rudimentos avançados e aumentar velocidade",
        level: "AVANCADO",
        points: 3,
      },
    ],
  },
];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (finalAnswers: number[]) => {
    setIsSubmitting(true);

    // Calcular nível baseado na pontuação total
    const totalPoints = finalAnswers.reduce((sum, points) => sum + points, 0);
    const maxPoints = questions.length * 3;
    const percentage = (totalPoints / maxPoints) * 100;

    let level: "INICIANTE" | "INTERMEDIARIO" | "AVANCADO";
    if (percentage < 40) {
      level = "INICIANTE";
    } else if (percentage < 70) {
      level = "INTERMEDIARIO";
    } else {
      level = "AVANCADO";
    }

    try {
      // Atualizar nível do usuário
      const response = await fetch("/api/user/level", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level }),
      });

      if (response.ok) {
        // Redirecionar para o dashboard
        router.push("/dashboard");
      } else {
        console.error("Erro ao salvar nível");
        // Mesmo com erro, redirecionar para o dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao submeter avaliação:", error);
      router.push("/dashboard");
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Avaliação de Nível 📊
          </h1>
          <p className="text-muted-foreground">
            Responda algumas perguntas para personalizarmos sua experiência
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <span className="font-semibold">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
            <CardDescription>
              Escolha a opção que melhor descreve você
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6"
                onClick={() => handleAnswer(option.points)}
                disabled={isSubmitting}
              >
                {option.text}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={currentQuestion === 0 || isSubmitting}
          >
            ← Voltar
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            disabled={isSubmitting}
          >
            Pular avaliação
          </Button>
        </div>

        {isSubmitting && (
          <div className="text-center mt-8 text-muted-foreground">
            Salvando seu nível...
          </div>
        )}
      </main>
    </div>
  );
}
