# Aplicação Art-Liz

Aplicação monolítica React + TypeScript + Vite, pronta para consumir o Art-Liz Design System.

## Comandos

```sh
npm run dev
npm run test
npm run test:watch
npm run lint
npm run format:check
npm run typecheck
npm run build
npm run preview
```

## Estrutura

- `src/pages`: páginas e rotas do React Router.
- `src/store`: estado de cliente com Zustand.
- `src/App.tsx`: roteamento e provider do TanStack Query.
- `src/App.test.tsx`: exemplo de teste com Vitest e Testing Library.

## Design System

O template instala `@art-liz/react` e `@art-liz/tokens` usando a tag `latest` por padrão. Para criar um novo projeto com a tag beta, use `npm create @art-liz/app@latest -- meu-projeto --tag beta`.

Projetos existentes não atualizam suas dependências automaticamente. Atualize o Design System quando estiver pronto para receber uma nova versão:

```sh
npm update @art-liz/react @art-liz/tokens
```

O projeto inclui Zustand para estado local e TanStack Query para estado de servidor. Storybook não é instalado por padrão; adicione-o se o produto precisar de um catálogo próprio.
