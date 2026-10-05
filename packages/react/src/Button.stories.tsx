import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus'
import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ButtonIntent, ButtonProps, ButtonVariant } from './Button'
import { Button } from './Button'

const intents: ButtonIntent[] = ['primary', 'danger', 'success', 'info', 'warning']
const variants: ButtonVariant[] = ['primary', 'outline', 'ghost', 'link']
const iconComponents = {
  None: null,
  ArrowRight: ArrowRightIcon,
  Check: CheckIcon,
  Plus: PlusIcon,
  Trash: TrashIcon,
} as const

type ButtonIconName = keyof typeof iconComponents
type ButtonStoryArgs = Omit<ButtonProps, 'startIcon' | 'endIcon'> & {
  startIcon?: ButtonIconName
  endIcon?: ButtonIconName
}

const renderIcon = (iconName?: ButtonIconName) => {
  const Icon = iconName ? iconComponents[iconName] : null
  return Icon ? <Icon size="1em" weight="regular" /> : undefined
}

const meta = {
  title: 'Actions/Button',
  component: Button,
  argTypes: {
    intent: { control: 'inline-radio', options: intents },
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    startIcon: { control: 'select', options: Object.keys(iconComponents) },
    endIcon: { control: 'select', options: Object.keys(iconComponents) },
  },
  args: { startIcon: 'None', endIcon: 'None' },
  render: ({ startIcon, endIcon, ...args }) => (
    <Button {...args} startIcon={renderIcon(startIcon)} endIcon={renderIcon(endIcon)} />
  ),
} satisfies Meta<ButtonStoryArgs>

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
  args: { children: 'Text', startIcon: 'Plus' },
}

export const EndIcon: Story = {
  args: { children: 'Text', endIcon: 'Plus' },
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}
