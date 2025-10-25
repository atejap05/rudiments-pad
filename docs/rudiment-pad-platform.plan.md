<!-- dfe919fa-fa16-4de2-b5ee-d1606fd2b4d5 821ce685-e138-495b-9146-1ebe9173f980 -->
# Plano de Desenvolvimento: Plataforma Rudiment Pad

## Visão Geral

Plataforma web LMS para estudo de rudimentos de bateria com motor de áudio de alta precisão, feedback em tempo real, e UI responsiva (Mobile First → Smart TV).

## Stack Tecnológica

- **Frontend/Backend**: Next.js 15.5.6 (App Router, Full Stack)
- **React**: React 19 (com suporte a Server Components e Actions)
- **Linguagem**: TypeScript 5+
- **Banco de Dados**: SQLite (dev) com Prisma ORM
- **Autenticação**: NextAuth.js v5 (Auth.js) `5.0.0-beta.29`
- **UI/Styling**: Tailwind CSS v4 + shadcn/ui (tema dark/light)
- **Áudio**: Web Audio API + Tone.js + Meyda.js
- **Visualização**: SVG + VexFlow

## Fase 1: Fundação e Infraestrutura

### 1.1 Setup do Projeto Next.js

- Inicializar projeto Next.js 14+ com TypeScript e App Router
- Configurar Tailwind CSS com breakpoint customizado `tv: 1920px`
- Instalar e configurar shadcn/ui com sistema de temas (dark/light)
- Criar tema dark customizado como padrão
- Estrutura de pastas: `/app`, `/components`, `/lib`, `/prisma`, `/public`

### 1.2 Configuração do Banco de Dados

- Instalar Prisma ORM
- Definir schema Prisma para SQLite (preparado para migração futura):
  - Model `User`: id, name, email, emailVerified, image, createdAt, level (iniciante/intermediário/avançado)
  - Model `Course`: id, title, description, order
  - Model `Module`: id, courseId, title, description, order, difficulty
  - Model `Lesson`: id, moduleId, title, description, difficulty, timeSignature, minBpm, targetBpm, pattern (JSON)
  - Model `UserProgress`: userId, lessonId, completed, bestScore, lastPracticedAt
  - Model `Account`, `Session`, `VerificationToken` (NextAuth)
- Executar migrations iniciais

### 1.3 Autenticação com NextAuth.js

- Configurar NextAuth.js com Prisma Adapter
- Implementar providers: Email (magic link) e Google OAuth
- Criar páginas: `/auth/signin`, `/auth/signup`, `/auth/error`
- Middleware de proteção de rotas
- Session management e tipos TypeScript

## Fase 2: Arquitetura de Conteúdo (LMS Core)

### 2.1 Estrutura de Dados

Implementar interfaces TypeScript baseadas no relatório técnico:

```typescript
// lib/types/lesson.ts
interface RhythmEvent {
  beat: number;
  subdivision: number;
  hand: 'R' | 'L';
  isAccent: boolean;
}

interface Lesson {
  id: string;
  title: string;
  moduleId: string;
  description: string;
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
  timeSignature: [number, number];
  pattern: RhythmEvent[];
  minBpm: number;
  targetBpm: number;
}
```

### 2.2 Seed de Conteúdo Inicial

Criar seed script com conteúdo de exemplo:

- 1 Curso: "Os 40 Rudimentos Essenciais"
- 3 Módulos: "Single Strokes", "Double Strokes", "Paradiddles"
- 8-10 Lições distribuídas pelos módulos

### 2.3 API Routes

- `GET /api/courses` - Listar cursos
- `GET /api/modules/:courseId` - Módulos de um curso
- `GET /api/lessons/:moduleId` - Lições de um módulo
- `GET /api/lessons/:id` - Detalhes de uma lição
- `POST /api/progress` - Salvar progresso do usuário
- `GET /api/user/progress` - Progresso do usuário

