import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🥁 Rudiment Pad
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A plataforma definitiva para estudar rudimentos de bateria e
            percussão. Metrônomo de alta precisão, feedback em tempo real e
            interface responsiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/auth/signup">Começar Agora</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/courses">Ver Cursos</a>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Recursos Principais
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>🎵 Metrônomo de Precisão</CardTitle>
                <CardDescription>
                  Motor de áudio baseado em Web Audio API com precisão de
                  milissegundos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Utiliza Tone.js e AudioContext para garantir timing perfeito,
                  essencial para o desenvolvimento rítmico.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📱 Mobile First</CardTitle>
                <CardDescription>
                  Interface responsiva que escala do celular até Smart TV
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Design otimizado para prática em qualquer dispositivo,
                  incluindo modo "10-foot UI" para telas grandes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Feedback Visual</CardTitle>
                <CardDescription>
                  Análise de áudio em tempo real com feedback de precisão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Detecta sua performance e fornece feedback instantâneo sobre
                  timing e precisão rítmica.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-muted/50 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para melhorar sua técnica?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Comece sua jornada de aprendizado hoje mesmo
          </p>
          <Button size="lg" asChild>
            <a href="/auth/signup">Criar Conta Gratuita</a>
          </Button>
        </section>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            &copy; 2024 Rudiment Pad. Desenvolvido para bateristas e
            percussionistas.
          </p>
        </div>
      </footer>
    </div>
  );
}
