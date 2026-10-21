# Cores e personalização

As escalas têm tons de `50` a `900`. `primary` representa a ação principal; `auxiliary` é uma escala de apoio; `neutral` atende texto, bordas e superfícies. `success`, `warning`, `info` e `danger` comunicam estados semânticos. Escolha o intent pela finalidade da mensagem, junto de texto ou outro indicador que não dependa apenas da cor.

Consulte a [paleta interativa](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/tokens-colors--overview) e a [matriz de intents do Button](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/actions-button--intent-matrix).

## Expressões CSS e valores literais

`colors.primary[600]` é uma expressão com variável CSS e fallback. `colorValues.primary[600]` é o HEX padrão. `colorCssVariables.primary[600]` é o nome `--art-liz-color-primary-600`.

Os aliases `ink`, `forest`, `moss`, `paper`, `muted` e `border` têm variáveis independentes. Alterar uma escala não muda automaticamente um alias cujo fallback originalmente tem o mesmo HEX.

## Sobrescrever por escopo

As variáveis podem ficar em `:root` ou em um ancestral dos componentes. Um escopo local permite experimentar uma marca sem mudar todas as áreas da aplicação:

```css
.marca-projeto {
  --art-liz-color-primary-400: #7c3aed;
  --art-liz-color-primary-500: #6d28d9;
  --art-liz-color-primary-600: #5b21b6;
  --art-liz-color-primary-700: #4c1d95;
  --art-liz-font-family: system-ui, sans-serif;
}
```

O exemplo é uma sobrescrita parcial, não uma paleta completa validada. Confira os demais tons, superfícies, intents e estados usados no produto, incluindo hover, active, disabled e foco.

## Configurar pelo Emotion

O mesmo escopo pode usar os nomes exportados pelo DS. Crie um componente de aplicação como este:

```tsx
import { Button } from '@art-liz/react'
import { colorCssVariables, typography } from '@art-liz/tokens'
import { Global } from '@emotion/react'

export function MarcaProjeto() {
  return (
    <>
      <Global
        styles={{
          '.marca-projeto': {
            [colorCssVariables.primary[400]]: '#7c3aed',
            [colorCssVariables.primary[500]]: '#6d28d9',
            [colorCssVariables.primary[600]]: '#5b21b6',
            [colorCssVariables.primary[700]]: '#4c1d95',
            [typography.cssVariables.fontFamily]: 'system-ui, sans-serif',
          },
        }}
      />
      <section className="marca-projeto" aria-label="Exemplo de marca">
        <Button>Continuar</Button>
      </section>
    </>
  )
}
```

A variável de fonte escolhe a família, mas não baixa arquivos de fonte. Ao usar uma família própria, a aplicação cuida do carregamento e do fallback. Para trocar só um texto, use a prop `fontFamily` do Text.

## Temas e contraste

Não há preset completo de modo escuro nem troca automática de tema no DS atual. Uma implementação escura precisa considerar superfícies, texto, bordas, intents, foco e overlays em conjunto. As variáveis disponíveis são um mecanismo de personalização; elas não garantem contraste ou paridade entre temas. Consulte os [limites de acessibilidade](acessibilidade-e-limites.md) antes de adotar uma combinação.
