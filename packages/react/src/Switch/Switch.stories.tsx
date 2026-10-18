import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Switch } from './Switch'

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Ativar notificações' },
  play: async ({ canvasElement }) => {
    const control = within(canvasElement).getByRole('switch')
    await userEvent.click(control)
    await expect(control).toBeChecked()
    await userEvent.keyboard(' ')
    await expect(control).not.toBeChecked()
  },
}
export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Switch label="Ativado" defaultChecked />
      <Switch label="Desativado" />
      <Switch label="Desabilitado" disabled />
      <Switch label="Ativado desabilitado" defaultChecked disabled />
    </div>
  ),
}
