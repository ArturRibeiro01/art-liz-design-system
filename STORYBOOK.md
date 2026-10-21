# Storybook

O Storybook reúne a documentação visual do design system, stories dos componentes e páginas de tokens.

## Rodar Localmente

```sh
npm run storybook
```

O comando compila `@art-liz/tokens` e `@art-liz/react` antes de iniciar o servidor.

## Testes e Acessibilidade

O Storybook usa `@storybook/addon-docs`, `@storybook/addon-a11y` e `@storybook/addon-vitest`.

```sh
npm run test:storybook
```

Esse comando compila `@art-liz/tokens` e `@art-liz/react` antes de executar as stories como testes de componente em Chromium headless via Vitest e Playwright. Isso permite rodá-lo em checkout limpo: o catálogo de ícones importa a API pública `@art-liz/react`, cujo export aponta para `dist`. As stories também ficam marcadas para teste no painel do Storybook, permitindo rodar testes pela interface. Em uma máquina nova, baixe o navegador do Playwright uma vez:

```sh
npx playwright install chromium
```

No GitHub Actions, o workflow de CI instala o Chromium antes de rodar `npm run ci`.

## Builds Estáticos

```sh
npm run build:storybook:homolog
npm run build:storybook:prod
```

Saídas:

- Homologação: `storybook-static/homolog`
- Produção: `storybook-static/prod`

Os dois builds usam a mesma configuração e as mesmas stories. A separação é de artefato e destino.

## GitHub Pages

O deploy automático usa GitHub Pages:

- Raiz: <https://arturribeiro01.github.io/art-liz-design-system/>
- Homologação: <https://arturribeiro01.github.io/art-liz-design-system/homolog/>
- Produção: <https://arturribeiro01.github.io/art-liz-design-system/prod/>

O workflow [.github/workflows/deploy-storybook.yml](.github/workflows/deploy-storybook.yml) publica quando há push em `develop` ou `main` com alterações em:

- `.github/workflows/deploy-storybook.yml`
- `apps/storybook/**`
- `packages/**`
- `package.json`
- `package-lock.json`

Ele também pode ser executado manualmente por `workflow_dispatch`.

Como cada deploy do GitHub Pages substitui o artefato publicado, o workflow sempre faz checkout de `develop` e `main`, recompila homologação e produção, e publica os dois destinos no mesmo artefato.

## Ícones No Catálogo

O catálogo `Foundations/Icons` consome `Icons` de `@art-liz/react`. A integração Phosphor fica centralizada em `packages/react/src/Icons`, como dependência de runtime do pacote React. Componentes e consumidores usam essa camada do DS; Button continua aceitando `ReactNode` nos slots de ícones. A pré-otimização de `@art-liz/react` nos testes do Storybook exige seu build prévio e evita descobrir os subpaths de Phosphor durante os testes, o que poderia recarregar o navegador.
