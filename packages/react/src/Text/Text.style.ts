import { colors, typography } from '@art-liz/tokens'
import styled from '@emotion/styled'
import type { TextColor, TextVariant, TextWeight } from './Text'

type StyledTextProps = {
  color: TextColor
  variant: TextVariant
  weight: TextWeight
}

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
  danger: colors.danger,
  warning: colors.warning,
  success: colors.success,
  info: colors.info,
} as const

const colorScaleTokens = Object.fromEntries(
  Object.entries(colorScales).flatMap(([scaleName, tones]) =>
    Object.entries(tones).map(([tone, value]) => [`${scaleName}.${tone}`, value]),
  ),
) as Record<Extract<TextColor, `${string}.${number}`>, string>

export const textColorTokens = {
  ...singleColorTokens,
  ...colorScaleTokens,
} as Record<TextColor, string>

export const StyledText = styled('p', {
  shouldForwardProp: (prop) => !['as', 'color', 'variant', 'weight'].includes(prop),
})<StyledTextProps>`
  color: ${({ color }) => textColorTokens[color]};
  font-family: ${typography.fontFamilies.component};
  font-size: ${({ variant }) => typography.textStyles[variant].fontSize};
  font-weight: ${({ weight }) => typography.fontWeights[weight]};
  line-height: ${({ variant }) => typography.textStyles[variant].lineHeight};
  margin: 0;
`
