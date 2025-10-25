# TODO - Próximos Passos - Rudiment Pad

## Status Atual ✅

- [x] **Fase 1-2**: Projeto configurado, autenticação funcionando, estrutura de dados definida
- [x] **Fase 3**: Motor de áudio operacional com metrônomo preciso
- [x] **Fase 4**: UI completa e responsiva (mobile → TV) - **PARCIALMENTE**

## Próximos Passos - Fase 4 (Continuação)

### 4.2 Componentes de Layout (PENDENTE)

- [ ] **Sidebar.tsx** - Navegação módulos/aulas (desktop)
- [ ] **MobileNav.tsx** - Bottom sheet navigation para mobile
- [ ] **Layout responsivo** - Implementar breakpoints Mobile First → TV

### 4.3 Componentes de Prática (PRIORIDADE ALTA)

- [ ] **PracticePlayer.tsx** - Container principal do player
- [ ] **Controls.tsx** - Play/Pause, BPM slider, controles de tempo
- [ ] **LessonHeader.tsx** - Título, descrição, dificuldade da lição
- [ ] **RudimentVisualizer.tsx** - Timeline visual (R/L) com SVG
  - [ ] Grid de subdivisões com destaque do beat atual
  - [ ] Indicadores de mão (R/L) e acentos
  - [ ] Sincronização com metrônomo em tempo real

### 4.4 Responsividade Mobile First → TV (PENDENTE)

- [ ] **Mobile (base)**: Layout coluna única, controles grandes, drawer navigation
- [ ] **Tablet (md:)**: Sidebar + conteúdo principal
- [ ] **Desktop (lg:/xl:)**: 3 colunas (módulos | aulas | player)
- [ ] **TV (tv:)**: Modo kiosk - apenas player fullscreen, fontes gigantes (`text-6xl`), alto contraste

## Fase 5: Jornada do Usuário (Onboarding Completo)

### 5.1 Fluxo de Cadastro (PENDENTE)

- [ ] Página `/auth/signup` com formulário estilizado
- [ ] Validação de email e senha
- [ ] Redirect para avaliação de nível

### 5.2 Avaliação de Nível (PENDENTE)

- [ ] Página `/onboarding/assessment`
- [ ] Questionário interativo (4-5 perguntas)
- [ ] Determinar nível: iniciante/intermediário/avançado
- [ ] Salvar no perfil do usuário

### 5.3 Tour Guiado Interativo (PENDENTE)

- [ ] Instalar biblioteca `react-joyride`
- [ ] Implementar tour com 5-7 steps
- [ ] Destacar elementos principais da UI
- [ ] Explicar navegação e controles

### 5.4 Recomendação Personalizada (PENDENTE)

- [ ] Página `/onboarding/recommendations`
- [ ] Sugestões baseadas no nível avaliado
- [ ] Cards visuais para módulos recomendados
- [ ] Botão "Começar Primeira Aula"

### 5.5 Página de Dashboard (PENDENTE)

- [ ] `/dashboard` com progresso geral
- [ ] Últimas aulas praticadas
- [ ] Módulos recomendados
- [ ] Estatísticas (tempo total, streak)

## Fase 6: Páginas Principais

### 6.1 Landing Page (✅ CONCLUÍDA)

- [x] Hero section com CTA "Começar Agora"
- [x] Seção de features
- [x] Footer com links

### 6.2 Página de Cursos (PENDENTE)

- [ ] `/courses` - Lista de cursos disponíveis
- [ ] Cards com imagem, título, descrição
- [ ] Indicador de progresso se autenticado

### 6.3 Página de Módulos (PENDENTE)

- [ ] `/courses/[courseId]` - Lista de módulos do curso
- [ ] Accordion ou grid de cards
- [ ] Progresso por módulo

### 6.4 Página de Lições (PENDENTE)

- [ ] `/modules/[moduleId]` - Lista de lições do módulo
- [ ] Cards com título, dificuldade, BPM alvo
- [ ] Status: não iniciada/em progresso/completa
- [ ] Botão "Praticar"

### 6.5 Página de Prática (PRIORIDADE ALTA)

- [ ] `/practice/[lessonId]` - Componente PracticePlayer fullscreen
- [ ] Carregamento da lição via API
- [ ] Integração com `useMetronome`
- [ ] Botão "Concluir Aula" (salva progresso)

### 6.6 Página de Perfil (PENDENTE)

- [ ] `/profile` - Informações do usuário
- [ ] Estatísticas de progresso
- [ ] Configurações (tema, preferências)
- [ ] Opção de logout

## Fase 7: Polimento e Otimizações

### 7.1 Performance (PENDENTE)

- [ ] Lazy loading de componentes pesados
- [ ] Otimização de imagens (Next.js Image)
- [ ] Memoização de componentes React (`memo`, `useMemo`)
- [ ] Code splitting por rota

### 7.2 Acessibilidade (PENDENTE)

- [ ] ARIA labels em todos os controles
- [ ] Navegação por teclado (importante para TV)
- [ ] Foco visível customizado
- [ ] Contraste WCAG AAA para modo TV

### 7.3 PWA Features (PENDENTE)

- [ ] Manifest.json para instalação
- [ ] Service Worker para cache
- [ ] Ícones para múltiplas plataformas
- [ ] Wake Lock API para sessões de prática

### 7.4 Testes Básicos (PENDENTE)

- [ ] Testes de integração para fluxo de autenticação
- [ ] Testes de componentes críticos (PracticePlayer)
- [ ] Validação de schema Prisma

## Próximos Passos Após MVP

### Funcionalidades Avançadas

- [ ] **useAudioAnalysis** - Análise de áudio em tempo real
- [ ] Sistema de gamificação (pontos, badges, streaks)
- [ ] Modo de prática livre (metrônomo sem aula)
- [ ] Exportar/importar progresso
- [ ] Criador de lições customizadas
- [ ] Integração com VexFlow para notação musical tradicional

## Prioridades Imediatas

### 🚀 **Sprint 1 (Próxima Semana)**

1. **PracticePlayer.tsx** - Container principal
2. **Controls.tsx** - Controles básicos (play/pause, BPM)
3. **RudimentVisualizer.tsx** - Visualização básica do padrão
4. **Página /practice/[lessonId]** - Integração completa

### 🎯 **Sprint 2 (Semana Seguinte)**

1. **Sidebar.tsx** e **MobileNav.tsx** - Navegação
2. **Responsividade Mobile First → TV**
3. **Páginas de cursos e módulos**
4. **Dashboard básico**

### 📱 **Sprint 3 (Terceira Semana)**

1. **Onboarding completo** (avaliação + tour)
2. **Página de perfil**
3. **Otimizações de performance**
4. **Testes básicos**

## Notas Técnicas

### Dependências Pendentes

- [ ] `react-joyride` - Para tour guiado
- [ ] `meyda` - Para análise de áudio avançada
- [ ] `vexflow` - Para notação musical (futuro)

### Configurações Pendentes

- [ ] Variáveis de ambiente para Google OAuth
- [ ] Configuração de email (SendGrid/Resend)
- [ ] Otimizações no `next.config.js`

### Arquivos de Configuração

- [ ] `tailwind.config.ts` - Breakpoint `tv: 1920px` (já configurado no CSS)
- [ ] `next.config.js` - Otimizações para áudio e SVG

---

**Última atualização**: $(date)
**Status**: Fase 4 em andamento - Componentes de prática em desenvolvimento
