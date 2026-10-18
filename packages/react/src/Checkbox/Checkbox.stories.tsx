import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  args: { label: 'Receber novidades' },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Checkbox nativo baseado no Figma 10:2274: caixa de 16px e marcador indeterminado quadrado de 8px. Use label, aria-label ou label externo para fornecer um nome acessível.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onChange: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('checkbox', { name: 'Receber novidades' })
    await userEvent.click(canvas.getByText('Receber novidades'))
    await expect(input).toBeChecked()
    await userEvent.keyboard(' ')
    await expect(input).not.toBeChecked()
    await expect(args.onChange).toHaveBeenCalledTimes(2)
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Checkbox label="Desmarcado" />
      <Checkbox defaultChecked label="Marcado" />
      <Checkbox indeterminate label="Seleção parcial" />
      <Checkbox disabled label="Desabilitado" />
      <Checkbox defaultChecked disabled label="Marcado desabilitado" />
      <Checkbox indeterminate disabled label="Seleção parcial desabilitada" />
      <Checkbox aria-label="Selecionar item sem texto visível" />
    </div>
  ),
}

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Selecionar todos' },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox')
    await expect(checkbox).toBePartiallyChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await expect(checkbox).not.toBePartiallyChecked()
  },
}

export const ControlledGroup: Story = {
  render: function SelectionGroup() {
    const [selection, setSelection] = useState([true, false])
    const all = selection.every(Boolean)
    const some = selection.some(Boolean)
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <Checkbox
          checked={all}
          indeterminate={some && !all}
          label="Selecionar todos"
          onChange={(event) => setSelection(selection.map(() => event.target.checked))}
        />
        {['Primeiro item', 'Segundo item'].map((label, index) => (
          <Checkbox
            checked={selection[index]}
            key={label}
            label={label}
            onChange={(event) =>
              setSelection(
                selection.map((checked, position) =>
                  position === index ? event.target.checked : checked,
                ),
              )
            }
          />
        ))}
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const all = canvas.getByRole('checkbox', { name: 'Selecionar todos' })
    await expect(all).toBePartiallyChecked()
    await userEvent.click(all)
    for (const checkbox of canvas.getAllByRole('checkbox')) await expect(checkbox).toBeChecked()
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Primeiro item' }))
    await expect(all).toBePartiallyChecked()
  },
}

export const LongLabel: Story = {
  args: {
    label:
      'Quero receber informações sobre atualizações do produto e novidades relacionadas aos serviços que utilizo.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(280px, 80vw)' }}>
        <Story />
      </div>
    ),
  ],
}
