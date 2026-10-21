import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumb>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Início', href: '#inicio' },
      { label: 'Projetos', href: '#projetos' },
      { label: 'Design system' },
    ],
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Design system')).toHaveAttribute(
      'aria-current',
      'page',
    )
  },
}
