import { radii } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, TokenSection, TokenTable } from './TokenDocs'

type RadiusToken = keyof typeof radii

interface RadiiStoryArgs {
  radiusToken: RadiusToken
  previewHeight: number
  previewWidth: number
  onPreviewClick?: (message: string) => void
}

function RadiiPage({ radiusToken, previewHeight, previewWidth, onPreviewClick }: RadiiStoryArgs) {
  return (
    <TokenPage
      title="Radii"
      description="Raios de borda para controles, superfícies e elementos totalmente arredondados."
    >
      <TokenSection title="Playground">
        <button
          onClick={() => onPreviewClick?.(`radius=${radiusToken}`)}
          style={{
            background: '#dff7f7',
            border: '1px solid #47cfd6',
            borderRadius: radii[radiusToken],
            cursor: 'pointer',
            height: `${previewHeight}px`,
            width: `${previewWidth}px`,
          }}
          type="button"
        />
      </TokenSection>
      <TokenSection title="Tokens">
        <TokenTable
          rows={Object.entries(radii).map(([name, value]) => ({
            name,
            value,
            preview: (
              <div
                style={{
                  background: '#dff7f7',
                  border: '1px solid #47cfd6',
                  borderRadius: value,
                  height: '48px',
                  width: '96px',
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
  title: 'Tokens/Radii',
  component: RadiiPage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    radiusToken: { control: 'select', options: Object.keys(radii) },
    previewHeight: { control: { type: 'range', min: 32, max: 120, step: 4 } },
    previewWidth: { control: { type: 'range', min: 64, max: 240, step: 8 } },
    onPreviewClick: { action: 'radii preview clicked' },
  },
} satisfies Meta<typeof RadiiPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    previewHeight: 64,
    previewWidth: 160,
    radiusToken: 'medium',
  },
}
