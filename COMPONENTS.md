# Componentes

Referência curta para consumir `@art-liz/react` e `@art-liz/tokens`.

No Storybook, abra o grupo de um componente e selecione **Documentação** (ícone de documento) para ler sua finalidade, importação e um exemplo completo em React. Os 37 componentes públicos têm páginas MDX junto das stories, como [Button.mdx](packages/react/src/Button/Button.mdx).

## Button

Importe `Button` de `@art-liz/react`. As props `variant`, `intent` e `size` escolhem a aparência, a intenção semântica e a escala; `startIcon` e `endIcon` aceitam qualquer elemento React.

```tsx
import { Button, Icons } from '@art-liz/react'

export function ContinueButton() {
  return (
    <Button
      endIcon={<Icons.ArrowRightIcon size="1em" weight="regular" />}
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

## Input

`Input` é um campo nativo com `label`, `helpText`, `error` e ref para o elemento HTML. Os tamanhos `small`, `medium` (padrão) e `large` têm alturas de 24, 36 e 40px, seguindo a referência Figma. A largura acompanha o contêiner.

```tsx
import { Input } from '@art-liz/react'

;<Input
  autoComplete="email"
  helpText="Usaremos este endereço para contato."
  label="E-mail"
  name="email"
  required
  type="email"
/>
```

`error="Informe um e-mail válido."` mostra a mensagem e ativa `aria-invalid`. Ajuda, erro e descrições externas são associados automaticamente. Sem `label`, forneça um label externo ou `aria-label`/`aria-labelledby`; placeholder não substitui o nome acessível.

Para limpeza controlada:

```tsx
import { useState } from 'react'
import { Input } from '@art-liz/react'

export function NameField() {
  const [name, setName] = useState('')
  return (
    <Input
      clearable
      clearLabel="Limpar nome"
      label="Nome"
      onChange={(event) => setName(event.target.value)}
      onClear={() => setName('')}
      value={name}
    />
  )
}
```

Sem `value`, use `defaultValue`: a limpeza e o reset preservam o comportamento não controlado. A ação de limpar aparece em campos textuais preenchidos e com foco; chama `onClear`, sem criar um evento `onChange` artificial. `readOnly` e `disabled` seguem a semântica nativa e não oferecem limpeza.

## Checkbox

`Checkbox` mantém a seleção, teclado, validação e participação em formulário do input nativo. A caixa mede 16px, com label associado e estado indeterminado pela propriedade DOM.

```tsx
import { Checkbox } from '@art-liz/react'

<Checkbox defaultChecked label="Receber novidades" name="news" value="yes" />
<Checkbox indeterminate label="Selecionar todos" />
```

Para controle externo, use `checked` e `onChange={(event) => setChecked(event.target.checked)}`. Em grupos, derive `indeterminate` da seleção parcial e atualize-o junto com os itens. O marcador parcial é um quadrado; não representa um terceiro valor enviado pelo formulário. Sem label visível, forneça nome acessível por `aria-label`, `aria-labelledby` ou label externo. Ambos os componentes encaminham refs para `HTMLInputElement` e expõem seus tipos pelo pacote.

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

O catálogo público `Icons` de `@art-liz/react` centraliza os ícones do DS. Componentes, stories e aplicações usam essa entrada. Phosphor permanece como implementação de runtime somente dentro de `packages/react/src/Icons`; os slots públicos continuam recebendo qualquer `ReactNode`.

Consumidores importam o catálogo do DS e escolhem o ícone pelo nome:

```tsx
import { Button, Icons } from '@art-liz/react'

