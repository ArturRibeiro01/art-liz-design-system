import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box } from './Box'

const meta = {
  title: 'Layout/Box',
  component: Box,
  argTypes: {
    padding: { control: 'select', options: [1, 2, 3, 4, 6, 8] },
    background: { control: 'inline-radio', options: ['transparent', 'white', 'neutral'] },
    borderRadius: { control: 'select', options: ['small', 'medium', 'pill'] },
    shadow: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
  args: {
    background: 'white',
    borderRadius: 'small',
    children: 'Conteúdo do Box',
    padding: 4,
    shadow: 'sm',
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Surfaces: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
      <Box background="white" borderRadius="small" padding={4} shadow="sm">
        White
      </Box>
      <Box background="neutral" borderRadius="medium" padding={4}>
        Neutral
      </Box>
      <Box background="transparent" borderRadius="small" padding={4}>
        Transparent
      </Box>
    </div>
  ),
}
