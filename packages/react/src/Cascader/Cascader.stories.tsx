import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Cascader } from './Cascader'
const meta = {
  title: 'Forms/Cascader',
  component: Cascader,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Base funcional pelos tokens atuais, seguindo o inventário TapTap. Referência detalhada e comparação visual com o Figma pendentes.',
      },
    },
  },
} satisfies Meta<typeof Cascader>
export default meta
type Story = StoryObj<typeof meta>

const options = [
  {
    value: 'br',
    label: 'Brasil',
    children: [
      {
        value: 'sp',
        label: 'São Paulo',
        children: [
          { value: 'mogi', label: 'Mogi das Cruzes' },
          { value: 'capital', label: 'São Paulo' },
        ],
      },
      { value: 'rj', label: 'Rio de Janeiro', disabled: true },
    ],
  },
  { value: 'pt', label: 'Portugal', children: [{ value: 'lisbon', label: 'Lisboa' }] },
]
export const Default: Story = {
  args: { label: 'Localização', options, helpText: 'Escolha as opções de cada nível.' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Nível 1' }), 'br')
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Nível 2' }), 'sp')
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Nível 3' }), 'mogi')
    await expect(canvas.getByRole('combobox', { name: 'Nível 3' })).toHaveValue('mogi')
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Nível 1' }), 'pt')
    await expect(canvas.queryByRole('combobox', { name: 'Nível 3' })).not.toBeInTheDocument()
  },
}
export const Disabled: Story = {
  args: { label: 'Localização', options, defaultValue: ['br', 'sp', 'mogi'], disabled: true },
}
export const Invalid: Story = {
  args: { label: 'Localização', options, error: 'Escolha uma localização completa.' },
}
