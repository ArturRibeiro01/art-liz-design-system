import { typography } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'
import { CodeBlock, TokenPage, TokenSection, TokenTable } from './TokenDocs'

interface TypographyStoryArgs {
  fontFamily: string
  fontSize: keyof typeof typography.fontSizes
  fontWeight: keyof typeof typography.fontWeights
  sampleText: string
  onPreviewClick?: (message: string) => void
}

function TypographyPage({
  fontFamily,
  fontSize,
  fontWeight,
  sampleText,
  onPreviewClick,
}: TypographyStoryArgs) {
  const overrideStyle = {
    [typography.cssVariables.fontFamily]: fontFamily,
  } as CSSProperties & Record<string, string>

  return (
    <TokenPage
      title="Typography"
      description="Tokens de família tipográfica, escala de tamanho, pesos e line-height. Componentes usam uma fonte padrão, mas o projeto consumidor pode trocar a família por CSS variable."
    >
      <TokenSection title="Como trocar a fonte">
        <CodeBlock>{`:root {
  --art-liz-font-family: "Roboto", sans-serif;
}`}</CodeBlock>
      </TokenSection>

      <TokenSection
        title="Font family"
        description="A pilha padrão cobre sistemas operacionais e fallbacks internacionais."
      >
        <TokenTable
          rows={[
            { name: 'sans', value: typography.fontFamilies.sans, preview: <span>Aa 123</span> },
            {
              name: 'component',
              value: typography.fontFamilies.component,
              preview: <span>Aa 123</span>,
            },
            {
              name: 'mono',
              value: typography.fontFamilies.mono,
              preview: <code>const token = true</code>,
            },
          ]}
        />
      </TokenSection>

      <TokenSection
        title="Playground"
        description="Edite o controle fontFamily para simular a fonte de um produto consumidor."
      >
        <div
          style={{
            ...overrideStyle,
            background: '#fafafa',
            border: '1px solid #eeeeee',
            borderRadius: '8px',
            display: 'grid',
            gap: '8px',
            padding: '24px',
          }}
        >
          <strong
            style={{
              fontFamily: typography.fontFamilies.component,
              fontSize: typography.fontSizes[fontSize],
              fontWeight: typography.fontWeights[fontWeight],
            }}
          >
            {sampleText}
          </strong>
          <span style={{ fontFamily: typography.fontFamilies.component }}>
            A biblioteca mantém fallback, mas respeita --art-liz-font-family quando ela existir.
          </span>
          <button
            onClick={() => onPreviewClick?.(`${fontFamily} / ${fontSize} / ${fontWeight}`)}
            style={{
              border: '1px solid #cacaca',
              borderRadius: '4px',
              cursor: 'pointer',
              justifySelf: 'start',
              padding: '8px 12px',
            }}
            type="button"
          >
            Registrar tipografia
          </button>
        </div>
      </TokenSection>

      <TokenSection title="Type scale">
        <TokenTable
          rows={Object.entries(typography.fontSizes).map(([name, value]) => ({
            name,
            value,
            preview: <span style={{ fontSize: value }}>The quick brown fox</span>,
          }))}
        />
      </TokenSection>

      <TokenSection title="Font weight">
        <TokenTable
          rows={Object.entries(typography.fontWeights).map(([name, value]) => ({
            name,
            value,
            preview: <span style={{ fontWeight: value }}>Aa {value}</span>,
          }))}
        />
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Typography',
  component: TypographyPage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    fontFamily: { control: 'text' },
    fontSize: { control: 'select', options: Object.keys(typography.fontSizes) },
    fontWeight: { control: 'select', options: Object.keys(typography.fontWeights) },
    sampleText: { control: 'text' },
    onPreviewClick: { action: 'typography preview clicked' },
  },
} satisfies Meta<typeof TypographyPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '2xl',
    fontWeight: 'semibold',
    sampleText: 'Componentes seguem a fonte do produto',
  },
}
