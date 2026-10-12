import { shadows } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, TokenSection, TokenTable } from './TokenDocs'

type ShadowToken = keyof typeof shadows

interface ShadowsStoryArgs {
  shadowToken: ShadowToken
  surfaceColor: string
  onPreviewClick?: (message: string) => void
}

function ShadowsPage({ shadowToken, surfaceColor, onPreviewClick }: ShadowsStoryArgs) {
  return (
    <TokenPage
      title="Shadows"
      description="Sombras para superfícies elevadas. Use com moderação para hierarquia, não como decoração pesada."
    >
      <TokenSection title="Playground">
        <button
          onClick={() => onPreviewClick?.(`shadow=${shadowToken}`)}
          style={{
            background: surfaceColor,
            border: '1px solid #eeeeee',
            borderRadius: '8px',
            boxShadow: shadows[shadowToken],
            cursor: 'pointer',
            height: '96px',
            width: '180px',
          }}
          type="button"
        >
          {shadowToken}
        </button>
      </TokenSection>
      <TokenSection title="Tokens">
        <TokenTable
          rows={Object.entries(shadows).map(([name, value]) => ({
            name,
            value,
            preview: (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: value,
                  height: '56px',
                  width: '120px',
                }}
              />
            ),
          }))}
        />
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Shadows',
  component: ShadowsPage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    shadowToken: { control: 'select', options: Object.keys(shadows) },
    surfaceColor: { control: 'color' },
    onPreviewClick: { action: 'shadow preview clicked' },
  },
} satisfies Meta<typeof ShadowsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    shadowToken: 'md',
    surfaceColor: '#ffffff',
  },
}
