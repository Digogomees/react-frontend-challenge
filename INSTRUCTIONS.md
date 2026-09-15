# CineDash — Instruções de Instalação e Execução

## Sobre o Projeto

**CineDash** é um dashboard de curadoria e descoberta de filmes construído como resposta ao desafio técnico frontend. A aplicação consome a API do [TMDB (The Movie Database)](https://www.themoviedb.org/) e oferece autenticação simulada, busca e filtragem de filmes, watchlist persistente, detalhes com elenco e trailer, e alternância de tema dark/light.

**Desafio escolhido:** Dashboard de Curadoria TMDB (CineDash)

---

## Pré-requisitos

| Ferramenta                     | Versão mínima                                           |
| ------------------------------ | ------------------------------------------------------- |
| [Node.js](https://nodejs.org/) | 18.x ou superior (recomendado: 20.x)                    |
| [npm](https://www.npmjs.com/)  | 9.x ou superior                                         |
| Chave de API do TMDB           | [Obtenha aqui](https://www.themoviedb.org/settings/api) |

---

## 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd react-frontend-challenge
```

---

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (ou copie o `.env.example`):

Preencha as variáveis:

```env
# Token de Acesso da API do TMDB (API Key v3)
# Obtenha em: https://www.themoviedb.org/settings/api
VITE_TMDB_API_KEY=SUA_CHAVE_AQUI

# Base URL da API do TMDB
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

# Base URL para imagens (posters, backdrops, etc.)
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Como obter a chave da API do TMDB

1. Acesse [themoviedb.org](https://www.themoviedb.org/) e crie uma conta gratuita.
2. Vá em **Configurações → API** ([link direto](https://www.themoviedb.org/settings/api)).
3. Solicite uma chave de API (tipo: "Developer").
4. Copie a **API Key (v3 auth)** e cole no campo `VITE_TMDB_API_KEY` do `.env`.

> **Nota:** As variáveis de ambiente são validadas em tempo de execução via Zod (`src/shared/config/env.ts`). Se a chave estiver ausente ou inválida, um aviso será exibido no console.

---

## 4. Executar em modo de desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento Vite será iniciado (geralmente em `http://localhost:5173`).

### Login

A autenticação é **simulada** — não existe backend real. Utilize qualquer email válido e uma senha com mais de 6 caracteres:

| Campo | Exemplo                         |
| ----- | ------------------------------- |
| Email | `curador@cinedash.io`           |
| Senha | `1234567` (mínimo 7 caracteres) |

---

## 5. Executar os testes

### Execução única (CI / validação)

```bash
npm run test
```

### Modo watch (durante o desenvolvimento)

```bash
npm run test:watch
```

Os testes utilizam **Vitest** + **React Testing Library** com ambiente **happy-dom**.

### Testes existentes

| Arquivo                                       | O que testa                                                   |
| --------------------------------------------- | ------------------------------------------------------------- |
| `src/features/auth/model/authStore.test.ts`   | Store de autenticação (login, logout, persistência)           |
| `src/features/auth/ui/LoginForm.test.tsx`     | Formulário de login (validação, submissão, feedback visual)   |
| `src/features/theme/model/themeStore.test.ts` | Store de tema (toggle, persistência, aplicação de classe CSS) |

---

## 6. Verificação de tipos

```bash
npm run typecheck
```

Executa `tsc --noEmit` com TypeScript em modo **strict**.

---

## 7. Lint

```bash
npm run lint
```

Utiliza ESLint com plugins para React Hooks e React Refresh.

---

## 8. Gerar build de produção

```bash
npm run build
```

Os artefatos serão gerados na pasta `dist/`.

### Pré-visualizar o build

```bash
npm run preview
```

---

## 9. Scripts disponíveis

| Comando              | Descrição                                         |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento (Vite HMR)            |
| `npm run build`      | Build de produção (TypeScript check + Vite build) |
| `npm run preview`    | Servir build de produção localmente               |
| `npm run test`       | Executar testes uma vez                           |
| `npm run test:watch` | Executar testes em modo watch                     |
| `npm run typecheck`  | Verificação de tipos (sem emissão)                |
| `npm run lint`       | Análise estática com ESLint                       |

---

## 10. Estrutura de pastas resumida

```
src/
├── app/              # Bootstrap, providers e rotas
├── pages/            # Composição de telas (orquestradores)
├── features/         # Funcionalidades de negócio (auth, watchlist, theme, etc.)
├── entities/         # Domínios da aplicação (movie, user)
├── shared/           # Componentes, hooks, utilitários e configurações reutilizáveis
├── styles/           # Estilos globais (TailwindCSS + CSS variables)
└── test/             # Setup de testes (Vitest + Testing Library)
```

Para detalhes sobre a arquitetura e decisões técnicas, consulte o arquivo [`ARCHITECTURE.md`](./ARCHITECTURE.md).
