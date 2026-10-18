import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Tooltip } from './Tooltip'

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
    await expect(await canvas.findByRole('tooltip')).toBeVisible()
    await expect(trigger).toHaveAccessibleDescription('Salva as alterações do projeto.')
    await userEvent.keyboard('{Escape}')
    await expect(canvas.queryByRole('tooltip')).toBeNull()
  },
}
