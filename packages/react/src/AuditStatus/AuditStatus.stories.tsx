import type { Meta, StoryObj } from '@storybook/react-vite'

import { AuditStatus } from './AuditStatus'
const meta = {
  title: 'Feedback/AuditStatus',
  component: AuditStatus,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Base funcional pelos tokens atuais, seguindo o inventário TapTap. Referência detalhada e comparação visual com o Figma pendentes.',
      },
    },
  },
} satisfies Meta<typeof AuditStatus>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Aguardando revisão', intent: 'warning' } }
export const Approved: Story = { args: { children: 'Aprovado', intent: 'success' } }
export const Rejected: Story = { args: { children: 'Rejeitado', intent: 'danger' } }
