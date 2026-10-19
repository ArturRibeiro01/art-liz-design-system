import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Tag } from './Tag'
import { fn } from 'storybook/test'

const meta = {
  title: 'Data Display/Tag',
  component: Tag,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Tag>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Design', onRemove: fn() },
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Remover Design' }))
    await expect(args.onRemove).toHaveBeenCalledOnce()
  },
}
export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {(['neutral', 'primary', 'success', 'danger', 'info', 'warning'] as const).map((intent) => (
        <Tag intent={intent} key={intent}>
          {intent}
        </Tag>
      ))}
    </div>
  ),
}
