import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Actions/Button',
  component: Button,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Primary action', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Secondary action', variant: 'secondary' },
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}