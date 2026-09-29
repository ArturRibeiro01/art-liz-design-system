# art-liz-design-system

Design system pessoal em React e TypeScript, organizado como monorepo npm. Os pacotes compartilhados podem ser publicados separadamente e UI Kits específicos podem ser adicionados em `packages/` quando surgir um projeto que justifique essa separação.

## Estrutura

- `packages/tokens`: tokens e temas sem dependência de framework.
- `packages/react`: componentes React estilizados com Emotion.
- `apps/storybook`: catálogo e documentação dos componentes.
- `apps/playground`: aplicação Vite para testar os pacotes como consumidor.

## Começar

```sh
npm install
npm run storybook
npm run dev --workspace @art-liz/playground
```

## Verificações e builds

```sh
npm test
npm run lint
npm run ci
npm run build
npm run build:storybook:homolog
npm run build:storybook:prod
```

Os builds do Storybook ficam em `storybook-static/homolog` e `storybook-static/prod`, prontos para publicação em destinos de homologação e produção separados.

## GitFlow

O fluxo usa `develop` como homologação/default e `main` como produção. Consulte [templates/gitflow/README.md](templates/gitflow/README.md) para copiar os workflows e fazer o bootstrap dos rulesets. Branches de origem são apagadas após merge, enquanto `main` e `develop` permanecem protegidas.

## Publicação npm

Os pacotes publicáveis são `@art-liz/tokens` e `@art-liz/react`. O campo `publishConfig.access` configura o acesso público. Use Changesets para registrar a alteração e calcular versões:

```sh
npm run changeset
npm run version-packages
```

Depois de autenticar com `npm login` e executar os builds, publique uma versão de homologação com a tag `beta`:

```sh
npm publish --workspace @art-liz/tokens --tag beta
npm publish --workspace @art-liz/react --tag beta
```

Para produção, publique na tag padrão `latest`:

```sh
npm publish --workspace @art-liz/tokens
npm publish --workspace @art-liz/react
```

Consumidores podem instalar homologação com `npm install @art-liz/react@beta` e produção com `npm install @art-liz/react`.