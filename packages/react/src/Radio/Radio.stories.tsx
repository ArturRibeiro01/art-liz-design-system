import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Radio } from './Radio'

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Radio>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <fieldset style={{ border: 0, display: 'grid', gap: 12 }}>
      <legend>Plano</legend>
      <Radio label="Pessoal" name="plan" value="personal" defaultChecked />
      <Radio label="Equipe" name="plan" value="team" />
      <Radio label="Indisponível" name="plan" disabled />
    </fieldset>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('radio', { name: 'Pessoal' }))
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('radio', { name: 'Equipe' })).toBeChecked()
  },
}
export const Disabled: Story = {
  args: { label: 'Indisponível', disabled: true, defaultChecked: true },
}
