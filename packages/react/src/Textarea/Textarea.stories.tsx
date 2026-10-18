import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Textarea } from './Textarea'

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Textarea>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Mensagem', helpText: 'Descreva sua solicitação.' },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox')
    await userEvent.type(input, 'Primeira linha{Enter}Segunda linha')
    await expect(input).toHaveValue('Primeira linha\nSegunda linha')
  },
}
export const States: Story = {
  render: () => (
    <div style={{ width: 'min(360px,80vw)', display: 'grid', gap: 16 }}>
      <Textarea label="Pequeno" size="small" />
      <Textarea label="Erro" error="Preencha a mensagem." />
      <Textarea label="Leitura" readOnly defaultValue="Mensagem salva" />
      <Textarea label="Desabilitado" disabled />
    </div>
  ),
}
