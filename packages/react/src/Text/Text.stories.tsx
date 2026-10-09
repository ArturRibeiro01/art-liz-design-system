import { colors, typography } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text'
import { textColorTokens } from './Text.style'

const textVariants = Object.keys(typography.textStyles) as Array<keyof typeof typography.textStyles>
const textWeights = Object.keys(typography.fontWeights) as Array<
  keyof typeof typography.fontWeights
>
const textColors = Object.keys(textColorTokens)
const toPixels = (value: string) => `${Number.parseFloat(value) * 16}px`

const meta = {
  title: 'Typography/Text',
  component: Text,
  argTypes: {
    variant: { control: 'select', options: textVariants },
    weight: { control: 'select', options: textWeights },
    color: { control: 'select', options: textColors },
    fontFamily: {
      control: 'text',
      description: 'Use component, sans, mono ou informe uma stack CSS personalizada.',
    },
    as: { control: 'select', options: ['p', 'span', 'h1', 'h2', 'h3', 'div'] },
  },
  args: {
    children: 'Texto de exemplo do Design System',
    color: 'neutral.900',
    fontFamily: 'component',
    variant: 'body',
    weight: 'regular',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const TypeScale: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {textVariants.map((variant) => (
        <div
          key={variant}
          style={{
            alignItems: 'baseline',
            borderBottom: `1px solid ${colors.neutral[200]}`,
            display: 'grid',
            gap: 24,
            gridTemplateColumns: '100px 1fr 120px',
            paddingBlock: 12,
          }}
        >
          <code>{variant}</code>
          <Text as="div" variant={variant}>
            O texto segue a escala tipográfica do design system.
          </Text>
          <code>
            {toPixels(typography.textStyles[variant].fontSize)} /{' '}
            {toPixels(typography.textStyles[variant].lineHeight)}
          </code>
        </div>
      ))}
    </div>
  ),
}

export const Playground: Story = {}
