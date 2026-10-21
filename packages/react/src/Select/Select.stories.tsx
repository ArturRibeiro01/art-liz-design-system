import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Select } from './Select'

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select label="Cidade" defaultValue="" required>
      <option value="">Selecione</option>
      <option value="sp">São Paulo</option>
      <option value="rj">Rio de Janeiro</option>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('combobox')
    await userEvent.selectOptions(input, 'sp')
    await expect(input).toHaveValue('sp')
  },
}
export const Multiple: Story = {
  render: () => (
    <Select label="Interesses" multiple defaultValue={['design']}>
      <option value="design">Design</option>
      <option value="code">Código</option>
      <option disabled value="unavailable">
        Indisponível
      </option>
    </Select>
  ),
}
