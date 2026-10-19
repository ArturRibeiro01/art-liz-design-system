import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Alert } from './Alert'
import { useRef, useState } from 'react'
import { Button } from '../Button'
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

export const OpenAndClose: Story = {
  name: 'Abrir e fechar',
  render: function AlertDemo() {
    const [open, setOpen] = useState(false)
    const trigger = useRef<HTMLButtonElement | null>(null)
    return (
      <div style={{ display: 'grid', gap: 16, maxWidth: 480 }}>
        <Button
          variant="ghost"
          onClick={(event) => {
            trigger.current = event.currentTarget
            setOpen(true)
          }}
        >
          Mostrar aviso
        </Button>
        <Alert
          open={open}
          title="Preferências atualizadas"
          intent="success"
          onDismiss={() => {
            setOpen(false)
            trigger.current?.focus()
          }}
        >
          Suas preferências foram salvas. Feche e abra novamente para observar a transição.
        </Alert>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Mostrar aviso' })
    await expect(canvas.queryByRole('status')).toBeNull()
    await userEvent.click(trigger)
    await waitFor(() => expect(canvas.getByRole('status')).toBeVisible())
    await userEvent.click(canvas.getByRole('button', { name: 'Fechar aviso' }))
    await expect(canvas.queryByRole('status')).toBeNull()
    await expect(trigger).toHaveFocus()
    await userEvent.click(trigger)
    await waitFor(() => expect(canvas.getByRole('status')).toBeVisible())
  },
}
