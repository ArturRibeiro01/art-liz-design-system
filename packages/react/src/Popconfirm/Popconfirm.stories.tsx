import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, fn } from 'storybook/test'
import { Popconfirm } from './Popconfirm'
const meta = {
  title: 'Feedback/Popconfirm',
  component: Popconfirm,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Base funcional pelos tokens atuais, seguindo o inventário TapTap. Referência detalhada e comparação visual com o Figma pendentes.',
      },
    },
  },
} satisfies Meta<typeof Popconfirm>
export default meta
type Story = StoryObj<typeof meta>

const confirm = fn()
export const Default: Story = {
  args: {
    trigger: 'Excluir item',
    title: 'Excluir este item?',
    description: 'Esta ação remove o item da lista.',
    intent: 'danger',
    onConfirm: confirm,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Excluir item' })
    await userEvent.click(trigger)
    await expect(canvas.getByRole('alertdialog')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Cancelar' })).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await expect(trigger).toHaveFocus()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    await userEvent.click(canvas.getByRole('button', { name: 'Confirmar' }))
    await expect(confirm).toHaveBeenCalledOnce()
    await expect(trigger).toHaveFocus()
  },
}
export const Disabled: Story = {
  args: { trigger: 'Excluir item', title: 'Excluir este item?', onConfirm: fn(), disabled: true },
}

export const Open: Story = {
  args: {
    trigger: 'Excluir item',
    title: 'Excluir este item?',
    description: 'Esta ação remove o item da lista.',
    intent: 'danger',
    onConfirm: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Excluir item' }))
    await userEvent.hover(canvas.getByRole('button', { name: 'Confirmar' }))
    await expect(canvas.getByRole('alertdialog')).toBeVisible()
  },
}
