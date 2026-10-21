# art-liz-design-system

Design system pessoal em React e TypeScript, organizado como monorepo npm. Os pacotes compartilhados podem ser publicados separadamente e UI Kits específicos podem ser adicionados em `packages/` quando surgir um projeto que justifique essa separação.

## Documentação

- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md): arquitetura, decisões técnicas e contexto completo.
- [DEVELOPMENT.md](DEVELOPMENT.md): comandos locais, qualidade de código e fluxo de desenvolvimento.
- [COMPONENTS.md](COMPONENTS.md): uso básico dos componentes, tokens e ícones.
- [FIGMA_INVENTORY.md](FIGMA_INVENTORY.md): referência Figma, inventário, mapeamento para o código e primeira etapa proposta.
- [STORYBOOK.md](STORYBOOK.md): Storybook local, builds estáticos e GitHub Pages.
- [RELEASES.md](RELEASES.md): Changesets, beta/latest e publicação npm.
- [GITBOOK.md](GITBOOK.md): estrutura dos guias, canais e configuração da sincronização com GitBook.
- [templates/gitflow/README.md](templates/gitflow/README.md): bootstrap do GitFlow em outros repositórios.

## Estrutura

- `packages/tokens`: tokens e temas sem dependência de framework.
- `packages/react`: componentes React estilizados com Emotion.
- `packages/create-app`: CLI npm com template React + Vite pronto para o Design System.
- `apps/storybook`: catálogo e documentação dos componentes.
- `apps/playground`: aplicação Vite para testar os pacotes como consumidor.

## Começar

```sh
npm install
npm run storybook
npm run dev --workspace @art-liz/playground
```

## Verificações

```sh
npm test
npm run lint
npm run format:check
npm run build
npm run ci
```

## Storybook Publicado

- Homologação: <https://arturribeiro01.github.io/art-liz-design-system/homolog/>
- Produção: <https://arturribeiro01.github.io/art-liz-design-system/prod/>

## Criar Um Projeto

```sh
npm create @art-liz/app@latest minha-aplicacao
npm create @art-liz/app@beta minha-aplicacao-beta
```

O CLI estável usa dependências `latest`; o CLI beta usa dependências `beta`. Veja [packages/create-app/README.md](packages/create-app/README.md) para as opções do scaffolder.

## Pacotes

```sh
npm install @art-liz/react
npm install @art-liz/react@beta
```

`@art-liz/react` depende de `@art-liz/tokens`; o npm instala os tokens automaticamente como dependência do pacote React.
