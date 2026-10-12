import { motion } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TokenPage, TokenSection, TokenTable } from './TokenDocs'

type DurationToken = keyof typeof motion.durations
type EasingToken = keyof typeof motion.easings

interface MotionStoryArgs {
  active: boolean
  distance: number
  durationToken: DurationToken
  easingToken: EasingToken
  onPreviewClick?: (message: string) => void
}

function MotionPage({
  active,
  distance,
  durationToken,
  easingToken,
  onPreviewClick,
}: MotionStoryArgs) {
  return (
    <TokenPage title="Motion" description="Durações e curvas para transições simples de interface.">
      <TokenSection title="Playground">
        <div style={{ background: '#fafafa', borderRadius: '8px', padding: '24px' }}>
          <button
            onClick={() => onPreviewClick?.(`${durationToken} / ${easingToken} / ${distance}px`)}
            style={{
              background: '#00a3b6',
              border: 0,
              borderRadius: '8px',
              cursor: 'pointer',
              height: '56px',
              transform: active ? `translateX(${distance}px)` : 'translateX(0)',
              transition: `transform ${motion.durations[durationToken]} ${motion.easings[easingToken]}`,
              width: '56px',
            }}
            type="button"
          />
        </div>
      </TokenSection>
      <TokenSection title="Durations">
        <TokenTable
          rows={Object.entries(motion.durations).map(([name, value]) => ({ name, value }))}
        />
      </TokenSection>
      <TokenSection title="Easings">
        <TokenTable
          rows={Object.entries(motion.easings).map(([name, value]) => ({ name, value }))}
        />
      </TokenSection>
    </TokenPage>
  )
}

const meta = {
  title: 'Tokens/Motion',
  component: MotionPage,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    active: { control: 'boolean' },
    distance: { control: { type: 'range', min: 0, max: 240, step: 8 } },
    durationToken: { control: 'select', options: Object.keys(motion.durations) },
    easingToken: { control: 'select', options: Object.keys(motion.easings) },
    onPreviewClick: { action: 'motion preview clicked' },
  },
} satisfies Meta<typeof MotionPage>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  args: {
    active: true,
    distance: 120,
    durationToken: 'slow',
    easingToken: 'standard',
  },
}
