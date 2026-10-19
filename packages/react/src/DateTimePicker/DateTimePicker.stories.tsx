import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { DateTimePicker } from './DateTimePicker'
const meta = {
  title: 'Forms/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Base funcional pelos tokens atuais, seguindo o inventário TapTap. Referência detalhada e comparação visual com o Figma pendentes.',
      },
    },
  },
} satisfies Meta<typeof DateTimePicker>
export default meta
type Story = StoryObj<typeof meta>

export const DateAndTime: Story = {
  args: { label: 'Agendamento', name: 'appointment', defaultValue: '2026-10-18T14:30' },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText('Agendamento')
    await expect(input).toHaveValue('2026-10-18T14:30')
  },
}
export const DateOnly: Story = {
  args: { label: 'Data', mode: 'date', min: '2026-01-01', max: '2026-12-31' },
}
export const TimeOnly: Story = {
  args: { label: 'Horário', mode: 'time', defaultValue: '14:30', step: 900 },
}
export const Invalid: Story = {
  args: { label: 'Prazo', mode: 'date', error: 'Escolha uma data disponível.' },
}
export const Disabled: Story = { args: { label: 'Agendamento indisponível', disabled: true } }
