import { colors } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from './Container'
import { containerBackgroundOptions } from './Container.style'

const spacingOptions = [1, 2, 3, 4, 6, 8] as const

const meta = {
  title: 'Layout/Container',
  component: Container,
  argTypes: {
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    background: { control: 'select', options: containerBackgroundOptions },
    padding: { control: 'select', options: spacingOptions },
    margin: { control: 'select', options: ['auto', ...spacingOptions] },
  },
  args: { maxWidth: 'xl', background: 'primary.50', padding: 4, margin: 'auto' },
  render: ({ maxWidth, background, padding, margin }) => (
    <div
      style={{
        background: colors.neutral[100],
        minHeight: 480,
        paddingBlock: 32,
        width: '100%',
      }}
    >
      <Container
        background={background}
        margin={margin}
        maxWidth={maxWidth}
        padding={padding}
        style={{
          border: `2px dashed ${colors.primary[600]}`,
          minHeight: 416,
        }}
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <strong>Container maxWidth: {maxWidth}</strong>
          <p style={{ margin: 0 }}>
            A área destacada mostra a largura máxima selecionada. Em telas menores, o container
            continua fluido e mantém gutters laterais.
          </p>
        </div>
      </Container>
    </div>
  ),
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
