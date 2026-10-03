import { colorCssVariables, colorValues, colors } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'
import { CodeBlock, TokenPage, TokenSection } from './TokenDocs'

const colorFamilies = [
  'neutral',
  'primary',
  'auxiliary',
  'danger',
  'warning',
  'success',
  'info',
] as const
const colorTones = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

type ColorFamily = (typeof colorFamilies)[number]
type ColorTone = (typeof colorTones)[number]

interface ColorsStoryArgs {
  family: ColorFamily
  tone: ColorTone
  customColor: string
  onPreviewClick?: (message: string) => void
}

function swatchTextColor(tone: ColorTone) {
  return tone >= 500 ? colorValues.white : colorValues.neutral[700]
}

function ColorScale({ family }: { family: ColorFamily }) {
  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      <h3 style={{ fontSize: '18px', margin: 0, textTransform: 'capitalize' }}>{family}</h3>
      <div
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: 'repeat(10, minmax(80px, 1fr))',
        }}
      >
        {colorTones.map((tone) => (
          <div key={tone} style={{ display: 'grid', gap: '6px' }}>
            <div
              style={{
                alignItems: 'end',
                aspectRatio: '1.35',
                background: colors[family][tone],
                border: `1px solid ${colorValues.neutral[200]}`,
                borderRadius: '8px',
                color: swatchTextColor(tone),
                display: 'flex',
                fontSize: '12px',
                fontWeight: 600,
                padding: '8px',
              }}
            >
              {tone}
            </div>
            <code style={{ color: colorValues.neutral[600], fontSize: '12px' }}>
              {colorValues[family][tone]}
            </code>
          </div>
        ))}
      </div>
    </div>
  )
}

function ColorsPage({ family, tone, customColor, onPreviewClick }: ColorsStoryArgs) {
  const overrideStyle = {
    [colorCssVariables[family][tone]]: customColor,
  } as CSSProperties & Record<string, string>
  const selectedColor = colors[family][tone]

  return (
    <TokenPage
      title="Colors"
      description="Escalas de cor de 50 a 900. Os valores exportados por colors usam CSS custom properties com fallback, então cada token pode ser sobrescrito pelo produto consumidor."
    >
      <TokenSection
        title="Como trocar cores"
        description="Troque um token específico definindo a variável CSS correspondente. Para trocar uma família inteira, defina todos os tons dessa família no tema do produto."
      >
        <CodeBlock>{`:root {
  --art-liz-color-primary-50: #faf5ff;
  --art-liz-color-primary-500: #a855f7;
  --art-liz-color-primary-700: #7e22ce;
}`}</CodeBlock>
      </TokenSection>

      <TokenSection
        title="Playground"
        description="Escolha uma família e um tom nos Controls para simular a troca de qualquer token de cor."
      >
        <div
          style={{
            ...overrideStyle,
            background: selectedColor,
            border: `1px solid ${colors.neutral[400]}`,
            borderRadius: '8px',
            color: tone >= 500 ? colorValues.white : colorValues.neutral[700],
            display: 'grid',
            gap: '8px',
            padding: '24px',
          }}
        >
          <strong>
            {family}.{tone} customizado por CSS variables
          </strong>
          <span>Valor aplicado: {customColor}</span>
          <button
            onClick={() => onPreviewClick?.(`${family}.${tone} = ${customColor}`)}
            style={{
              background: tone >= 500 ? colorValues.white : colorValues.neutral[700],
              border: 0,
              borderRadius: '4px',
              color: tone >= 500 ? colorValues.neutral[700] : colorValues.white,
              cursor: 'pointer',
              justifySelf: 'start',
              padding: '8px 12px',
            }}
            type="button"
          >
            Registrar troca
          </button>
        </div>
      </TokenSection>

      <TokenSection title="Escalas">
        <div style={{ display: 'grid', gap: '28px', overflowX: 'auto' }}>
          {colorFamilies.map((family) => (
            <ColorScale key={family} family={family} />
          ))}
        </div>
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Colors',
  component: ColorsPage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    family: { control: 'select', options: colorFamilies },
    tone: { control: 'select', options: colorTones },
    customColor: { control: 'color' },
    onPreviewClick: { action: 'color token preview clicked' },
  },
} satisfies Meta<typeof ColorsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    customColor: '#a855f7',
    family: 'primary',
    tone: 200,
  },
}
