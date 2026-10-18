import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Transfer } from './Transfer'
const meta = {
  title: 'Forms/Transfer',
  component: Transfer,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Base funcional pelos tokens atuais, seguindo o inventário TapTap. Referência detalhada e comparação visual com o Figma pendentes.',
      },
    },
  },
} satisfies Meta<typeof Transfer>
export default meta
type Story = StoryObj<typeof meta>

const items = [
  { id: 'a', label: 'Button' },
  { id: 'b', label: 'Input' },
  { id: 'c', label: 'Checkbox' },
  { id: 'd', label: 'Reservado', disabled: true },
]
export const Default: Story = {
  args: { label: 'Componentes do projeto', items, defaultTargetKeys: ['c'] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const source = within(canvas.getByRole('group', { name: 'Disponíveis (3)' }))
    await userEvent.click(source.getByRole('checkbox', { name: 'Button' }))
    await userEvent.click(canvas.getByRole('button', { name: 'Adicionar selecionados' }))
    const target = within(canvas.getByRole('group', { name: 'Selecionados (2)' }))
    await expect(target.getByRole('checkbox', { name: 'Button' })).toBeInTheDocument()
    await userEvent.type(canvas.getByRole('searchbox', { name: 'Buscar em Disponíveis' }), 'Reser')
    await expect(canvas.getByRole('checkbox', { name: 'Reservado' })).toBeDisabled()
  },
}
export const Empty: Story = { args: { label: 'Sem itens', items: [] } }
export const Disabled: Story = { args: { label: 'Componentes', items, disabled: true } }