## Fase 3: Motor de Áudio de Precisão

### 3.1 Hook useMetronome

Implementar `lib/hooks/useMetronome.ts` baseado em Web Audio API:

- Usar `AudioContext.currentTime` como fonte de verdade
- Implementar Look-Ahead Scheduling pattern
- Integrar Tone.js para abstração de alto nível
- Retornar: `{ isPlaying, bpm, setBpm, currentBeat, currentTick, timeSignature, start, stop }`

### 3.2 Hook useAudioAnalysis (Fase Futura)

Preparar estrutura para análise de áudio em tempo real:

- Captura com `getUserMedia`
- AudioWorklet para processamento não-bloqueante
- Integração com Meyda.js para detecção de transientes
- Feedback de precisão (adiantado/atrasado/em cima)

## Fase 4: Componentes de UI (Design System)

### 4.1 Componentes Base (shadcn/ui)

Instalar e customizar componentes:

- Button, Card, Dialog, Dropdown, Input, Label
- Slider (para BPM), Switch (tema dark/light)
- Progress, Tabs, Toast (notificações)
- Sheet (mobile drawer), Avatar

### 4.2 Componentes de Layout

- `components/layout/Header.tsx` - Logo, navegação, user menu
- `components/layout/Sidebar.tsx` - Navegação módulos/aulas (desktop)
- `components/layout/MobileNav.tsx` - Bottom sheet navigation
- `components/layout/ThemeToggle.tsx` - Switch dark/light

### 4.3 Componentes de Prática

- `components/practice/PracticePlayer.tsx` - Container principal
- `components/practice/Controls.tsx` - Play/Pause, BPM slider
- `components/practice/LessonHeader.tsx` - Título, descrição, dificuldade
- `components/practice/RudimentVisualizer.tsx` - Timeline visual (R/L)
  - Renderização SVG customizada (não VexFlow inicialmente)
  - Grid de subdivisões com destaque do beat atual
  - Indicadores de mão (R/L) e acentos

### 4.4 Responsividade Mobile First → TV

Aplicar estratégia de breakpoints:

- **Mobile (base)**: Layout coluna única, controles grandes, drawer navigation
- **Tablet (md:)**: Sidebar + conteúdo principal
- **Desktop (lg:/xl:)**: 3 colunas (módulos | aulas | player)
- **TV (tv:)**: Modo kiosk - apenas player fullscreen, fontes gigantes (`text-6xl`), alto contraste

## Fase 5: Jornada do Usuário (Onboarding Completo)

### 5.1 Fluxo de Cadastro

- Página `/auth/signup` com formulário estilizado
- Validação de email e senha
- Opção de login social (Google)
- Redirect para avaliação de nível

### 5.2 Avaliação de Nível

Página `/onboarding/assessment`:

- Questionário interativo: "Quanto tempo você toca bateria?", "Conhece rudimentos básicos?", etc.
- 4-5 perguntas com UI card-based
- Determinar nível: iniciante/intermediário/avançado
- Salvar no perfil do usuário

### 5.3 Tour Guiado Interativo

Implementar tour com biblioteca `react-joyride` ou similar:

- Destacar elementos principais da UI
- Explicar navegação entre módulos/aulas
- Demonstrar controles do player (play, BPM)
- Explicar sistema de progresso
- 5-7 steps com tooltips posicionados

### 5.4 Recomendação Personalizada

Página `/onboarding/recommendations`:

- Baseado no nível avaliado, sugerir módulos iniciais
- Card visual para cada módulo recomendado
- Botão "Começar Primeira Aula"
- Redirect para `/practice/[lessonId]`

### 5.5 Página de Dashboard

`/dashboard`:

- Progresso geral (% de aulas completadas)
- Últimas aulas praticadas
- Módulos recomendados
- Estatísticas (tempo total de prática, streak)

## Fase 6: Páginas Principais

