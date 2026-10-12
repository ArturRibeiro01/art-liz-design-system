import type { colors as tokenColors } from '@art-liz/tokens'
import { typography } from '@art-liz/tokens'
import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { StyledText } from './Text.style'

type ColorScaleName =
  'neutral' | 'primary' | 'auxiliary' | 'danger' | 'warning' | 'success' | 'info'
type SingleColorName = 'white' | 'black' | 'ink' | 'forest' | 'moss' | 'paper' | 'muted' | 'border'
type ColorScaleTone = keyof typeof tokenColors.neutral
export type TextColor = 'inherit' | SingleColorName | `${ColorScaleName}.${ColorScaleTone}`
export type TextFontFamily = string
export type TextVariant = keyof typeof typography.textStyles
export type TextWeight = keyof typeof typography.fontWeights

type TextOwnProps = {
  color?: TextColor
  fontFamily?: TextFontFamily
  variant?: TextVariant
  weight?: TextWeight
}

export type TextProps<T extends ElementType = 'p'> = TextOwnProps & {
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps | 'as'>

export function Text<T extends ElementType = 'p'>({
  as,
  color = 'neutral.900',
  fontFamily = 'component',
  variant = 'body',
  weight = 'regular',
  ...props
}: TextProps<T>) {
  return (
    <StyledText
      as={as ?? 'p'}
      color={color}
      fontFamily={fontFamily}
      variant={variant}
      weight={weight}
      {...props}
    />
  )
}

Text.displayName = 'Text'
