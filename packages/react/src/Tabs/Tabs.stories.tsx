import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Tabs } from './Tabs'

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Tabs>
export default meta
type Story = StoryObj<typeof meta>

const items = [
  { id: 'account', label: 'Conta', content: 'Dados da conta' },
  { id: 'disabled', label: 'Indisponível', content: 'Oculto', disabled: true },
  { id: 'settings', label: 'Preferências', content: 'Preferências da conta' },
]
export const Default: Story = {
  args: { label: 'Configurações', items },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: 'Conta' }))
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('tab', { name: 'Preferências' })).toHaveFocus()
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Preferências da conta')
    await userEvent.keyboard('{Home}')
    await expect(canvas.getByRole('tab', { name: 'Conta' })).toHaveFocus()
  },
}
export const Vertical: Story = {
  args: { label: 'Configurações verticais', items, orientation: 'vertical' },
}
