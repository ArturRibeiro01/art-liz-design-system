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
npm run lint
npm run format
npm run format:check
npm run build
npm run ci
```

- `npm test`: compila tokens e executa testes dos pacotes.
- `npm run lint`: roda ESLint por workspace e valida sintaxe do script shell.
- `npm run format`: aplica Prettier.
- `npm run format:check`: verifica Prettier sem modificar arquivos.
- `npm run build`: compila tokens, React e playground.
- `npm run ci`: executa o gate completo usado no GitHub Actions.

## Qualidade De Código

Cada workspace mantém um script `lint` local. O ESLint flat compartilhado fica na raiz e o Prettier é o formatador padrão.

O workspace VS Code habilita format-on-save e recomenda as extensões Prettier e ESLint. O hook Husky/lint-staged executa autofix apenas nos arquivos staged antes do commit; os gates completos continuam no CI.

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
