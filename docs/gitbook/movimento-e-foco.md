# Movimento e foco

## Tokens de motion

| Token                     | Valor   | Uso atual no DS                                               |
| ------------------------- | ------- | ------------------------------------------------------------- |
| `motion.durations.fast`   | `120ms` | Estados de campos e outros controles pequenos.                |
| `motion.durations.normal` | `160ms` | Superfícies menores, conteúdo de Tabs e transições do Button. |
| `motion.durations.slow`   | `240ms` | Dialog e Drawer.                                              |

As curvas são `standard`, `entrance` e `exit`. Use-as nos estilos conforme a interação. As durações são strings com unidade; não passe `"120ms"` diretamente a uma API JavaScript que espera um número em milissegundos.

Para uma ação própria da aplicação, em `Acao.style.ts`:

```ts
import { colors, focus, motion, radii, spacing } from '@art-liz/tokens'
import styled from '@emotion/styled'

export const Acao = styled.button`
  padding: ${spacing[3]} ${spacing[4]};
  border: 0;
  border-radius: ${radii.small};
  background: ${colors.primary[900]};
  color: ${colors.white};
  font: inherit;
  transition: background-color ${motion.durations.fast} ${motion.easings.standard};

  &:hover {
    background: ${colors.primary[800]};
  }

  &:focus-visible {
    outline: ${focus.ringWidth} ${focus.ringStyle} ${focus.ringColor};
    outline-offset: ${focus.ringOffset};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
```

Esse exemplo mostra a composição de tokens; para ações comuns, prefira o Button do DS. Confira [Motion](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/tokens-motion--overview) e [Focus](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/tokens-focus--overview) no Storybook.

## Preferência por movimento reduzido

Nos estilos próprios, mantenha `prefers-reduced-motion: reduce` para retirar animações e transições dispensáveis. A orientação de permitir desativar movimento causado por interação aparece no [critério 2.3.3 da WCAG, nível AAA](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). O DS já considera essa preferência em suas transições; a aplicação deve fazer o mesmo nas composições que acrescenta.

## Abrir e fechar superfícies

Dialog, Drawer, Alert, Popover, Popconfirm, Dropdown e Tooltip usam transições de entrada/saída. Mantenha o componente montado enquanto altera seu estado de abertura quando quiser preservar a saída. Remover o elemento imediatamente interrompe sua animação.

As saídas usam recursos como `@starting-style` e transições discretas de `display`/`overlay` como melhoria progressiva. Em navegadores sem suporte, o fechamento pode ser imediato. Componentes fechados usam os estados apropriados de visibilidade e, conforme a implementação, `inert` para evitar interação durante a saída.

Veja [Dialog](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/feedback-dialog--default) e [Drawer](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/feedback-drawer--default). A preferência por movimento reduzido não substitui o gerenciamento de foco ou o teste de fechamento por teclado.

## Foco visível

`focus` exporta largura `3px`, offset `2px`, estilo `solid` e cor vinculada a `primary[500]`. Preserve o indicador ao personalizar componentes e confirme que ele permanece visível sobre a superfície real; a cor padrão não garante contraste suficiente em qualquer fundo.

O [critério 2.4.7 da WCAG](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) trata de foco visível para operação por teclado. Teste Tab/Shift+Tab, recortes por `overflow`, overlays e retorno ao acionador depois de fechar uma superfície. Consulte os [limites de contraste e compatibilidade](acessibilidade-e-limites.md).
