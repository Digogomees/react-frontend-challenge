# CineDash — Arquitetura

## 1. Visão geral

O CineDash é uma aplicação React + TypeScript para descoberta e curadoria de filmes utilizando a API do TMDB.

A arquitetura foi organizada com base no **Feature-Sliced Design (FSD)**, adaptado ao tamanho do projeto, buscando separar responsabilidades e manter as funcionalidades coesas.

---

## 2. Estrutura de pastas

A estrutura principal é:

```text
src/
├── app/
│   ├── providers/
│   └── routes/
│
├── pages/
│   ├── login/
│   ├── discover/
│   ├── movie-detail/
│   └── watchlist/
│
├── features/
│   ├── auth/
│   ├── movie-discovery/
│   ├── movie-detail/
│   ├── watchlist/
│   └── theme/
│
├── entities/
│   ├── movie/
│   └── user/
│
├── shared/
│   ├── api/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   └── ui/
│
├── styles/
└── test/
```

### Responsabilidades

- **`app/`** — inicialização da aplicação, providers e configuração das rotas.
- **`pages/`** — composição das páginas e orquestração das funcionalidades.
- **`features/`** — funcionalidades específicas da aplicação, como autenticação, descoberta de filmes, watchlist e tema.
- **`entities/`** — entidades do domínio, como filmes e usuários, incluindo tipos, queries e componentes relacionados.
- **`shared/`** — recursos reutilizáveis e independentes de uma funcionalidade específica.

### Por que FSD?

A escolha foi feita para manter o código organizado por **domínio e responsabilidade**, evitando que componentes, hooks, stores e serviços de uma mesma funcionalidade fiquem espalhados em diferentes diretórios.

Por exemplo, tudo relacionado à autenticação fica dentro de:

```text
features/auth/
```

enquanto os elementos relacionados ao domínio de filmes ficam em:

```text
entities/movie/
```

Para o tamanho atual do projeto, foi utilizada uma versão simplificada do FSD, evitando criar camadas desnecessárias.

---

## 3. Autenticação sem backend

Como o desafio não possui backend, a autenticação foi simulada no frontend.

O fluxo funciona da seguinte forma:

1. O usuário informa email e senha.
2. O formulário valida os dados utilizando React Hook Form + Zod.
3. O `authStore` realiza o login simulado.
4. Um token JWT fake é gerado para representar uma sessão autenticada.
5. Usuário, token e estado de autenticação são persistidos no `localStorage` utilizando Zustand Persist.
6. O TanStack Router utiliza `beforeLoad` para proteger as rotas autenticadas.

A estrutura simplificada é:

```text
LoginForm
    ↓
authStore
    ↓
login simulado
    ↓
token + user
    ↓
localStorage
    ↓
route guard
```

O logout remove a sessão e limpa os dados persistidos.

### Limitação

Essa autenticação existe apenas para demonstrar o fluxo de uma aplicação autenticada. O token utilizado não possui valor como credencial real e não substitui uma autenticação implementada em backend.

Em uma aplicação de produção, a autenticação seria responsabilidade de um backend ou provedor de identidade, utilizando mecanismos reais de sessão ou tokens.

---

## 4. Testes

Os testes priorizam os principais comportamentos da aplicação, especialmente funcionalidades relacionadas a estado e autenticação.

A cobertura poderia ser ampliada para contemplar mais cenários de erro, loading e casos de borda.

Devido ao tempo disponível para execução do desafio, alguns cenários adicionais de cobertura ficaram pendentes.

Como evolução, eu ampliaria os testes principalmente nos fluxos de:

consumo da API;
estados de loading;
estados de erro;
watchlist;
componentes de maior interação.

---

## 5. Considerações Finais

A arquitetura foi pensada considerando o tamanho e o objetivo do desafio.

O uso de FSD proporciona uma separação clara entre:

Configuração
↓
Páginas
↓
Funcionalidades
↓
Entidades
↓
Recursos compartilhados

A estrutura atual permite que a aplicação seja evoluída posteriormente sem que seja necessário concentrar novas responsabilidades nas páginas ou nos componentes compartilhados.

Entre as principais evoluções possíveis estão:

integração com backend;
autenticação real;
cadastro e recuperação de senha;
ampliação da cobertura de testes;
tratamento mais completo de estados de erro;
evolução das funcionalidades relacionadas à watchlist;
evolução de componentes de UI.
novos recursos de descoberta e interação com filmes.
criação de um fórum para usuários comentarem sobre o filme, como era no minhaseries.com.

## 6. Resumo das decisões

| Decisão         | Motivo                                     |
| --------------- | ------------------------------------------ |
| FSD adaptado    | Organização por domínio e responsabilidade |
| Zustand         | Estado local e sessão                      |
| TanStack Query  | Estado remoto da API do TMDB               |
| LocalStorage    | Persistência da sessão sem backend         |
| JWT fake        | Simular o fluxo de autenticação            |
| TanStack Router | Proteção e tipagem das rotas               |
