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

- `src/pages`: páginas e rotas do React Router; a tela inicial demonstra componentes do design system.
- `src/pages/HomePage.style.ts`: apresentação e layout responsivo da tela inicial.
- `src/store`: estado de cliente com Zustand.
- `src/App.tsx`: roteamento e provider do TanStack Query.
- `src/App.test.tsx`: exemplo de teste com Vitest e Testing Library.

## Design System

O template instala `@art-liz/react` e `@art-liz/tokens` usando a tag escolhida pelo CLI. Versões estáveis do CLI usam `latest` por padrão; versões pré-release usam `beta`. Para sobrescrever explicitamente a tag, use `npm create @art-liz/app@latest -- meu-projeto --tag beta` ou `npm create @art-liz/app@beta -- meu-projeto --tag latest`.

Projetos existentes não atualizam suas dependências automaticamente. Atualize o Design System quando estiver pronto para receber uma nova versão:

```sh
npm update @art-liz/react @art-liz/tokens
```

O projeto inclui Zustand para estado local e TanStack Query para estado de servidor. Storybook não é instalado por padrão; adicione-o se o produto precisar de um catálogo próprio.

## Explore a tela inicial

- Crie um projeto de demonstração no diálogo; o nome aparece no cartão de boas-vindas.
- Use as abas para testar o contador compartilhado, as preferências de formulário e os marcadores removíveis.
- Consulte as mensagens, etapas, popover e tooltip como exemplos de composição.

Os dados desses exemplos são locais e não são enviados a um servidor. O contador usa Zustand; o projeto e o feedback usam estado React da página. Navegar para outra rota pode descartar os estados locais da página. Os componentes já estão disponíveis no pacote completo:

```tsx
import { Alert, Dialog, Input, Tabs } from '@art-liz/react'
```

Não é necessário instalar cada componente. Ícones vêm do catálogo Icons de @art-liz/react, e a apresentação pode ser adaptada pelos tokens e pelo arquivo de estilos da página. Dialog e Popover usam APIs nativas do navegador.
