import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Dialog } from './Dialog'
import { useState, StrictMode } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Radio } from '../Radio'

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  args: { open: false, title: 'Diálogo', onClose: () => undefined },
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Dialog>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Modal() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Abrir diálogo
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Editar perfil"
          description="Atualize seu nome."
        >
          <Input label="Nome" />
        </Dialog>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Abrir diálogo' })
    await userEvent.click(trigger)
    await waitFor(() => expect(canvas.getByRole('dialog', { name: 'Editar perfil' })).toBeVisible())
    await userEvent.tab()
    await expect(canvas.getByRole('textbox', { name: 'Nome' })).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Fechar diálogo' })).toHaveFocus()
    await userEvent.tab({ shift: true })
    await expect(canvas.getByRole('textbox', { name: 'Nome' })).toHaveFocus()
    await userEvent.click(canvas.getByRole('button', { name: 'Fechar diálogo' }))
    await expect(canvas.queryByRole('dialog')).toBeNull()
    await expect(trigger).toHaveFocus()
  },
}
export const InitiallyOpen: Story = {
  render: function Initial() {
    const [open, setOpen] = useState(true)
    return (
      <StrictMode>
        <Dialog open={open} onClose={() => setOpen(false)} title="Diálogo inicial">
          Permanece aberto em StrictMode.
        </Dialog>
      </StrictMode>
    )
  },
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(within(canvasElement).getByRole('dialog', { name: 'Diálogo inicial' })).toBeVisible(),
    )
  },
}

export const RadioGroupFocus: Story = {
  render: function RadioModal() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Escolher plano
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} title="Plano">
          <Radio label="Pessoal" name="modal-plan" defaultChecked />
          <Radio label="Equipe" name="modal-plan" />
        </Dialog>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Escolher plano' }))
    await userEvent.tab()
    await expect(canvas.getByRole('radio', { name: 'Pessoal' })).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Fechar diálogo' })).toHaveFocus()
    await userEvent.click(canvas.getByRole('button', { name: 'Fechar diálogo' }))
  },
}
