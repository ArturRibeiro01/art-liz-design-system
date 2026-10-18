# Conclusão da base do inventário TapTap

Em 18/10/2026, as nove famílias que ainda estavam ausentes ganharam implementações funcionais no pacote React, na branch `feat/component-library-expansion`. A prioridade de usar os tokens atuais e ajustar o visual depois permanece aplicada. Os nomes e IDs vêm do [inventário](../FIGMA_INVENTORY.md); estas páginas ainda não têm contexto detalhado ou screenshot exportados localmente. Esta entrega não declara equivalência visual ou cobertura integral de variantes.

| Família / página Figma        | Export           | Escopo inicial e limite                                                                                                                                                                                            |
| ----------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cascader `10:1070`            | `Cascader`       | Seletores nativos encadeados; caminho controlado/não controlado; limpeza dos descendentes; submissão somente da folha. Popup com colunas, busca e multisseleção dependem de descoberta.                            |
| Date & Time Picker `11:21810` | `DateTimePicker` | Input nativo `date`, `time` ou `datetime-local`; min/max/step, ref, validação e reset nativos. Calendário, localização e apresentação variam por navegador/SO; sem calendário personalizado ou intervalo de datas. |
| Transfer `11:15566`           | `Transfer`       | Duas listas com busca, checkboxes, seleção dos itens visíveis e movimentação em lote. Itens desabilitados permanecem fixos. Sem paginação ou virtualização.                                                        |
| Chart `16:13286`              | `Chart`          | Barras horizontais com dados textuais legíveis, formatação de valores, negativos, zero e vazio. Outros tipos de gráfico dependem da referência detalhada.                                                          |
| Filter item `11:28035`        | `FilterItem`     | Botão de filtro com seleção controlada/não controlada e `aria-pressed`. O consumidor aplica o filtro; não submete valores de formulário automaticamente.                                                           |
| Audit Status `11:33524`       | `AuditStatus`    | Indicador com texto fornecido pelo consumidor, `intent` e ícone opcional. Nenhuma enum de aprovação ou regra de negócio embutida.                                                                                  |
| Message `14:14114`            | `Message`        | Feedback compacto em fluxo com `role="status"` por padrão e fechamento opcional. Sem fila global, portal ou descarte automático.                                                                                   |
| Popconfirm `11:34264`         | `Popconfirm`     | Confirmação contextual com Popover API nativa, foco inicial no cancelamento, Escape, clique externo e retorno do foco nas ações. Sem modalidade ou captura de Tab; `onConfirm` é uma notificação síncrona.         |
| Result `11:33523`             | `Result`         | Região nomeada com título, descrição, ícone e ações opcionais. Imagens/ícones vêm do consumidor; sem reprodução de ilustrações do kit.                                                                             |

## Contratos de formulário e estado

- `Cascader.options` contém nós `{ value, label, disabled?, children? }`. Os valores devem ser strings não vazias, únicas entre irmãos; prefira valores de folha globalmente únicos para submissão. `value`/`defaultValue` representam o caminho completo como array. `onValueChange` recebe também os caminhos intermediários; `name` submete somente uma folha válida. Não há prop `required` ou validação automática de caminho completo: o consumidor pode usar `error`.
- `Transfer.items` contém `{ id, label, disabled? }` com IDs únicos. `targetKeys`/`defaultTargetKeys` são os IDs da lista de destino. `onTargetKeysChange` recebe a próxima seleção. `name` submete uma entrada por item de destino ainda presente em `items`, na ordem de `items`, incluindo itens fixos desabilitados. O atributo `disabled` do grupo exclui todos os valores do formulário.
- Ambos oferecem reset não controlado para seus valores iniciais, respeitando `preventDefault` no evento de reset. Em modo controlado, o consumidor atualiza as props e trata o reset do formulário. Os callbacks de valor dos compostos também podem ser chamados pelo reset não controlado; não são eventos DOM sintéticos.
- `DateTimePicker` conserva o contrato de Input, exceto limpeza textual e `type`; use `mode`. `datetime-local` usa data/hora local sem fuso; serialização e conversão de fuso pertencem ao consumidor.
- `FilterItem` usa `selected`/`defaultSelected` e `onSelectedChange`. Como botão `type="button"`, Space/Enter alternam o estado sem submeter o formulário. `onClick.preventDefault()` cancela a alternância.

## Feedback, confirmação e dados

`Message.onDismiss` solicita fechamento; o consumidor remove a mensagem. Sem `onDismiss`, o botão não aparece. `role="alert"` pode ser usado para avisos urgentes. AuditStatus não cria uma região viva automaticamente. Result aceita ações React e um ícone decorativo; forneça o significado pelo título/descrição.

Popconfirm recebe conteúdo para um botão em `trigger` (não passe outro botão), `title`, `description`, `onConfirm`, `onCancel`, `onOpenChange`, `confirmLabel`, `cancelLabel`, `intent="primary"|"danger"` e `disabled`. Cancelar/Escape chamam `onCancel`; clique externo apenas fecha e informa a transição por `onOpenChange`. A confirmação fecha e restaura o foco antes de chamar `onConfirm`, permitindo que a ação abra outro diálogo. Tratamento assíncrono, erros e confirmação persistente pertencem ao consumidor. Navegadores precisam implementar `showPopover`/`hidePopover`.

Chart recebe `title`, `description?`, `data: { id, label, value }[]`, `valueFormatter?` e `emptyLabel?`. IDs são únicos e valores devem ser finitos. O texto permanece na árvore acessível e as barras são decorativas. Escala linear por magnitude; se houver negativos, zero fica no centro. A implementação não depende de uma biblioteca de gráficos.

## Continuidade visual

Consultar as páginas acima em uma sessão com acesso ao Figma usando `figma-design-to-code` e `get_design_context` com screenshot; preservar IDs, medidas, estados e assets em `docs/figma/`. Contextos marcados como sparse precisam de consulta dos nós filhos relevantes. Comparar as implementações aos retornos completos antes de declarar fidelidade ou estender as variantes. As capturas anteriores de Input e Checkbox permanecem imutáveis.

A base agora possui 37 exports de componentes: correspondência funcional inicial para as 34 famílias catalogadas, mais Text, Box e Container. As 31 famílias além de Button/Input/Checkbox não representam variantes detalhadas verificadas; Button também mantém auditoria visual pendente.

## Validação desta entrega

Em 18/10/2026, o gate completo passou com `npx --yes --package npm@11.6.2 -- npm run ci`: 144 testes React, quatro testes do CLI, 95 stories em Chromium, lint, formatação, builds dos pacotes/playground, instalação limpa dos tarballs com verificação dos novos exports e builds estáticos do Storybook para homologação e produção.

A revisão dirigida no playground confirmou seleção em níveis, remoção de descendentes, transferência nos dois sentidos, valores de formulário, reset, filtros por Space/Enter, cancelamento/confirmação e retorno de foco do Popconfirm por teclado, Escape e clique externo. O layout foi inspecionado a 320px sem rolagem horizontal. Axe não apontou violações nas duas seções novas nem no Popconfirm aberto em repouso e hover, após corrigir localmente o contraste da ação de confirmação e reforçar seu foco. Isso não substitui auditoria completa de navegadores, acessibilidade ou comparação visual com as variantes do Figma.
