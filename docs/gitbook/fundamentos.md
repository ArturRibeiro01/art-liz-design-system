# Design tokens

Tokens dão nomes compartilhados aos valores visuais do DS. Use-os nos estilos de uma aplicação ou UI Kit para manter consistência com os componentes. `@art-liz/tokens` não depende de React; declare-o no projeto quando fizer imports diretos.

## API pública

Os exports individuais e o objeto agregado `tokens` vêm do ponto público `@art-liz/tokens`:

| Export              | Uso                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------ |
| `colors`            | Cores em expressões CSS `var(...)` com fallback.                                     |
| `colorValues`       | Valores literais das cores padrão, para cálculos ou integrações que precisam de HEX. |
| `colorCssVariables` | Nomes das variáveis CSS das cores. Não injeta CSS por conta própria.                 |
| `typography`        | Famílias, tamanhos, pesos, alturas de linha e variantes de texto.                    |
| `spacing`           | Espaçamentos `1`, `2`, `3`, `4`, `6`, `8`.                                           |
| `radii` e `shadows` | Raios e sombras da escala atual.                                                     |
| `breakpoints`       | Pontos de quebra para layouts responsivos.                                           |
| `zIndices`          | Camadas convencionais para conteúdo e superfícies.                                   |
| `focus` e `motion`  | Anel de foco, durações e curvas de transição.                                        |

```ts
import { colorCssVariables, colors, colorValues, spacing, tokens } from '@art-liz/tokens'

export const referenciaVisual = {
  corDoTexto: colors.neutral[900],
  corLiteral: colorValues.neutral[900],
  variavelDaCor: colorCssVariables.neutral[900],
  espacamento: spacing[4],
  raio: tokens.radii.medium,
}
```

Prefira `colors` para CSS: ele acompanha as sobrescritas da aplicação. `colorValues` representa os padrões do pacote e não consulta os estilos computados do navegador. Um cálculo com esses valores não mede uma paleta personalizada.

## Onde personalizar

Cores têm variáveis CSS próprias e a família tipográfica usa `--art-liz-font-family`. Os demais grupos exportam valores fixos. Criar uma cópia modificada de `tokens` não altera os componentes que já importam os valores do pacote.

Os componentes atuais não leem um contrato de tema do Emotion. Adicionar um `ThemeProvider` com tokens novos não troca automaticamente suas cores ou dimensões. Use [as variáveis disponíveis](cores-e-personalizacao.md), props documentadas e estilos da aplicação; registre mudanças no núcleo quando o contrato compartilhado precisar evoluir.

## Explorar os fundamentos

- [Cores e personalização](cores-e-personalizacao.md): intents, variáveis CSS e escopo.
- [Tipografia e layout](tipografia-e-layout.md): texto, espaçamento, raios, sombras, breakpoints e camadas.
- [Movimento e foco](movimento-e-foco.md): transições e preferência por movimento reduzido.
- [Ícones](icones.md) e [acessibilidade](acessibilidade-e-limites.md): composição e limites conhecidos.

Os links interativos desses guias apontam para homologação. Confira a [correspondência entre ambiente e versão](catalogos.md) antes de usar os exemplos em um produto estável.
