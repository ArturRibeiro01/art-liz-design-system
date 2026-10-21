import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { Slider } from './Slider'

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Slider>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Volume', min: 0, max: 100, step: 10, defaultValue: 30 },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('slider')
    await expect(input).toHaveAttribute('step', '10')
    await expect(input).toHaveValue('30')
  },
}
export const Disabled: Story = { args: { label: 'Volume fixo', defaultValue: 50, disabled: true } }
