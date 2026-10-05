import { colors, typography } from '@art-liz/tokens'
import { ArrowCircleDownIcon } from '@phosphor-icons/react/dist/csr/ArrowCircleDown'
import { ArrowCircleLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowCircleLeft'
import { ArrowCircleRightIcon } from '@phosphor-icons/react/dist/csr/ArrowCircleRight'
import { ArrowCircleUpIcon } from '@phosphor-icons/react/dist/csr/ArrowCircleUp'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/csr/ArrowClockwise'
import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/csr/ArrowCounterClockwise'
import { ArrowDownIcon } from '@phosphor-icons/react/dist/csr/ArrowDown'
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft'
import { ArrowLineDownIcon } from '@phosphor-icons/react/dist/csr/ArrowLineDown'
import { ArrowLineLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLineLeft'
import { ArrowLineRightIcon } from '@phosphor-icons/react/dist/csr/ArrowLineRight'
import { ArrowLineUpIcon } from '@phosphor-icons/react/dist/csr/ArrowLineUp'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { ArrowsDownUpIcon } from '@phosphor-icons/react/dist/csr/ArrowsDownUp'
import { ArrowUpIcon } from '@phosphor-icons/react/dist/csr/ArrowUp'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { ArrowUUpLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowUUpLeft'
import { CalendarBlankIcon } from '@phosphor-icons/react/dist/csr/CalendarBlank'
import { CaretDoubleDownIcon } from '@phosphor-icons/react/dist/csr/CaretDoubleDown'
import { CaretDoubleLeftIcon } from '@phosphor-icons/react/dist/csr/CaretDoubleLeft'
import { CaretDoubleRightIcon } from '@phosphor-icons/react/dist/csr/CaretDoubleRight'
import { CaretDoubleUpIcon } from '@phosphor-icons/react/dist/csr/CaretDoubleUp'
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown'
import { CaretLeftIcon } from '@phosphor-icons/react/dist/csr/CaretLeft'
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight'
import { CaretUpIcon } from '@phosphor-icons/react/dist/csr/CaretUp'
import { ChartBarIcon } from '@phosphor-icons/react/dist/csr/ChartBar'
import { ChartLineIcon } from '@phosphor-icons/react/dist/csr/ChartLine'
import { ChartLineUpIcon } from '@phosphor-icons/react/dist/csr/ChartLineUp'
import { ChartPieSliceIcon } from '@phosphor-icons/react/dist/csr/ChartPieSlice'
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/csr/CheckCircle'
import { ClockIcon } from '@phosphor-icons/react/dist/csr/Clock'
import { CopyIcon } from '@phosphor-icons/react/dist/csr/Copy'
import { DotsSixVerticalIcon } from '@phosphor-icons/react/dist/csr/DotsSixVertical'
import { DotsThreeIcon } from '@phosphor-icons/react/dist/csr/DotsThree'
import { DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/csr/DotsThreeVertical'
import { EnvelopeOpenIcon } from '@phosphor-icons/react/dist/csr/EnvelopeOpen'
import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { EyeIcon } from '@phosphor-icons/react/dist/csr/Eye'
import { EyeSlashIcon } from '@phosphor-icons/react/dist/csr/EyeSlash'
import { FileIcon } from '@phosphor-icons/react/dist/csr/File'
import { FunnelIcon } from '@phosphor-icons/react/dist/csr/Funnel'
import { GearIcon } from '@phosphor-icons/react/dist/csr/Gear'
import { GlobeIcon } from '@phosphor-icons/react/dist/csr/Globe'
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image'
import { InfoIcon } from '@phosphor-icons/react/dist/csr/Info'
import { LinkSimpleIcon } from '@phosphor-icons/react/dist/csr/LinkSimple'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { MinusIcon } from '@phosphor-icons/react/dist/csr/Minus'
import { MinusCircleIcon } from '@phosphor-icons/react/dist/csr/MinusCircle'
import { MinusSquareIcon } from '@phosphor-icons/react/dist/csr/MinusSquare'
import { PaperclipIcon } from '@phosphor-icons/react/dist/csr/Paperclip'
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/csr/PencilSimple'
import { PlusIcon } from '@phosphor-icons/react/dist/csr/Plus'
import { PlusSquareIcon } from '@phosphor-icons/react/dist/csr/PlusSquare'
import { ProhibitIcon } from '@phosphor-icons/react/dist/csr/Prohibit'
import { QuestionIcon } from '@phosphor-icons/react/dist/csr/Question'
import { SpinnerGapIcon } from '@phosphor-icons/react/dist/csr/SpinnerGap'
import { StarIcon } from '@phosphor-icons/react/dist/csr/Star'
import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash'
import { UserIcon } from '@phosphor-icons/react/dist/csr/User'
import { WarningIcon } from '@phosphor-icons/react/dist/csr/Warning'
import { XIcon } from '@phosphor-icons/react/dist/csr/X'
import { XCircleIcon } from '@phosphor-icons/react/dist/csr/XCircle'
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
      { name: 'ArrowUp', Component: ArrowUpIcon },
      { name: 'ArrowDown', Component: ArrowDownIcon },
      { name: 'ArrowLeft', Component: ArrowLeftIcon },
      { name: 'ArrowRight', Component: ArrowRightIcon },
      { name: 'ArrowUpRight', Component: ArrowUpRightIcon },
      { name: 'ArrowLineUp', Component: ArrowLineUpIcon },
      { name: 'ArrowLineDown', Component: ArrowLineDownIcon },
      { name: 'ArrowLineLeft', Component: ArrowLineLeftIcon },
      { name: 'ArrowLineRight', Component: ArrowLineRightIcon },
      { name: 'ArrowCircleUp', Component: ArrowCircleUpIcon },
      { name: 'ArrowCircleDown', Component: ArrowCircleDownIcon },
      { name: 'ArrowCircleLeft', Component: ArrowCircleLeftIcon },
      { name: 'ArrowCircleRight', Component: ArrowCircleRightIcon },
      { name: 'ArrowClockwise', Component: ArrowClockwiseIcon },
      { name: 'ArrowCounterClockwise', Component: ArrowCounterClockwiseIcon },
      { name: 'ArrowUUpLeft', Component: ArrowUUpLeftIcon },
      { name: 'ArrowsDownUp', Component: ArrowsDownUpIcon },
      { name: 'CaretUp', Component: CaretUpIcon },
      { name: 'CaretDown', Component: CaretDownIcon },
      { name: 'CaretLeft', Component: CaretLeftIcon },
      { name: 'CaretRight', Component: CaretRightIcon },
      { name: 'CaretDoubleUp', Component: CaretDoubleUpIcon },
      { name: 'CaretDoubleDown', Component: CaretDoubleDownIcon },
      { name: 'CaretDoubleLeft', Component: CaretDoubleLeftIcon },
      { name: 'CaretDoubleRight', Component: CaretDoubleRightIcon },
    ],
  },
  {
    category: 'Base',
    icons: [
      { name: 'Globe', Component: GlobeIcon },
      { name: 'SpinnerGap', Component: SpinnerGapIcon },
      { name: 'CalendarBlank', Component: CalendarBlankIcon },
      { name: 'Paperclip', Component: PaperclipIcon },
      { name: 'Funnel', Component: FunnelIcon },
      { name: 'Gear', Component: GearIcon },
      { name: 'EnvelopeOpen', Component: EnvelopeOpenIcon },
      { name: 'EnvelopeSimple', Component: EnvelopeSimpleIcon },
      { name: 'Eye', Component: EyeIcon },
      { name: 'EyeSlash', Component: EyeSlashIcon },
      { name: 'LinkSimple', Component: LinkSimpleIcon },
      { name: 'MagnifyingGlass', Component: MagnifyingGlassIcon },
      { name: 'Image', Component: ImageIcon },
      { name: 'File', Component: FileIcon },
      { name: 'User', Component: UserIcon },
    ],
  },
  {
    category: 'Charts',
    icons: [
      { name: 'ChartLine', Component: ChartLineIcon },
      { name: 'ChartLineUp', Component: ChartLineUpIcon },
      { name: 'ChartBar', Component: ChartBarIcon },
      { name: 'ChartPieSlice', Component: ChartPieSliceIcon },
    ],
  },
  {
    category: 'Edit',
    icons: [
      { name: 'PencilSimple', Component: PencilSimpleIcon },
      { name: 'Copy', Component: CopyIcon },
      { name: 'Trash', Component: TrashIcon },
      { name: 'DotsSixVertical', Component: DotsSixVerticalIcon },
      { name: 'Star', Component: StarIcon },
      { name: 'DotsThree', Component: DotsThreeIcon },
      { name: 'DotsThreeVertical', Component: DotsThreeVerticalIcon },
    ],
  },
  {
    category: 'Suggest',
    icons: [
      { name: 'Plus', Component: PlusIcon },
      { name: 'Minus', Component: MinusIcon },
      { name: 'PlusSquare', Component: PlusSquareIcon },
      { name: 'MinusSquare', Component: MinusSquareIcon },
      { name: 'Check', Component: CheckIcon },
      { name: 'X', Component: XIcon },
      { name: 'Question', Component: QuestionIcon },
      { name: 'Info', Component: InfoIcon },
      { name: 'Warning', Component: WarningIcon },
      { name: 'CheckCircle', Component: CheckCircleIcon },
      { name: 'XCircle', Component: XCircleIcon },
      { name: 'MinusCircle', Component: MinusCircleIcon },
      { name: 'Prohibit', Component: ProhibitIcon },
      { name: 'Clock', Component: ClockIcon },
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
    colorToken: 'Primary / 600',

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
