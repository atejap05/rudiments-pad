# Rudiment Pad - Design System v1.0

## 1. Filosofia

O Design System do Rudiment Pad foi criado com três princípios em mente:

1.  **Clareza e Foco:** A interface deve ser limpa, priorizando o conteúdo de aprendizado. As cores e o layout servem para guiar o usuário sem causar distração.
2.  **Escalabilidade Consistente:** O sistema é projetado para escalar de forma coesa desde dispositivos móveis pequenos até interfaces de Smart TV ("10-foot UI"), garantindo uma experiência de usuário previsível em todas as plataformas.
3.  **Modernidade e Acessibilidade:** Utilizamos uma estética moderna, com temas claro e escuro, e nos preocupamos com o contraste e a legibilidade para garantir que a plataforma seja acessível a todos.

## 2. Paleta de Cores

A paleta é definida em `src/app/globals.css` usando variáveis CSS e HSL para fácil customização e consistência. O sistema é construído com o **Dark Theme como padrão**.

### Cores de Base

| Variável             | Dark Theme (`#020817`) | Light Theme (`#ffffff`) |
| -------------------- | ---------------------- | ----------------------- |
| `--background`       | `222 84% 5%`           | `0 0% 100%`             |
| `--foreground`       | `210 40% 98%`          | `222 47% 11%`           |

### Cores de Interface (Cards, Popovers, Bordas)

| Variável             | Descrição                                   |
| -------------------- | ------------------------------------------- |
| `--card`             | Fundo de componentes `Card`.                |
| `--popover`          | Fundo de `Popovers` e `Dropdowns`.          |
| `--border`           | Cor de bordas em geral.                     |
| `--input`            | Cor de fundo de campos de `Input`.          |

### Cores de Ação (Botões, Links)

| Variável             | Descrição                                   |
| -------------------- | ------------------------------------------- |
| `--primary`          | Ação principal (botões primários).          |
| `--secondary`        | Ação secundária (botões secundários).       |
| `--accent`           | Destaque para elementos focados ou ativos.  |

### Cores Semânticas

Utilizadas para feedback ao usuário (erros, sucesso, alertas).

| Variável             | Cor Padrão | Uso                                         |
| -------------------- | ---------- | ------------------------------------------- |
| `--destructive`      | Vermelho   | Ações destrutivas, mensagens de erro.       |
| `--success`          | Verde      | Confirmações, feedback de sucesso.          |
| `--warning`          | Amarelo    | Alertas, avisos que não são críticos.       |

## 3. Tipografia

Utilizamos a família de fontes **Geist** para uma aparência moderna e legível.

- **`Geist Sans`**: Usada para toda a interface (títulos, parágrafos, labels). Variável: `--font-geist-sans`.
- **`Geist Mono`**: Usada para trechos de código ou dados monoespaçados. Variável: `--font-geist-mono`.

## 4. Sombras (Shadows)

As sombras são usadas para criar profundidade e hierarquia entre os elementos da interface.

| Variável        | Uso Recomendado                                     |
| --------------- | --------------------------------------------------- |
| `--shadow-sm`   | Elementos pequenos e sutis.                         |
| `--shadow-md`   | Padrão para componentes como `Card`.                |
| `--shadow-lg`   | Para elementos elevados como `Dialogs` e `Popovers`.|

## 5. Raios (Radius)

A consistência do arredondamento dos cantos é controlada por uma única variável, aplicada a botões, cards, inputs, etc.

- **`--radius`**: `0.75rem` (12px)

## 6. Gradientes

Gradientes podem ser usados para criar áreas de destaque visual, como em seções "Hero".

- **`--gradient-primary`**: Um gradiente linear que transita entre as cores `--primary` e `--accent`.

## 7. Implementação

Este Design System é implementado através de:

- **`src/app/globals.css`**: Arquivo central com todas as variáveis CSS.
- **`tailwind.config.ts`**: Configuração do TailwindCSS para usar as variáveis.
- **`shadcn/ui`**: Biblioteca de componentes que consome nativamente essas variáveis.

Ao criar novos componentes, utilize as classes do Tailwind e as variáveis CSS definidas para manter a consistência visual em toda a aplicação.
