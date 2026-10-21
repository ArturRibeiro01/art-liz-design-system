import type { Meta, StoryObj } from '@storybook/react-vite'

import { Result } from './Result'
const meta = {
  title: 'Feedback/Result',
  component: Result,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Base funcional pelos tokens atuais, seguindo o inventário TapTap. Referência detalhada e comparação visual com o Figma pendentes.',
      },
    },
  },
} satisfies Meta<typeof Result>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Tudo pronto',
    description: 'As alterações foram salvas com sucesso.',
    intent: 'success',
  },
}
export const Empty: Story = {
  args: {
    title: 'Nenhum resultado',
    description: 'Ajuste os filtros e tente novamente.',
    intent: 'neutral',
  },
}
export const Error: Story = {
  args: {
    title: 'Não foi possível concluir',
    description: 'Confira sua conexão e tente novamente.',
    intent: 'danger',
  },
}
