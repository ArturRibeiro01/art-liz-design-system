import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { Link } from './Link'

const meta = {
  title: 'Navigation/Link',
  component: Link,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Link>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { href: '#documentacao', children: 'Leia a documentação' },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link')
    await expect(link).toHaveAttribute('href', '#documentacao')
  },
}
export const External: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    children: 'Abrir referência em outra aba',
  },
}
