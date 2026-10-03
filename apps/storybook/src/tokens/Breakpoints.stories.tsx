import { breakpoints } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlock, TokenPage, TokenSection, TokenTable } from './TokenDocs'

type BreakpointToken = keyof typeof breakpoints

interface BreakpointsStoryArgs {
  breakpointToken: BreakpointToken
  containerWidth: number
  onPreviewClick?: (message: string) => void
}

function parsePx(value: string) {
  return Number(value.replace('px', ''))
}

function BreakpointsPage({
  breakpointToken,
  containerWidth,
  onPreviewClick,
}: BreakpointsStoryArgs) {
  const breakpoint = breakpoints[breakpointToken]
  const isWide = containerWidth >= parsePx(breakpoint)

  return (
    <TokenPage
      title="Breakpoints"
      description="Pontos de quebra para compor layouts responsivos em produtos consumidores."
    >
      <TokenSection
        title="Playground"
        description="Mude a largura do container nos Controls para ver quando o layout passa do breakpoint escolhido."
      >
        <button
          onClick={() => onPreviewClick?.(`${containerWidth}px / ${breakpointToken}=${breakpoint}`)}
          style={{
            background: '#fafafa',
            border: '1px solid #eeeeee',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'grid',
            gap: '12px',
            gridTemplateColumns: isWide ? '160px 1fr' : '1fr',
            maxWidth: `${containerWidth}px`,
            padding: '16px',
            textAlign: 'left',
            width: '100%',
          }}
          type="button"
        >
          <strong>{isWide ? 'Layout amplo' : 'Layout compacto'}</strong>
          <span>
            Container {containerWidth}px / breakpoint {breakpointToken}: {breakpoint}
          </span>
        </button>
      </TokenSection>
      <TokenSection title="Uso">
        <CodeBlock>{`@media (min-width: ${breakpoint}) {
  .layout {
    grid-template-columns: 240px 1fr;
  }
}`}</CodeBlock>
      </TokenSection>
      <TokenSection title="Tokens">
        <TokenTable rows={Object.entries(breakpoints).map(([name, value]) => ({ name, value }))} />
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Breakpoints',
  component: BreakpointsPage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    breakpointToken: { control: 'select', options: Object.keys(breakpoints) },
    containerWidth: { control: { type: 'range', min: 320, max: 1440, step: 16 } },
    onPreviewClick: { action: 'breakpoint preview clicked' },
  },
} satisfies Meta<typeof BreakpointsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    breakpointToken: 'sm',
    containerWidth: 352,
  },
}