### 6.1 Landing Page (`/`)

- Hero section com CTA "Começar Agora"
- Seção de features (metrônomo preciso, feedback visual, mobile-first)
- Preview da interface
- Footer com links

### 6.2 Página de Cursos (`/courses`)

- Lista de cursos disponíveis (inicialmente 1)
- Card com imagem, título, descrição
- Indicador de progresso se autenticado

### 6.3 Página de Módulos (`/courses/[courseId]`)

- Lista de módulos do curso
- Accordion ou grid de cards
- Progresso por módulo

### 6.4 Página de Lições (`/modules/[moduleId]`)

- Lista de lições do módulo
- Card com título, dificuldade, BPM alvo
- Status: não iniciada/em progresso/completa
- Botão "Praticar"

### 6.5 Página de Prática (`/practice/[lessonId]`)

- Componente `PracticePlayer` fullscreen
- Carregamento da lição via API
- Integração com `useMetronome`
- Botão "Concluir Aula" (salva progresso)

### 6.6 Página de Perfil (`/profile`)

- Informações do usuário
- Estatísticas de progresso
- Configurações (tema, preferências)
- Opção de logout

## Fase 7: Polimento e Otimizações

### 7.1 Performance

- Lazy loading de componentes pesados
- Otimização de imagens (Next.js Image)
- Memoização de componentes React (`memo`, `useMemo`)
- Code splitting por rota

### 7.2 Acessibilidade

- ARIA labels em todos os controles
- Navegação por teclado (importante para TV)
- Foco visível customizado
- Contraste WCAG AAA para modo TV

### 7.3 PWA Features

- Manifest.json para instalação
- Service Worker para cache
- Ícones para múltiplas plataformas
- Wake Lock API para sessões de prática

### 7.4 Testes Básicos

- Testes de integração para fluxo de autenticação
- Testes de componentes críticos (PracticePlayer)
- Validação de schema Prisma

## Arquivos de Configuração Principais

### tailwind.config.ts

```typescript
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
  'tv': '1920px',
}
```

### prisma/schema.prisma

Modelos completos para User, Course, Module, Lesson, UserProgress + NextAuth

### next.config.js

Otimizações para áudio e SVG

## Entregáveis por Fase

**Fase 1-2**: Projeto configurado, autenticação funcionando, estrutura de dados definida

**Fase 3**: Motor de áudio operacional com metrônomo preciso

**Fase 4**: UI completa e responsiva (mobile → TV)

**Fase 5**: Onboarding completo implementado

**Fase 6**: Todas as páginas principais funcionais

**Fase 7**: Aplicação polida e otimizada

## Próximos Passos Após MVP

- Implementar análise de áudio em tempo real (useAudioAnalysis)
- Sistema de gamificação (pontos, badges, streaks)
- Modo de prática livre (metrônomo sem aula)
- Exportar/importar progresso
- Criador de lições customizadas
- Integração com VexFlow para notação musical tradicional

### To-dos

- [ ] Inicializar projeto Next.js com TypeScript, Tailwind CSS e shadcn/ui
- [ ] Configurar Prisma ORM com SQLite e definir schema completo
- [ ] Implementar NextAuth.js com providers Email e Google
- [ ] Criar seed script com cursos, módulos e lições iniciais
- [ ] Implementar API routes para cursos, módulos, lições e progresso
- [ ] Desenvolver hook useMetronome com Web Audio API e Tone.js
- [ ] Criar componentes base do design system com shadcn/ui e tema dark/light
- [ ] Implementar componentes de prática (Player, Controls, Visualizer)
- [ ] Desenvolver fluxo completo de onboarding (avaliação, tour, recomendações)
- [ ] Criar todas as páginas principais (landing, dashboard, courses, practice)
- [ ] Implementar estratégia Mobile First → TV com breakpoints customizados
- [ ] Otimizações de performance, acessibilidade e PWA features