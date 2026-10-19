import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'

const meta = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Tooltip>
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tooltip content="Salva as alterações do projeto.">
      <button type="button">Salvar projeto</button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button')
    trigger.focus()
    await waitFor(async () => expect(await canvas.findByRole('tooltip')).toBeVisible())
    await expect(trigger).toHaveAccessibleDescription('Salva as alterações do projeto.')
    await userEvent.keyboard('{Escape}')
    await expect(canvas.queryByRole('tooltip')).toBeNull()
  },
}

export const Intents: Story = {
  name: 'Intents',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: '48px 8px' }}>
      {(['neutral', 'primary', 'success', 'danger', 'info', 'warning'] as const).map((intent) => (
        <Tooltip key={intent} intent={intent} content={`Informação complementar: ${intent}.`}>
          <Button variant="ghost">{intent}</Button>
        </Tooltip>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const intent of ['neutral', 'primary', 'success', 'danger', 'info', 'warning']) {
      const trigger = canvas.getByRole('button', { name: intent })
      trigger.focus()
      await expect(await canvas.findByRole('tooltip')).toHaveTextContent(
        `Informação complementar: ${intent}.`,
      )
      await userEvent.keyboard('{Escape}')
      await expect(canvas.queryByRole('tooltip')).toBeNull()
    }
  },
}
