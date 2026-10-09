import type { colors as tokenColors } from '@art-liz/tokens'
import { typography } from '@art-liz/tokens'
import type { ComponentProps, ElementType } from 'react'
import { StyledText } from './Text.style'

type ColorScaleName =
  'neutral' | 'primary' | 'auxiliary' | 'danger' | 'warning' | 'success' | 'info'
type SingleColorName = 'white' | 'black' | 'ink' | 'forest' | 'moss' | 'paper' | 'muted' | 'border'
type ColorScaleTone = keyof typeof tokenColors.neutral
export type TextColor = SingleColorName | `${ColorScaleName}.${ColorScaleTone}`
export type TextVariant = keyof typeof typography.textStyles
export type TextWeight = keyof typeof typography.fontWeights

export type TextProps = Omit<
  ComponentProps<typeof StyledText>,
  'as' | 'color' | 'variant' | 'weight'
> & {
  as?: ElementType
  color?: TextColor
  variant?: TextVariant
  weight?: TextWeight
}

export function Text({
  as = 'p',
  color = 'neutral.900',
  variant = 'body',
  weight = 'regular',
  ...props
}: TextProps) {
  return <StyledText as={as} color={color} variant={variant} weight={weight} {...props} />
}

Text.displayName = 'Text'
