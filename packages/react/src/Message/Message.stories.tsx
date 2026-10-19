import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, fn } from 'storybook/test'
import { Message } from './Message'
const meta = {
  title: 'Feedback/Message',
  component: Message,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Base funcional pelos tokens atuais, seguindo o inventário TapTap. Referência detalhada e comparação visual com o Figma pendentes.',
      },
    },
  },
} satisfies Meta<typeof Message>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Alterações salvas.', intent: 'success' } }
const dismiss = fn()
export const Dismissible: Story = {
  args: { children: 'Confira os dados.', onDismiss: dismiss },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Fechar mensagem' }))
    await expect(dismiss).toHaveBeenCalledOnce()
  },
}
export const Urgent: Story = {
  args: { children: 'Não foi possível salvar. Tente novamente.', intent: 'danger', role: 'alert' },
}
