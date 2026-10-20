# Acessibilidade e limites atuais

O DS usa elementos HTML nativos, nomes acessíveis e testes de comportamento. Isso é uma base de implementação; conformidade precisa ser verificada nas telas e nos estados reais do produto. Nenhuma página deste guia certifica a biblioteca inteira.

## Texto e contraste

Texto comum deve alcançar pelo menos 4,5:1 contra seu fundo, conforme o [critério 1.4.3 da WCAG](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), que também define as condições para texto grande e exceções. Nomes como `success` ou `primary` não garantem contraste.

Cálculos sobre os HEX de fallback de tokens 0.2.0, sem transparência, em 20/10/2026:

| Par de cores                        | Razão aproximada |
| ----------------------------------- | ---------------- |
| Branco e `primary[600]` (`#15c5ce`) | `2,12:1`         |
| Branco e `primary[500]` (`#47cfd6`) | `1,88:1`         |
| Branco e `danger[800]` (`#c91f24`)  | `5,67:1`         |
| Branco e `neutral[600]` (`#4b4b4b`) | `8,72:1`         |

O Button primary padrão combina branco com `primary[600]`: a combinação fica abaixo de 4,5:1 para texto comum. O anel de foco também precisa de revisão sobre fundos claros. Essas são limitações conhecidas; copiar a paleta original ou uma variante Figma não elimina a necessidade de ajuste e auditoria.

Os números acima não medem uma paleta sobrescrita nem incluem opacidade, imagens ou mistura de cores. Recalcule as combinações após personalizar e revise hover, active, erro e foco. Não use cor como a única forma de distinguir estados.

## Campos e mensagens

A [orientação WAI para labels](https://www.w3.org/WAI/tutorials/forms/labels/) recomenda associar rótulos aos controles. Use `label`, `helpText` e `error` onde a API oferecer essas props. Placeholder sozinho não deve ser o nome do campo.

```tsx
import { Input } from '@art-liz/react'

export function CampoComErro() {
  return (
    <Input
      label="E-mail"
      name="email"
      type="email"
      required
      helpText="Use um endereço ao qual você tenha acesso."
      error="Informe um e-mail válido."
    />
  )
}
```

O exemplo mostra um estado de erro; a aplicação decide quando validá-lo e exibi-lo. Input associa os textos ao campo e aplica `aria-invalid`. A associação de um erro não garante, sozinha, que toda mudança dinâmica será anunciada: valide o fluxo com leitor de tela e defina foco/resumo de erros quando necessário.

Para grupos, use `fieldset`/`legend` quando apropriado e nomes coerentes para radios. Form mantém semântica nativa; validação e requisições pertencem à aplicação. Mensagens de resultado devem distinguir uma ação local de uma gravação concluída em servidor. Veja [Input e seus estados](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/forms-input--states) e [Checkbox](https://arturribeiro01.github.io/art-liz-design-system/homolog/?path=/story/forms-checkbox--states).

## Teclado e foco

- Percorra os controles com Tab e Shift+Tab, mantendo ordem compreensível e foco visível.
- Botões nativos devem funcionar com Enter/Espaço; Checkbox e Switch com Espaço.
- Tabs usa as setas conforme a orientação, além de Home/End, e ignora abas desabilitadas.
- Confira Escape, contenção de foco no modal e retorno ao acionador em Dialog/Drawer.
- Tooltip deve aparecer também por foco; não coloque conteúdo interativo essencial dentro dele.

As instruções de [movimento e foco](movimento-e-foco.md) e [ícones](icones.md) complementam esses cuidados. Teste leitor de tela, zoom, textos longos e preferência por movimento reduzido nas composições do produto.

## Compatibilidade, temas e Figma

Dialog/Drawer dependem de `showModal`; Popover, Popconfirm e Dropdown usam a API nativa de popover. Os testes jsdom não substituem uma matriz de navegadores, e não há garantia de fallback completo para ambientes sem essas APIs. Recursos CSS de saída podem degradar para fechamento imediato. SSR e hidratação também precisam ser verificados conforme o framework consumidor.

Não existe um tema escuro completo validado. Cores/fonte aceitam sobrescrita, mas dimensões e todos os estados não são trocados por um ThemeProvider global. A auditoria de contraste e regressão visual permanece em aberto.

O [inventário Figma](https://github.com/ArturRibeiro01/art-liz-design-system/blob/develop/FIGMA_INVENTORY.md) distingue evidência visual de implementação base. Input e Checkbox têm contextos completos e capturas locais; as 31 famílias acrescentadas em lote usam tokens e padrões atuais, com ajuste visual posterior. Button também precisa de auditoria. Não declarar paridade integral com Figma nem conformidade de contraste sem validação específica.

## Verificação de uma tela

Revise nomes e mensagens no DOM, teste interações por teclado, confira contraste sobre as cores computadas e exercite o layout em diferentes larguras e níveis de zoom. O Storybook oferece exemplos e addon de acessibilidade; os testes automatizados ajudam a encontrar problemas, mas a revisão manual da tela consumidora continua necessária.
