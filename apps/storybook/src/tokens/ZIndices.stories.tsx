import { zIndices } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, TokenSection, TokenTable } from './TokenDocs'

type ZIndexToken = keyof typeof zIndices

interface ZIndicesStoryArgs {
  selectedLayer: ZIndexToken
  overlapStep: number
  onPreviewClick?: (message: string) => void
}

function ZIndicesPage({ selectedLayer, overlapStep, onPreviewClick }: ZIndicesStoryArgs) {
  return (
    <TokenPage
      title="Z-index"
      description="Camadas nomeadas para overlays, modais, menus e notificações."
    >
      <TokenSection title="Playground">
        <div style={{ height: '120px', position: 'relative' }}>
          {Object.entries(zIndices).map(([name, value], index) => {
            const isSelected = name === selectedLayer

            return (
              <button
                key={name}
                onClick={() => onPreviewClick?.(`${name}=${value}`)}
                style={{
                  alignItems: 'center',
                  background: isSelected ? '#00a3b6' : index % 2 === 0 ? '#b0ebec' : '#47cfd6',
                  border: isSelected ? '2px solid #00697a' : '1px solid #00a3b6',
                  borderRadius: '8px',
                  color: isSelected ? '#ffffff' : '#1f1f1f',
                  cursor: 'pointer',
                  display: 'flex',
                  height: '72px',
                  justifyContent: 'center',
                  left: `${index * overlapStep}px`,
                  position: 'absolute',
                  top: `${index * 10}px`,
                  width: '120px',
                  zIndex: isSelected ? zIndices[selectedLayer] + 1 : value,
                }}
                type="button"
              >
                {name}
              </button>
            )
          })}
        </div>
      </TokenSection>
      <TokenSection title="Tokens">
        <TokenTable rows={Object.entries(zIndices).map(([name, value]) => ({ name, value }))} />
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Z-index',
  component: ZIndicesPage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    overlapStep: { control: { type: 'range', min: 16, max: 80, step: 4 } },
    selectedLayer: { control: 'select', options: Object.keys(zIndices) },
    onPreviewClick: { action: 'z-index preview clicked' },
  },
} satisfies Meta<typeof ZIndicesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    overlapStep: 36,
    selectedLayer: 'modal',
  },
}
