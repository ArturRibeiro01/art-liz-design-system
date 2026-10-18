import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Drawer } from './Drawer'
import { useState } from 'react'
import { Button } from '../Button'

const meta = {
  title: 'Feedback/Drawer',
  component: Drawer,
  args: { open: false, title: 'Painel', onClose: () => undefined },
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Drawer>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Panel() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Abrir painel
        </Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Detalhes">
          Conteúdo do painel lateral.
        </Drawer>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir painel' }))
    await expect(canvas.getByRole('dialog', { name: 'Detalhes' })).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: 'Fechar diálogo' }))
    await expect(canvas.queryByRole('dialog')).toBeNull()
  },
}
