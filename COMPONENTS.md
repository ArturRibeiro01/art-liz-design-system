# Componentes

Referência curta para consumir `@art-liz/react` e `@art-liz/tokens`.

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

`Text` aplica os estilos tipográficos do design system. Use `variant` para escolher a escala e `as` para preservar a semântica HTML.

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

Variantes disponíveis: `h1`, `h2`, `h3`, `title`, `subtitle`, `body` e `caption`.

`color` aceita tokens escalares ou tokens de escala, como `danger.600`. `fontFamily` aceita `component`, `sans`, `mono` ou uma stack CSS personalizada; fontes externas precisam ser carregadas pelo produto consumidor.

```tsx
<Text fontFamily="sans">Fonte padrão sans</Text>
<Text fontFamily='"Figtree", sans-serif'>Fonte do produto</Text>
```

## Layout

Use `Container` para centralizar e limitar a largura do conteúdo da página, e `Box` para controlar a apresentação de uma seção.

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

O pacote público `@art-liz/react` não depende de Phosphor em runtime. Os slots de ícone recebem qualquer `ReactNode`.

Consumidores que adotarem Phosphor podem importar somente os ícones usados:

```tsx
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus'
import { Button } from '@art-liz/react'

function AddButton() {
  return <Button startIcon={<PlusIcon size="1em" weight="regular" />}>Adicionar</Button>
}
```

Os ícones herdam `currentColor` quando não recebem `color`; `size="1em"` acompanha o tamanho do slot definido pelo Button. Ícones decorativos ficam ocultos da árvore acessível. Um Button sem conteúdo textual exige `aria-label` ou `aria-labelledby`.

## Tokens

Os tokens ficam em `@art-liz/tokens` e também são consumidos internamente por `@art-liz/react`.

```tsx
import { colors, spacing, typography } from '@art-liz/tokens'

const pageStyle = {
  background: colors.neutral[50],
  fontFamily: typography.fontFamilies.component,
  padding: spacing[6],
}
```

As cores e a fonte de componentes usam CSS custom properties sobrescrevíveis. Veja os exemplos completos em [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).