function AddButton() {
  return <Button startIcon={<Icons.PlusIcon size="1em" weight="regular" />}>Adicionar</Button>
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

## Biblioteca ampliada

Os 22 componentes abaixo foram construídos com os tokens e padrões atuais, conforme a prioridade definida em 18/10/2026. O ajuste visual às variantes do Figma fica para depois; Input e Checkbox mantêm as capturas detalhadas já registradas.

| Componente  | Uso e contrato principal                                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Radio       | Input radio nativo; agrupe por `name`, com `checked`/`defaultChecked`, `value`, `required` e `label`.                                              |
| Switch      | Input checkbox com `role="switch"`; mesma semântica de seleção e formulário, com `label`.                                                          |
| Textarea    | Texto multilinha com `rows`, `label`, `helpText`, `error`, `size` e ref nativa.                                                                    |
| Select      | Select nativo com `option`/`optgroup`, `multiple`, `value`/`defaultValue`, labels e mensagens.                                                     |
| Slider      | Range nativo com `min`, `max`, `step`, `value`/`defaultValue`, `aria-valuetext` e label.                                                           |
| Upload      | Seletor local de arquivos com `accept`, `multiple`, `onChange` e ref. Não executa upload nem valida tamanho/tipo por conta própria.                |
| Form        | Formulário nativo em grid; `gap` aceita uma chave dos tokens de espaçamento.                                                                       |
| ButtonGroup | Grupo nomeado de ações com orientação horizontal/vertical; não é toolbar com setas.                                                                |
| Link        | Âncora com `href`, ref e atributos nativos; `_blank` acrescenta `noopener noreferrer` preservando `rel`.                                           |
| Badge       | Marcador textual com `intent`; não anuncia mudanças automaticamente.                                                                               |
| Tag         | Marcador com `intent` e remoção opcional via `onRemove`, `removeLabel` e `disabled`. O consumidor controla a remoção do DOM.                       |
| Alert       | Mensagem com `title`, `intent` e `onDismiss`; `role="status"` por padrão, `role="alert"` quando explicitamente necessário.                         |
| Breadcrumb  | `items: { label, href? }[]`; o último item recebe `aria-current="page"`.                                                                           |
| Pagination  | `page`, `pageCount` positivo e inteiro e `onPageChange`; renderiza uma faixa compacta para listas grandes.                                         |
| Tabs        | `items: { id, label, content, disabled? }[]`, IDs únicos, `value`/`defaultValue`, `onValueChange`, `label` e `orientation`.                        |
| Steps       | Lista não interativa de `items: { id?, title, description?, status? }[]`; `current` é índice começando em zero.                                    |
| Table       | Table nativa com `caption`, `thead`/`tbody`, `th`/`td`, ref e região com rolagem acessível por teclado. Sorting e seleção pertencem ao consumidor. |
| Dialog      | Modal controlado por `open`/`onClose`, com `title`, `description`, `footer`, ref, `closeLabel` e `dismissOnBackdrop`.                              |
| Drawer      | Mesmo contrato de Dialog, com `side="left"                                                                                                         | "right"` e apresentação lateral. |
| Popover     | Conteúdo não modal com `trigger`, `title`, `children`, `disabled` e `onOpenChange`.                                                                |
| Dropdown    | Menu de ações com `trigger`, `label`, `items: { id, label, disabled?, onSelect? }[]` e `onOpenChange`.                                             |
| Tooltip     | `content` e um único elemento React acionável como filho; o filho deve encaminhar `aria-describedby` ao DOM.                                       |

`Badge`, `Tag` e `Alert` aceitam `intent="neutral"|"primary"|"success"|"danger"|"info"|"warning"`. O tipo público compartilhado é `SemanticIntent`.

### Abas controladas

```tsx
const [tab, setTab] = useState('account')

<Tabs
  label="Configurações"
  value={tab}
  onValueChange={setTab}
  items={[
    { id: 'account', label: 'Conta', content: <AccountSettings /> },
    { id: 'notifications', label: 'Notificações', content: <NotificationSettings /> },
  ]}
/>
```

Setas seguem a orientação, Home/End selecionam os extremos e abas desabilitadas são ignoradas. Painéis continuam montados quando ocultos; mantenha os IDs de itens estáveis.

### Diálogo controlado

```tsx
const [open, setOpen] = useState(false)

<>
  <Button onClick={() => setOpen(true)}>Editar</Button>
  <Dialog open={open} onClose={() => setOpen(false)} title="Editar perfil">
    <Input label="Nome" name="name" />
  </Dialog>
</>
```

O navegador cuida da modalidade, do ciclo de foco e do retorno ao acionador. Escape e clique no backdrop solicitam fechamento; `dismissOnBackdrop={false}` desativa o clique externo. Para impedir Escape, use `onCancel={(event) => event.preventDefault()}`. `Drawer` reutiliza esse comportamento.

### Menu e conteúdo contextual

```tsx
<Dropdown
  trigger="Ações"
  label="Ações do projeto"
  items={[
    { id: 'edit', label: 'Editar', onSelect: editProject },
    { id: 'archive', label: 'Arquivar', disabled: true },
  ]}
/>

<Popover trigger="Detalhes" title="Sobre o projeto">
  <Text>Informações adicionais.</Text>
</Popover>

<Tooltip content="Salva as alterações">
  <Button variant="ghost">Salvar</Button>
</Tooltip>
```

`trigger` de Dropdown/Popover é o conteúdo do botão criado pelo componente; evite passar outro botão ou link interativo. Use Popover para conteúdo interativo e Tooltip para uma descrição curta não interativa. Popover/Dropdown têm estado interno e são dispensados por clique externo/Escape. Dropdown permite setas, Home/End, busca por texto, Enter/Espaço e saída por Tab.

Dialog/Drawer exigem suporte a `HTMLDialogElement.showModal`; Popover/Dropdown exigem a Popover API. Esta entrega usa essas APIs em navegadores modernos sem polyfills. Nenhum componente publica dados ou envia arquivos por conta própria.

## Famílias restantes do inventário

A rodada seguinte acrescenta nove componentes, completando uma base funcional para as 34 famílias catalogadas e elevando o pacote a 37 componentes. O visual segue os tokens atuais; as variantes detalhadas destas páginas do Figma ainda precisam ser consultadas. Consulte os [contratos e limites completos](docs/remaining-component-scope.md).

| Componente     | API e uso inicial                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cascader       | `label`, `options`, `value`/`defaultValue` como caminho, `onValueChange`, `name`, `disabled`, `helpText`, `error` e `size`; seletores encadeados com submissão da folha. |
| DateTimePicker | Props de Input com `mode="date"                                                                                                                                          | "time" | "datetime-local"`, ref nativa e min/max/step; sem limpeza textual. |
| Transfer       | `label`, `items`, `targetKeys`/`defaultTargetKeys`, `onTargetKeysChange`, `name`, busca e seleção em lote.                                                               |
| Chart          | Barras horizontais; `title`, `data` com id/label/value, `description`, `valueFormatter` e `emptyLabel`.                                                                  |
| FilterItem     | Botão de filtro; `selected`/`defaultSelected`, `onSelectedChange`, `disabled` e atributos nativos; estado por `aria-pressed`.                                            |
| AuditStatus    | Texto em `children`, `intent` e `icon` opcional; sem regras de negócio ou live region automática.                                                                        |
| Message        | `intent`, `icon`, `role`, `onDismiss` e `dismissLabel`; feedback compacto sem descarte automático.                                                                       |
| Popconfirm     | `trigger`, `title`, `description`, `onConfirm`/`onCancel`, `onOpenChange`, rótulos das ações e intent primary/danger.                                                    |
| Result         | `title`, `description`, `icon`, `actions`, `children` e `intent`; região nomeada de resultado/vazio/erro.                                                                |

```tsx
import { Cascader, DateTimePicker, Transfer } from '@art-liz/react'

<Cascader label="Categoria" name="category" options={[
  { value: 'design', label: 'Design', children: [{ value: 'ui', label: 'Interface' }] },
]} />
<DateTimePicker label="Prazo" mode="date" name="deadline" />
<Transfer label="Componentes" name="components" items={[
  { id: 'button', label: 'Button' }, { id: 'input', label: 'Input' },
]} defaultTargetKeys={['input']} />
```
