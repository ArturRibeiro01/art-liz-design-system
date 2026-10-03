import { focus } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlock, TokenPage, TokenSection, TokenTable } from './TokenDocs'

interface FocusStoryArgs {
  ringColor: string
  ringOffset: number
  ringWidth: number
  onPreviewClick?: (message: string) => void
}

function FocusPage({ ringColor, ringOffset, ringWidth, onPreviewClick }: FocusStoryArgs) {
  const outline = `${ringWidth}px ${focus.ringStyle} ${ringColor}`

  return (
    <TokenPage
      title="Focus"
      description="Tokens para indicador de foco visível em componentes interativos."
    >
      <TokenSection title="Playground">
        <button
          onClick={() => onPreviewClick?.(`outline=${outline}`)}
          style={{
            background: '#ffffff',
            border: '1px solid #cacaca',
            borderRadius: '4px',
            cursor: 'pointer',
            outline,
            outlineOffset: `${ringOffset}px`,
            padding: '8px 16px',
          }}
          type="button"
        >
          Focus preview
        </button>
      </TokenSection>
      <TokenSection title="Uso">
        <CodeBlock>{`&:focus-visible {
  outline: ${outline};
  outline-offset: ${ringOffset}px;
}`}</CodeBlock>
      </TokenSection>
      <TokenSection title="Tokens">
        <TokenTable rows={Object.entries(focus).map(([name, value]) => ({ name, value }))} />
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Focus',
  component: FocusPage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    ringColor: { control: 'color' },
    ringOffset: { control: { type: 'range', min: 0, max: 12, step: 1 } },
    ringWidth: { control: { type: 'range', min: 1, max: 8, step: 1 } },
    onPreviewClick: { action: 'focus preview clicked' },
  },
} satisfies Meta<typeof FocusPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    ringColor: '#47cfd6',
    ringOffset: 2,
    ringWidth: 3,
  },
}
