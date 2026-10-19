# @art-liz/create-app

Gera uma aplicação monolítica React + TypeScript + Vite pronta para consumir os pacotes do Art-Liz Design System.

```sh
npm create @art-liz/app@latest minha-aplicacao
npm create @art-liz/app@beta minha-aplicacao-beta
```

O comando cria a aplicação, inicializa um repositório Git e instala as dependências. Versões estáveis do CLI usam `@art-liz/react` e `@art-liz/tokens` na tag `latest` por padrão; versões pré-release usam `beta`. Para sobrescrever a tag do design system ou pular etapas:

```sh
npm create @art-liz/app@latest -- minha-aplicacao --tag beta
npm create @art-liz/app@beta -- minha-aplicacao --tag latest
npm create @art-liz/app@latest -- minha-aplicacao --no-git --no-install
```

O template inclui React Router, Zustand, TanStack Query, Vitest, Testing Library, ESLint, Prettier, Husky e lint-staged. Storybook não é instalado por padrão. Projetos já criados não se atualizam automaticamente; atualize-os com npm quando desejar receber versões novas do DS.

Para validar o CLI antes da publicação, rode `npm test --workspace @art-liz/create-app`. O CI também executa `npm run release:verify`, que instala os tarballs locais de tokens/React em consumidor limpo, testa a API JS/TypeScript e gera/builda um app usando o próprio tarball do CLI.

## Componentes e tela inicial

O template instala a biblioteca completa `@art-liz/react`: os componentes novos ficam disponíveis por importação, sem cópia ou registro individual. A tela inicial demonstra abas, formulários, seleção, mensagens, marcadores, etapas e um diálogo de criação local, além do contador com Zustand e da navegação com React Router. Os estilos ficam em `src/pages/HomePage.style.ts` para facilitar a personalização.

O diálogo e as preferências são exemplos locais, sem criação de recursos em servidor. Ícones usam o catálogo Icons exportado por @art-liz/react. As APIs nativas de Dialog e Popover exigem navegadores com suporte a `showModal` e `showPopover`.

A nova versão do CLI deve ser distribuída junto da versão do React que contém esses exports. Enquanto a mudança não for publicada na tag escolhida, a instalação a partir do npm ainda usará a versão publicada anteriormente. `release:verify` valida a combinação nova por tarballs locais, sem publicar.

## Validação antes do commit

Os projetos gerados executam lint-staged seguido de npm run check:commit no pre-commit. O comando roda testes, lint, verificação de formatação e build, interrompendo o commit na primeira falha. O script prepare instala o Husky durante npm install, quando o projeto já possui Git. Storybook não faz parte desse gate do template.
