import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Alert } from './Alert'
import { fn } from 'storybook/test'

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Atualização disponível',
    children: 'Você pode atualizar suas preferências.',
    onDismiss: fn(),
  },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Fechar aviso' }))
    await expect(args.onDismiss).toHaveBeenCalledOnce()
  },
}
export const Intents: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      {(['neutral', 'primary', 'success', 'danger', 'info', 'warning'] as const).map((intent) => (
        <Alert intent={intent} key={intent} title={intent}>
          Mensagem do sistema.
        </Alert>
      ))}
    </div>
  ),
}
