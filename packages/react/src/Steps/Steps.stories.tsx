import type { Meta, StoryObj } from '@storybook/react-vite'
import { Steps } from './Steps'

const meta = {
  title: 'Navigation/Steps',
  component: Steps,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Steps>
export default meta
type Story = StoryObj<typeof meta>

const items = [
  { title: 'Identificação', description: 'Dados pessoais' },
  { title: 'Preferências', description: 'Escolha suas opções' },
  { title: 'Confirmação', description: 'Revise os dados' },
]
export const Default: Story = { args: { items, current: 1 } }
export const Vertical: Story = { args: { items, current: 1, orientation: 'vertical' } }
