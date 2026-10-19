import { Icons } from '@art-liz/react'
import { colors, typography } from '@art-liz/tokens'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentType } from 'react'

const weights = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] as const

type IconWeight = (typeof weights)[number]
type FontSizeName = keyof typeof typography.fontSizes
type IconColorMode = 'token' | 'custom'
type IconColorToken = keyof typeof iconColorTokens

type IconComponent = ComponentType<{
  color?: string
  size?: number | string
  weight?: IconWeight
}>

type IconEntry = {
  name: string
  Component: IconComponent
}

type IconGroup = {
  category: string
  icons: IconEntry[]
}

type IconGalleryArgs = {
  colorMode: IconColorMode
  colorToken: IconColorToken
  customColor: string
  iconName: string
  size: FontSizeName
  weight: IconWeight
}

const iconColorTokens = {
  White: colors.white,
  'Primary / 600': colors.primary[600],
  'Danger / 600': colors.danger[600],
  'Success / 600': colors.success[600],
  'Info / 600': colors.info[600],
  'Warning / 700': colors.warning[700],
  'Neutral / 600': colors.neutral[600],
} as const

const iconGroups: IconGroup[] = [
  {
    category: 'Arrows',
    icons: [
      { name: 'ArrowUp', Component: Icons.ArrowUpIcon },
      { name: 'ArrowDown', Component: Icons.ArrowDownIcon },
      { name: 'ArrowLeft', Component: Icons.ArrowLeftIcon },
      { name: 'ArrowRight', Component: Icons.ArrowRightIcon },
      { name: 'ArrowUpRight', Component: Icons.ArrowUpRightIcon },
      { name: 'ArrowLineUp', Component: Icons.ArrowLineUpIcon },
      { name: 'ArrowLineDown', Component: Icons.ArrowLineDownIcon },
      { name: 'ArrowLineLeft', Component: Icons.ArrowLineLeftIcon },
      { name: 'ArrowLineRight', Component: Icons.ArrowLineRightIcon },
      { name: 'ArrowCircleUp', Component: Icons.ArrowCircleUpIcon },
      { name: 'ArrowCircleDown', Component: Icons.ArrowCircleDownIcon },
      { name: 'ArrowCircleLeft', Component: Icons.ArrowCircleLeftIcon },
      { name: 'ArrowCircleRight', Component: Icons.ArrowCircleRightIcon },
      { name: 'ArrowClockwise', Component: Icons.ArrowClockwiseIcon },
      { name: 'ArrowCounterClockwise', Component: Icons.ArrowCounterClockwiseIcon },
      { name: 'ArrowUUpLeft', Component: Icons.ArrowUUpLeftIcon },
      { name: 'ArrowsDownUp', Component: Icons.ArrowsDownUpIcon },
      { name: 'CaretUp', Component: Icons.CaretUpIcon },
      { name: 'CaretDown', Component: Icons.CaretDownIcon },
      { name: 'CaretLeft', Component: Icons.CaretLeftIcon },
      { name: 'CaretRight', Component: Icons.CaretRightIcon },
      { name: 'CaretDoubleUp', Component: Icons.CaretDoubleUpIcon },
      { name: 'CaretDoubleDown', Component: Icons.CaretDoubleDownIcon },
      { name: 'CaretDoubleLeft', Component: Icons.CaretDoubleLeftIcon },
      { name: 'CaretDoubleRight', Component: Icons.CaretDoubleRightIcon },
    ],
  },
  {
    category: 'Base',
    icons: [
      { name: 'Globe', Component: Icons.GlobeIcon },
      { name: 'SpinnerGap', Component: Icons.SpinnerGapIcon },
      { name: 'CalendarBlank', Component: Icons.CalendarBlankIcon },
      { name: 'Paperclip', Component: Icons.PaperclipIcon },
      { name: 'Funnel', Component: Icons.FunnelIcon },
      { name: 'Gear', Component: Icons.GearIcon },
      { name: 'EnvelopeOpen', Component: Icons.EnvelopeOpenIcon },
      { name: 'EnvelopeSimple', Component: Icons.EnvelopeSimpleIcon },
      { name: 'Eye', Component: Icons.EyeIcon },
      { name: 'EyeSlash', Component: Icons.EyeSlashIcon },
      { name: 'LinkSimple', Component: Icons.LinkSimpleIcon },
      { name: 'MagnifyingGlass', Component: Icons.MagnifyingGlassIcon },
      { name: 'Image', Component: Icons.ImageIcon },
      { name: 'File', Component: Icons.FileIcon },
      { name: 'User', Component: Icons.UserIcon },
      { name: 'Code', Component: Icons.CodeIcon },
      { name: 'Cube', Component: Icons.CubeIcon },
      { name: 'Palette', Component: Icons.PaletteIcon },
      { name: 'SquaresFour', Component: Icons.SquaresFourIcon },
    ],
  },
  {
    category: 'Charts',
    icons: [
      { name: 'ChartLine', Component: Icons.ChartLineIcon },
      { name: 'ChartLineUp', Component: Icons.ChartLineUpIcon },
      { name: 'ChartBar', Component: Icons.ChartBarIcon },
      { name: 'ChartPieSlice', Component: Icons.ChartPieSliceIcon },
    ],
  },
  {
    category: 'Edit',
    icons: [
      { name: 'PencilSimple', Component: Icons.PencilSimpleIcon },
      { name: 'Copy', Component: Icons.CopyIcon },
      { name: 'Trash', Component: Icons.TrashIcon },
      { name: 'DotsSixVertical', Component: Icons.DotsSixVerticalIcon },
      { name: 'Star', Component: Icons.StarIcon },
      { name: 'DotsThree', Component: Icons.DotsThreeIcon },
      { name: 'DotsThreeVertical', Component: Icons.DotsThreeVerticalIcon },
    ],
  },
  {
    category: 'Suggest',
    icons: [
      { name: 'Plus', Component: Icons.PlusIcon },
      { name: 'Minus', Component: Icons.MinusIcon },
      { name: 'PlusSquare', Component: Icons.PlusSquareIcon },
      { name: 'MinusSquare', Component: Icons.MinusSquareIcon },
      { name: 'Check', Component: Icons.CheckIcon },
      { name: 'X', Component: Icons.XIcon },
      { name: 'Question', Component: Icons.QuestionIcon },
      { name: 'Info', Component: Icons.InfoIcon },
      { name: 'Warning', Component: Icons.WarningIcon },
      { name: 'CheckCircle', Component: Icons.CheckCircleIcon },
      { name: 'XCircle', Component: Icons.XCircleIcon },
      { name: 'MinusCircle', Component: Icons.MinusCircleIcon },
      { name: 'Prohibit', Component: Icons.ProhibitIcon },
      { name: 'Clock', Component: Icons.ClockIcon },
    ],
  },
]

