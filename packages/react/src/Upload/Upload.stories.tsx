import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Upload } from './Upload'

const meta = {
  title: 'Forms/Upload',
  component: Upload,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Upload>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Comprovante',
    accept: '.pdf',
    helpText: 'Selecione um PDF. O componente não envia arquivos.',
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText('Comprovante') as HTMLInputElement
    await userEvent.upload(
      input,
      new File(['documento'], 'documento.pdf', { type: 'application/pdf' }),
    )
    await expect(input.files?.[0]?.name).toBe('documento.pdf')
  },
}
export const Multiple: Story = { args: { label: 'Imagens', multiple: true, accept: 'image/*' } }
