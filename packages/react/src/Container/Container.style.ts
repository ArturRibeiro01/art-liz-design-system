import { breakpoints, colors, spacing } from '@art-liz/tokens'
import styled from '@emotion/styled'
import type { ContainerMaxWidth, ContainerProps } from './Container'

const singleColorTokens = {
  white: colors.white,
  black: colors.black,
  ink: colors.ink,
  forest: colors.forest,
  moss: colors.moss,
  paper: colors.paper,
  muted: colors.muted,
  border: colors.border,
} as const

const colorScales = {
  neutral: colors.neutral,
  primary: colors.primary,
  auxiliary: colors.auxiliary,
  success: colors.success,
  warning: colors.warning,
  info: colors.info,
  danger: colors.danger,
} as const

type ColorScaleName = keyof typeof colorScales
type ColorScaleTone = keyof typeof colors.neutral
type ColorScaleToken = `${ColorScaleName}.${ColorScaleTone}`
type SingleColorToken = keyof typeof singleColorTokens

export type ContainerBackground = 'transparent' | SingleColorToken | ColorScaleToken
export type ContainerPadding = keyof typeof spacing
export type ContainerMargin = ContainerPadding | 'auto'

const colorScaleTokens = Object.fromEntries(
  Object.entries(colorScales).flatMap(([scaleName, tones]) =>
    Object.entries(tones).map(([tone, value]) => [`${scaleName}.${tone}`, value]),
  ),
) as Record<ColorScaleToken, string>

const backgroundTokens = {
  transparent: 'transparent',
  ...singleColorTokens,
  ...colorScaleTokens,
} satisfies Record<ContainerBackground, string>

export const containerBackgroundOptions = Object.keys(backgroundTokens) as ContainerBackground[]

const maxWidths: Record<ContainerMaxWidth, string> = {
  sm: breakpoints.sm,
  md: breakpoints.md,
  lg: breakpoints.lg,
  xl: breakpoints.xl,
  full: '100%',
}

type StyledContainerProps = Pick<ContainerProps, 'maxWidth' | 'background' | 'padding' | 'margin'>

export const StyledContainer = styled('div', {
  shouldForwardProp: (prop) => !['maxWidth', 'background', 'padding', 'margin'].includes(prop),
})<StyledContainerProps>`
  background: ${({ background = 'transparent' }) => backgroundTokens[background]};
  box-sizing: border-box;
  margin: ${({ margin = 'auto' }) => (margin === 'auto' ? '0 auto' : spacing[margin])};
  max-width: ${({ maxWidth = 'xl' }) => maxWidths[maxWidth]};
  padding: ${({ padding }) => (padding ? spacing[padding] : `0 ${spacing[4]}`)};
  width: ${({ margin = 'auto' }) =>
    margin === 'auto' ? '100%' : `calc(100% - ${spacing[margin]} - ${spacing[margin]})`};
`
