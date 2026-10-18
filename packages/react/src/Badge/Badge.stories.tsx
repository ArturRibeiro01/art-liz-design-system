import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Novo', intent: 'primary' } }
export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {(['neutral', 'primary', 'success', 'danger', 'info', 'warning'] as const).map((intent) => (
        <Badge intent={intent} key={intent}>
          {intent}
        </Badge>
      ))}
    </div>
  ),
}
