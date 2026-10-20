# Tipografia e layout

## Tipografia

`typography` exporta famílias `sans`, `component` e `mono`, tamanhos de `xs` a `4xl`, pesos `regular`, `medium`, `semibold` e `bold`, além de alturas de linha. A família `component` lê `--art-liz-font-family`, com fallback de fontes do sistema.

`typography.textStyles` reúne `h1`, `h2`, `h3`, `title`, `subtitle`, `body` e `caption`. Text aplica essas variantes, mas a semântica HTML é escolhida por `as`: `variant="h1"` sozinho não transforma um parágrafo em heading.

```tsx
import { Text } from '@art-liz/react'

export function Introducao() {
  return (
    <section aria-labelledby="titulo-introducao">
      <Text as="h1" id="titulo-introducao" variant="h1" weight="semibold">
        Meu projeto
      </Text>
      <Text variant="body">Uma descrição que orienta o próximo passo.</Text>
      <Text variant="caption" color="neutral.600" fontFamily="mono">
        versão 1.0
      </Text>
    </section>
  )
}
```

Veja a [escala tipográfica](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/tokens-typography--overview) e o [Text em uso](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/typography-text--type-scale). As fontes do sistema variam conforme o ambiente; não presuma o mesmo desenho ou quebra de linha em todos os dispositivos.

## Espaçamentos, raios e sombras

| Grupo     | Escala atual                                                    |
| --------- | --------------------------------------------------------------- |
| `spacing` | `1: 4px`, `2: 8px`, `3: 12px`, `4: 16px`, `6: 24px`, `8: 32px`. |
| `radii`   | `small: 4px`, `medium: 8px`, `pill: 999px`.                     |
| `shadows` | `none`, `sm`, `md`, `lg`.                                       |

Use as chaves nas props que aceitam tokens, como `Box padding={4}`. Fora das APIs dos componentes, leia o valor exportado, como `spacing[4]`. Sombras indicam separação visual, mas não mudam a ordem das camadas nem substituem bordas e contraste.

Catálogos: [Spacing](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/tokens-spacing--overview), [Radii](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/tokens-radii--overview) e [Shadows](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/tokens-shadows--overview).

## Layout responsivo

`breakpoints` define `sm: 480px`, `md: 768px`, `lg: 1024px` e `xl: 1280px`. Os valores são strings CSS; use-os em media queries dos estilos da aplicação. Container usa essa escala em `maxWidth`, mas não cria colunas automaticamente.

Em um arquivo de estilos, como `Lista.style.ts`:

```ts
import { breakpoints, colors, radii, shadows, spacing, typography } from '@art-liz/tokens'
import styled from '@emotion/styled'

export const Lista = styled.div`
  display: grid;
  gap: ${spacing[4]};
  padding: ${spacing[4]};
  background: ${colors.white};
  color: ${colors.neutral[900]};
  border-radius: ${radii.medium};
  box-shadow: ${shadows.sm};
  font-family: ${typography.fontFamilies.component};

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`
```

O exemplo começa com uma coluna e passa a duas em `md`. Valide textos longos, zoom e a largura mínima do conteúdo. Explore [Breakpoints](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/tokens-breakpoints--overview).

## Camadas

`zIndices` define `base: 0`, `raised: 10`, `dropdown: 100`, `overlay: 1000`, `modal: 1100` e `toast: 1200`. Use esses valores nos estilos de superfícies próprias, junto de um posicionamento apropriado.

Um `z-index` maior não permite atravessar qualquer contexto de empilhamento. Dialog modal e popovers nativos usam a top layer do navegador; não tente reproduzir esse comportamento apenas aumentando um número. Consulte o [catálogo de camadas](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/tokens-z-index--overview) e a API do componente de superfície que vai usar.
