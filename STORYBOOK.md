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

Esse comando executa as stories como testes de componente em Chromium headless via Vitest e Playwright. As stories também ficam marcadas para teste no painel do Storybook, permitindo rodar testes pela interface. Em uma máquina nova, baixe o navegador do Playwright uma vez:

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

O catálogo `Foundations/Icons` usa Phosphor Icons para demonstração. A biblioteca é dependência de runtime apenas do Storybook e dependência de desenvolvimento de `packages/react` para compilar as stories.

O pacote público `@art-liz/react` permanece independente da biblioteca de ícones em runtime.
