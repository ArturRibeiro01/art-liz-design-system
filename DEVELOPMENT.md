# Desenvolvimento

Guia rápido para trabalhar localmente no monorepo `art-liz-design-system`.

## Requisitos

- Node.js `>=20.19.0`
- npm `11.6.2`, conforme `packageManager`

## Instalação

```sh
npm install
```

## Apps Locais

Storybook:

```sh
npm run storybook
```

Playground:

```sh
npm run dev --workspace @art-liz/playground
```

Se o Vite não resolver um pacote local após instalar ou alterar dependências, compile os pacotes e reinicie o servidor com otimização forçada:

```sh
npm run build
npm run dev --workspace @art-liz/playground -- --force
```

## Verificações

```sh
npm test
npm run test:storybook
npm run lint
npm run format
npm run format:check
npm run build
npm run check:commit
npm run ci
```

- `npm test`: compila tokens e executa testes dos pacotes.
- `npm run test:storybook`: compila tokens e React, depois executa as stories como testes de componente em Chromium headless, inclusive em checkout limpo.
- `npm run lint`: roda ESLint por workspace e valida sintaxe do script shell.
- `npm run format`: aplica Prettier.
- `npm run format:check`: verifica Prettier sem modificar arquivos.
- `npm run build`: compila tokens, React e playground.
- `npm run check:commit`: executa testes dos pacotes, stories, lint, formatação e build, parando na primeira falha.
- `npm run ci`: executa o gate completo usado no GitHub Actions.

Em uma máquina nova, rode `npx playwright install chromium` uma vez antes de `npm run test:storybook`. No CI, essa instalação é feita pelo workflow.

## Qualidade De Código

Cada workspace mantém um script `lint` local. O ESLint flat compartilhado fica na raiz e o Prettier é o formatador padrão.

O workspace VS Code habilita format-on-save e recomenda as extensões Prettier e ESLint. O pre-commit executa lint-staged para corrigir os arquivos staged e depois npm run check:commit. O commit é bloqueado se testes, stories, lint, formatação ou build falharem. O hook é instalado por npm install através do script prepare. Para reinstalá-lo em um clone existente, execute npm run prepare.

Essas verificações usam o diretório de trabalho atual, incluindo mudanças ainda não staged, e tornam o commit mais demorado. Instale o Chromium conforme indicado acima antes do primeiro commit. O CI continua validando os tarballs e os builds estáticos do Storybook. Não há pre-push.

## Estrutura

```text
apps/
  playground/       Aplicação Vite consumidora de teste
  storybook/        Catálogo visual e documentação interativa
packages/
  create-app/       CLI npm e template React + Vite
  react/            Componentes React reutilizáveis
  tokens/           Tokens sem dependência de framework
```

## GitFlow

O fluxo usa `develop` como homologação/default e `main` como produção. Branches de origem são apagadas após merge, enquanto `main` e `develop` permanecem protegidas.

Consulte [templates/gitflow/README.md](templates/gitflow/README.md) para copiar os workflows e fazer o bootstrap dos rulesets em outros repositórios.
