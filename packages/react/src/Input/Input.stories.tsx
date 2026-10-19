import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Text } from '../Text'
import { Input } from './Input'

const meta = {
  title: 'Forms/Input',
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: 'min(320px, 80vw)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    label: { control: 'text' },
    helpText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
  args: { label: 'Nome', placeholder: 'Digite seu nome' },
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Input Basic baseado no Figma 11:7949. Tamanhos small/medium/large: 24/36/40px. A fonte segue --art-liz-font-family. Use label ou uma associação externa acessível.',
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { helpText: 'Como você prefere ser chamado?' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Nome' })
    await expect(input).toHaveAccessibleDescription('Como você prefere ser chamado?')
    await userEvent.type(input, 'Artur')
    await expect(input).toHaveValue('Artur')
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Input label="Small — 24px" placeholder="Text input" size="small" />
      <Input label="Medium — 36px" placeholder="Text input" size="medium" />
      <Input label="Large — 40px" placeholder="Text input" size="large" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Input label="Padrão" placeholder="Text input" />
      <Input defaultValue="Filled" label="Preenchido" />
      <Input error="Informe um e-mail válido." label="Erro" type="email" />
      <Input disabled label="Desabilitado vazio" placeholder="Disabled" />
      <Input defaultValue="Disabled" disabled label="Desabilitado preenchido" />
      <Input defaultValue="Somente leitura" label="Leitura" readOnly />
    </div>
  ),
}

export const Clearable: Story = {
  args: { clearable: true, defaultValue: 'Texto inicial', clearLabel: 'Limpar nome' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Nome' })
    await userEvent.click(input)
    await userEvent.tab()
    const clear = canvas.getByRole('button', { name: 'Limpar nome' })
    await expect(getComputedStyle(clear, '::before').maskImage).not.toBe('none')
    await expect(clear).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await expect(input).toHaveValue('')
    await expect(input).toHaveFocus()
  },
}

export const Controlled: Story = {
  render: function ControlledField(args) {
    const [value, setValue] = useState('Liz')
    return (
      <Input
        {...args}
        clearable
        onChange={(event) => setValue(event.target.value)}
        onClear={() => setValue('')}
        value={value}
      />
    )
  },
}

export const LongMessages: Story = {
  args: {
    label: 'Nome completo da pessoa responsável pelo cadastro e pelas atualizações da conta',
    helpText: 'Informe o nome como deseja que apareça nas comunicações enviadas pelo sistema.',
    error:
      'Confira o valor informado antes de continuar e preencha o nome completo da pessoa responsável.',
  },
}

export const Form: Story = {
  render: function ExampleForm() {
    const [result, setResult] = useState('')
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          setResult(`${data.get('name')}: ${data.has('news') ? 'inscrito' : 'sem novidades'}`)
        }}
        style={{ display: 'grid', gap: 16 }}
      >
        <Input label="Nome" name="name" required />
        <Checkbox label="Receber novidades" name="news" />
        <Button type="submit" variant="outline">
          Salvar
        </Button>
        <Text role="status">{result}</Text>
      </form>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: 'Nome' })
    await userEvent.type(input, 'Liz')
    await userEvent.tab()
    await expect(canvas.getByRole('checkbox')).toHaveFocus()
    await userEvent.keyboard(' ')
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Salvar' })).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await expect(canvas.getByRole('status')).toHaveTextContent('Liz: inscrito')
  },
}
