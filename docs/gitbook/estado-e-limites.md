# Estado, reset e limites de composição

## Estado controlado e não controlado

| Família                                 | Controlado pelo app                 | Valor inicial não controlado |
| --------------------------------------- | ----------------------------------- | ---------------------------- |
| Input, Textarea, Select, DateTimePicker | `value` e `onChange`                | `defaultValue`               |
| Checkbox, Radio, Switch                 | `checked` e `onChange`              | `defaultChecked`             |
| Tabs                                    | `value` e `onValueChange`           | `defaultValue`               |
| FilterItem                              | `selected` e `onSelectedChange`     | `defaultSelected`            |
| Cascader                                | `value` e `onValueChange`           | `defaultValue`               |
| Transfer                                | `targetKeys` e `onTargetKeysChange` | `defaultTargetKeys`          |

`defaultValue` e equivalentes são valores iniciais; mudar a prop depois de montar não é um mecanismo geral de controle. Em modo controlado, atualize o estado no callback e mantenha o tipo consistente. Inputs textuais devem começar com uma string quando forem controlados.

Reset HTML restaura controles nativos não controlados. Controles controlados precisam atualizar o estado em `onReset`; composites também têm regras próprias. Cascader e Transfer restauram seu valor inicial não controlado ao receber reset do formulário; Transfer limpa ainda buscas e marcações temporárias. Tabs e FilterItem não são campos submetidos/resetados automaticamente por um Form: restaure seu estado explicitamente quando fizer parte do fluxo.

Input `clearable` usa `onClear`; ele não dispara um `onChange` sintético. Veja as receitas de [formulário](receitas-formularios.md) e [dados](receitas-dados.md).

## Responsabilidade da aplicação

Pagination recebe página e quantidade de páginas, mas não busca dados. FilterItem não filtra nem submete valores sozinho. Table organiza HTML tabular sem paginação, ordenação ou seleção implícitas. Form não fornece schema de validação nem envia dados por uma API. Alert e Message não são serviços globais de toast; Message não tem fila ou descarte automático.

Dialog/Drawer são controlados por `open`/`onClose`. Popover, Dropdown e Popconfirm gerenciam a abertura pela API nativa, notificando `onOpenChange` quando fornecido; não expõem o mesmo contrato controlado de Dialog. As superfícies precisam permanecer montadas para preservar a saída animada. Veja as receitas de [superfícies](receitas-superficies.md) e [confirmação](receitas-confirmacao.md).

## Escopos iniciais

| Componente     | O que existe                                                             | Limite relevante                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cascader       | Selects encadeados, caminho e limpeza de descendentes                    | Sem popup em colunas, busca ou multisseleção. `name` submete apenas a folha válida. Use strings não vazias e únicas entre irmãos.                               |
| DateTimePicker | Input nativo date, time ou datetime-local, com min/max/step              | Aparência e localização variam por navegador/SO. Sem calendário customizado ou intervalo; datetime-local não inclui fuso horário.                               |
| Transfer       | Duas listas, busca, seleção visível e movimentação em lote               | Sem virtualização/paginação. IDs devem ser únicos; itens desabilitados ficam fixos. Com `name`, os valores selecionados são submetidos como entradas repetidas. |
| Chart          | Barras horizontais e valores textuais, incluindo negativos, zero e vazio | Sem outros tipos de gráfico. IDs devem ser únicos e valores precisam ser números finitos.                                                                       |
| Popconfirm     | Confirmação contextual síncrona                                          | Sem modalidade, captura de Tab ou espera de Promise em onConfirm.                                                                                               |

Esses contratos não prometem todas as variantes do Figma. A referência detalhada está no [escopo registrado](https://github.com/ArturRibeiro01/art-liz-design-system/blob/develop/docs/remaining-component-scope.md) e nas páginas de [Documentação dos componentes](componentes.md).

Dialog/Drawer precisam de `showModal`; Popover/Dropdown/Popconfirm dependem de `showPopover` e `hidePopover`. Não há fallback completo prometido para navegadores sem essas APIs. Testes jsdom não comprovam comportamento modal nativo; valide teclado, foco, clique externo, movimento reduzido e layouts estreitos em navegador real. Os [limites de acessibilidade](acessibilidade-e-limites.md) se aplicam também às receitas.
