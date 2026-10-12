import { spacing } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, TokenSection, TokenTable } from './TokenDocs'

type SpacingToken = keyof typeof spacing

interface SpacingStoryArgs {
  gapToken: SpacingToken
  paddingToken: SpacingToken
  itemSize: number
  onPreviewClick?: (message: string) => void
}

function SpacingPage({ gapToken, paddingToken, itemSize, onPreviewClick }: SpacingStoryArgs) {
  return (
    <TokenPage
      title="Spacing"
      description="Escala de espaçamento compartilhada para paddings, gaps e ritmos internos."
    >
      <TokenSection title="Playground">
        <div
          style={{
            background: '#fafafa',
            borderRadius: '8px',
            display: 'flex',
            gap: spacing[gapToken],
            padding: spacing[paddingToken],
          }}
        >
          {['#00a3b6', '#47cfd6', '#b0ebec'].map((background) => (
            <button
              key={background}
              onClick={() =>
                onPreviewClick?.(`gap=${String(gapToken)} padding=${String(paddingToken)}`)
              }
              style={{
                background,
                border: 0,
                borderRadius: '4px',
                cursor: 'pointer',
                height: `${itemSize}px`,
                width: `${itemSize}px`,
              }}
              type="button"
            />
          ))}
        </div>
      </TokenSection>
      <TokenSection title="Tokens">
        <TokenTable
          rows={Object.entries(spacing).map(([name, value]) => ({
            name,
            value,
            preview: (
              <div
                style={{ background: '#00a3b6', borderRadius: '4px', height: '12px', width: value }}
              />
            ),
          }))}
        />
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Spacing',
  component: SpacingPage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    gapToken: { control: 'select', options: Object.keys(spacing) },
    paddingToken: { control: 'select', options: Object.keys(spacing) },
    itemSize: { control: { type: 'range', min: 24, max: 96, step: 4 } },
    onPreviewClick: { action: 'spacing preview clicked' },
  },
} satisfies Meta<typeof SpacingPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    gapToken: 4,
    itemSize: 48,
    paddingToken: 6,
  },
}
