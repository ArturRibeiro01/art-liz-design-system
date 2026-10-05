import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ButtonIntent, ButtonVariant } from './Button'
import { Button } from './Button'

const intents: ButtonIntent[] = ['primary', 'danger', 'success', 'info', 'warning']
const variants: ButtonVariant[] = ['primary', 'outline', 'ghost', 'link']

const meta = {
  title: 'Actions/Button',
  component: Button,
  argTypes: {
    intent: { control: 'inline-radio', options: intents },
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary action',
    disabled: false,
    intent: 'primary',
    variant: 'primary',
  },
}

export const Outline: Story = {
  args: { children: 'Outline action', variant: 'outline' },
}

export const Ghost: Story = {
  args: { children: 'Ghost action', variant: 'ghost' },
}

export const Link: Story = {
  args: { children: 'Link action', variant: 'link' },
}

export const VariantMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: 'repeat(4, minmax(120px, 1fr))',
      }}
    >
      {variants.map((variant) => (
        <div key={variant} style={{ display: 'grid', gap: 8 }}>
          <strong>{variant}</strong>
          <Button variant={variant}>Text</Button>
          <Button disabled variant={variant}>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
}

export const IntentMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {intents.map((intent) => (
        <section key={intent} style={{ display: 'grid', gap: 12 }}>
          <strong>{intent}</strong>
          <div
            style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns: 'repeat(4, minmax(120px, 1fr))',
            }}
          >
            {variants.map((variant) => (
              <Button intent={intent} key={`${intent}-${variant}`} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}

export const DisabledIntentMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {intents.map((intent) => (
        <section key={intent} style={{ display: 'grid', gap: 12 }}>
          <strong>{intent}</strong>
          <div
            style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns: 'repeat(4, minmax(120px, 1fr))',
            }}
          >
            {variants.map((variant) => (
              <Button disabled intent={intent} key={`${intent}-${variant}`} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}

export const SizeScale: Story = {
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
}

export const StartIcon: Story = {
  args: { children: 'Text' },
  render: (args) => <Button {...args} startIcon={<span>+</span>} />,
}

export const EndIcon: Story = {
  args: { children: 'Text' },
  render: (args) => <Button {...args} endIcon={<span>+</span>} />,
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}
