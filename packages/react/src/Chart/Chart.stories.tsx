import type { Meta, StoryObj } from '@storybook/react-vite'

import { Chart } from './Chart'
const meta = {
  title: 'Data Display/Chart',
  component: Chart,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Base funcional pelos tokens atuais, seguindo o inventário TapTap. Referência detalhada e comparação visual com o Figma pendentes.',
      },
    },
  },
} satisfies Meta<typeof Chart>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Componentes por categoria',
    data: [
      { id: 'forms', label: 'Formulários', value: 12 },
      { id: 'navigation', label: 'Navegação', value: 5 },
      { id: 'feedback', label: 'Feedback', value: 8 },
    ],
  },
}
export const NegativeValues: Story = {
  args: {
    title: 'Variação',
    description: 'Valores negativos à esquerda e positivos à direita.',
    data: [
      { id: 'a', label: 'Semana 1', value: -12 },
      { id: 'b', label: 'Semana 2', value: 8 },
      { id: 'c', label: 'Semana 3', value: 0 },
    ],
  },
}
export const Empty: Story = { args: { title: 'Sem resultados', data: [] } }
