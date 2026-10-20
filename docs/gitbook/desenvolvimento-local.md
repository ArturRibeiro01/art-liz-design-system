# Desenvolvimento local

Este guia é para contribuir no monorepo. Para consumir os pacotes publicados, consulte [Instalação e requisitos](instalacao.md).

## Instalação limpa

Use Node.js 24 e npm `11.6.2`, como nos workflows. Depois de clonar o repositório, execute na raiz:

```sh
npm ci
```

O lockfile do repositório é a referência da instalação limpa. Use `npm install` quando alterar dependências intencionalmente. O script `prepare` instala Husky no clone com Git.

## Workspaces, dist e cache

O npm vincula os workspaces locais, mas os exports dos pacotes apontam para os arquivos compilados em `dist`. Antes de iniciar um consumidor:

```sh
npm run build --workspace @art-liz/tokens
npm run build --workspace @art-liz/react
npm run dev --workspace @art-liz/playground
```

O comando `npm run storybook` já prepara tokens e React antes de iniciar o catálogo. Depois de alterar um pacote, recompile-o para atualizar quem importa seu `dist`.

Se o Vite mantiver uma resolução antiga depois da instalação/build, encerre o servidor e reinicie:

```sh
npm run dev --workspace @art-liz/playground -- --force
```

Isso renova a otimização de dependências. Se um build limpo também falhar, investigue manifests, exports, nomes dos pacotes e artefatos antes de atribuir o problema ao cache.

## Verificações na raiz

| Comando                  | O que verifica                                                          |
| ------------------------ | ----------------------------------------------------------------------- |
| `npm test`               | Build de tokens e testes React, CLI e automação de release.             |
| `npm run test:storybook` | Build dos pacotes e stories em Chromium via Vitest/Playwright.          |
| `npm run lint`           | ESLint nos workspaces/scripts e sintaxe shell.                          |
| `npm run format:check`   | Formatação, sem modificar arquivos.                                     |
| `npm run format`         | Aplica a formatação.                                                    |
| `npm run build`          | Compila tokens, React e playground.                                     |
| `npm run check:commit`   | Testes, stories, lint, formatação e build; usado no pre-commit.         |
| `npm run release:verify` | Verifica tarballs e um consumidor gerado; requer os pacotes compilados. |
| `npm run ci`             | Gate completo, incluindo artefatos npm e os dois builds do Storybook.   |

Antes da primeira execução dos testes de stories:

```sh
npx playwright install chromium
```

Os hooks locais usam o diretório de trabalho atual, inclusive mudanças ainda não staged. Os checks da PR continuam sendo a validação definitiva. Atualize o MDX e os guias afetados na mesma PR, conforme [Atualizar a documentação](contribuicao.md).