const meta = {
  title: 'Foundations/Icons',
  argTypes: {
    iconName: {
      control: 'select',
      options: Object.fromEntries(
        iconGroups.flatMap(({ category, icons }) =>
          icons.map(({ name }) => [`${category} / ${name}`, name]),
        ),
      ),
    },
    size: { control: 'select', options: Object.keys(typography.fontSizes) },
    weight: { control: 'inline-radio', options: weights },
    colorMode: { control: 'inline-radio', options: ['token', 'custom'] },
    colorToken: {
      control: 'select',
      options: Object.keys(iconColorTokens),
      if: { arg: 'colorMode', eq: 'token' },
    },
    customColor: {
      control: 'color',
      if: { arg: 'colorMode', eq: 'custom' },
    },
  },
  args: {
    colorMode: 'token',
    colorToken: 'Primary / 600',
    customColor: '#475569',
    iconName: 'Plus',
    size: 'md',
    weight: 'regular',
  },
} satisfies Meta<IconGalleryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Catalog: Story = {
  args: { colorToken: 'Primary / 600' },

  render: ({ colorMode, colorToken, customColor, iconName, size, weight }) => {
    const icon = iconGroups.flatMap(({ icons }) => icons).find(({ name }) => name === iconName)
    const Icon = icon?.Component
    const iconColor = colorMode === 'custom' ? customColor : iconColorTokens[colorToken]
    const iconSize = typography.fontSizes[size]

    return (
      <main style={{ display: 'grid', gap: 16, justifyItems: 'center', padding: 32 }}>
        {Icon && (
          <span
            aria-label={icon.name}
            role="img"
            style={{ alignItems: 'center', display: 'inline-flex', lineHeight: iconSize }}
          >
            <Icon color={iconColor} size={iconSize} weight={weight} />
          </span>
        )}
        <strong>{iconName}</strong>
      </main>
    )
  },
}
