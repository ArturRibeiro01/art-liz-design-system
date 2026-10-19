# @art-liz/react

## 1.1.0

### Minor Changes

- 2338351: Adiciona Cascader, DateTimePicker, Transfer, Chart, FilterItem, AuditStatus, Message, Popconfirm e Result, completando a base funcional das famílias catalogadas. Inclui estado controlado/não controlado e reset nos controles compostos, confirmação contextual acessível, stories, testes e exemplos. Visual baseado nos tokens atuais; comparação detalhada às variantes do Figma permanece pendente.
- 0824468: Amplia a biblioteca com Radio, Switch, Textarea, Select, Slider, Upload, Form, ButtonGroup, Link, Badge, Tag, Alert, Breadcrumb, Pagination, Tabs, Steps, Table, Dialog, Drawer, Popover, Dropdown e Tooltip. As novas implementações reutilizam os tokens e padrões atuais, com semântica nativa, navegação por teclado, stories e demonstração integrada; o ajuste visual dirigido ao Figma fica para a próxima etapa.
- 94c4f7a: Suaviza entrada e saída de superfícies e mudanças de estado com tokens de motion, respeitando movimento reduzido e a navegação por teclado. Adiciona open ao Alert, tamanhos small/medium/large ao Badge e intents ao Tooltip, além de exemplos de Alert e filtros funcionais no Storybook.
- 0824468: Adiciona Input Basic e Checkbox com referência visual do Figma, controles HTML nativos, labels e mensagens acessíveis, refs, tamanhos de Input, limpeza opcional e estado indeterminado do Checkbox.
- 6805cac: Disponibiliza o catálogo Icons do DS e centraliza sua integração com Phosphor. Componentes internos, stories e template usam essa camada para fechamento, estados, navegação e slots de Button, preservando nomes acessíveis e comportamento. Os SVGs originais de Input/Checkbox permanecem intactos e têm acesso interno centralizado em Icons/assets.
- 8c45d57: uploaded library

## 1.0.0

### Major Changes

- a5fec6c: Expand Button with semantic intents, variants, sizes, icon slots, and accessible icon-only usage. Replace the `secondary` variant with `outline`, `ghost`, and `link`.

### Minor Changes

- e772887: Add the Box container component with token-based spacing, background, radius, and shadow options.
- e772887: Add a responsive Container component with token-based max-width options and horizontal gutters.
- 0bdb8f5: Add the Text typography component with semantic variants mapped to the typography token scale.

### Patch Changes

- Updated dependencies [0bdb8f5]
  - @art-liz/tokens@0.2.0
