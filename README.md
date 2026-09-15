# CineDash 🎬

Dashboard de curadoria e descoberta de filmes desenvolvido em **React + TypeScript** como resposta ao desafio técnico frontend.

A aplicação utiliza a API do **TMDB** para descoberta e consulta de filmes.

## ✨ Funcionalidades

- 🔐 Autenticação simulada
- 🎬 Descoberta de filmes
- 🔎 Busca e filtros
- 📄 Paginação/carregamento de resultados
- 🎥 Detalhes do filme
- 👥 Elenco
- ▶️ Trailer
- ❤️ Watchlist persistente
- 🌙 Tema dark/light
- 📱 Interface responsiva

## 🛠️ Tecnologias

- React
- TypeScript
- Vite
- TanStack Query
- TanStack Router
- TanStack Table
- Zustand
- React Hook Form
- Zod
- Tailwind CSS
- Vitest
- React Testing Library
- TMDB API

## 🏗️ Arquitetura

O projeto utiliza uma estrutura baseada em **Feature-Sliced Design (FSD)**, adaptada ao escopo do desafio.

```text
src/
├── app/
├── pages/
├── features/
├── entities/
├── shared/
└── test/
```

Mais detalhes sobre a organização e as decisões técnicas estão disponíveis em:

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)

## 🚀 Como executar

Consulte [`INSTRUCTIONS.md`](./INSTRUCTIONS.md) para as instruções completas de instalação, configuração das variáveis de ambiente e execução do projeto.

Fluxo básico:

```bash
npm install
npm run dev
```

É necessário configurar uma chave da API do TMDB no arquivo `.env`.

## 🧪 Validação

Os principais comandos de validação são:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
```

## 🔑 Autenticação

A autenticação é simulada, pois o desafio não disponibiliza um backend.

Para acessar a aplicação, utilize qualquer email válido e uma senha com pelo menos 7 caracteres.

## 📌 Desafio

**Desafio escolhido:** Dashboard de Curadoria TMDB.

O objetivo foi desenvolver uma aplicação frontend capaz de consumir uma API externa, organizar funcionalidades por domínio, gerenciar estado local e remoto e disponibilizar uma experiência de descoberta e curadoria de filmes.

---

Desenvolvido como parte de um desafio técnico frontend.
