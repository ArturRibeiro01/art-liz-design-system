# art-liz-design-system

Design system pessoal em React e TypeScript, organizado como monorepo npm. Os pacotes compartilhados podem ser publicados separadamente e UI Kits específicos podem ser adicionados em `packages/` quando surgir um projeto que justifique essa separação.

## Estrutura

- `packages/tokens`: tokens e temas sem dependência de framework.
- `packages/react`: componentes React estilizados com Emotion, organizados em `src/Box`, `src/Button` e `src/Container`.
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
npm run format
npm run format:check
npm run ci
npm run build
npm run build:storybook:homolog
npm run build:storybook:prod
```

Os builds do Storybook ficam em `storybook-static/homolog` e `storybook-static/prod`, prontos para publicação em destinos de homologação e produção separados.

O Storybook também documenta os tokens em páginas `Tokens/*`, incluindo exemplos de como trocar fonte e cores via CSS custom properties no projeto consumidor.

## Qualidade de código

Cada workspace tem um script `lint` local; `npm run lint` executa todos. `npm run format` aplica o padrão Prettier e `npm run format:check` verifica sem modificar arquivos. O workspace VS Code habilita format-on-save e recomenda as extensões Prettier e ESLint. O hook Husky/lint-staged executa autofix apenas nos arquivos staged antes do commit; os gates completos continuam no CI.

## Button

Importe `Button` de `@art-liz/react`. As props `variant`, `intent` e `size` escolhem a aparência, a intenção semântica e a escala; `startIcon` e `endIcon` aceitam qualquer elemento React.

```tsx
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { Button } from '@art-liz/react'

export function ContinueButton() {
  return (
    <Button
      endIcon={<ArrowRightIcon size="1em" weight="regular" />}
      intent="success"
      size="medium"
      variant="outline"
    >
      Continuar
    </Button>
  )
}
```

O texto do botão fornece seu nome acessível. Para ações somente com ícone, informe `aria-label` ou `aria-labelledby`.

## Text

`Text` aplica os estilos tipográficos do design system. Use `variant` para escolher a escala e `as` para preservar a semântica HTML do conteúdo.

```tsx
import { Text } from '@art-liz/react'

export function PageHeading() {
  return (
    <Text as="h1" variant="h1" weight="medium">
      Minha conta
    </Text>
  )
}
```

Variantes: `h1`, `h2`, `h3`, `title`, `subtitle`, `body` e `caption`. Os valores de font-size e line-height vêm de `typography.textStyles`; `color` aceita tokens de cor escalares ou tokens de escala, como `danger.600`. `fontFamily` aceita `component`, `sans`, `mono` ou uma stack CSS personalizada; fontes externas precisam ser carregadas pelo produto consumidor.

## Layout

```tsx
<Text fontFamily="sans">Fonte padrão sans</Text>
<Text fontFamily='"Figtree", sans-serif'>Fonte do produto</Text>
```

Use `Container` para centralizar e limitar a largura do conteúdo da página, e `Box` para controlar a apresentação de uma seção:

```tsx
import { Box, Container } from '@art-liz/react'

export function AccountPage() {
  return (
    <Container background="neutral.50" margin="auto" maxWidth="lg" padding={6}>
      <Box background="white" borderRadius="small" padding={6} shadow="sm">
        Dados da conta
      </Box>
    </Container>
  )
}
```

## Ícones

O Storybook usa [Phosphor Icons](https://phosphoricons.com/) (`@phosphor-icons/react`, licença MIT) no catálogo `Foundations/Icons` e nos exemplos do Button. A biblioteca é dependência de runtime de `@art-liz/storybook` e dependência de desenvolvimento de `@art-liz/react` para compilar suas stories junto aos componentes. O pacote público continua independente em runtime e aceita qualquer elemento React em `startIcon`/`endIcon`.

No catálogo, escolha um ícone por vez. Os controles permitem selecionar o tamanho pela escala `typography.fontSizes` (`xs` a `3xl`), peso Phosphor, cor dos tokens do DS ou uma cor HEX customizada. O line-height acompanha o tamanho tipográfico selecionado.

Consumidores que adotarem Phosphor podem importar somente os ícones usados:

```tsx
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus'
import { Button } from '@art-liz/react'

function AddButton() {
  return <Button startIcon={<PlusIcon size="1em" weight="regular" />}>Adicionar</Button>
}
```

Os ícones herdam `currentColor` quando não recebem `color`; `size="1em"` acompanha o tamanho do slot definido pelo Button: `md` em `small`, `xl` no padrão `medium` e `2xl` em `large`. Ícones decorativos ficam ocultos da árvore acessível. Um Button sem conteúdo textual exige `aria-label` ou `aria-labelledby`.

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
