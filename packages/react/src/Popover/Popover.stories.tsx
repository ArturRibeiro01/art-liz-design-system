import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Popover } from './Popover'

const meta = {
  title: 'Data Display/Popover',
  component: Popover,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Popover>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: 'Ver detalhes',
    title: 'Detalhes do projeto',
    children: 'Design system em desenvolvimento.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Ver detalhes' })
    await userEvent.click(trigger)
    await waitFor(() => expect(canvas.getByRole('dialog')).toBeVisible())
    await userEvent.keyboard('{Escape}')
    await expect(trigger).toHaveFocus()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  },
}
