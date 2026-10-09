# @art-liz/create-app

Gera uma aplicação monolítica React + TypeScript + Vite pronta para consumir os pacotes do Art-Liz Design System.

```sh
npm create @art-liz/app@latest minha-aplicacao
```

O comando cria a aplicação, inicializa um repositório Git e instala as dependências. Para usar a tag beta do design system ou pular etapas:

```sh
npm create @art-liz/app@latest -- minha-aplicacao --tag beta
npm create @art-liz/app@latest -- minha-aplicacao --no-git --no-install
```

O template inclui React Router, Zustand, TanStack Query, Vitest, Testing Library, ESLint, Prettier, Husky e lint-staged. Storybook não é instalado por padrão. Projetos já criados não se atualizam automaticamente; atualize-os com npm quando desejar receber versões novas do DS.

Para validar o CLI antes da publicação, rode `npm test --workspace @art-liz/create-app`. O CI também executa `npm run release:verify`, que instala os tarballs locais de tokens/React em consumidor limpo, testa a API JS/TypeScript e gera/builda um app usando o próprio tarball do CLI.
