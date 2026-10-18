import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { FilterItem } from './FilterItem'
const meta = {
  title: 'Data Display/FilterItem',
  component: FilterItem,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Base funcional pelos tokens atuais, seguindo o inventário TapTap. Referência detalhada e comparação visual com o Figma pendentes.',
      },
    },
  },
} satisfies Meta<typeof FilterItem>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Ativos' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Ativos' })
    button.focus()
    await userEvent.keyboard(' ')
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await userEvent.keyboard('{Enter}')
    await expect(button).toHaveAttribute('aria-pressed', 'false')
  },
}
export const Selected: Story = { args: { children: 'Arquivados', defaultSelected: true } }
export const Disabled: Story = { args: { children: 'Indisponível', disabled: true } }
