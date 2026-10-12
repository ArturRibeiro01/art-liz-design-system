import { colors, radii, shadows, spacing } from '@art-liz/tokens'
import styled from '@emotion/styled'
import type { BoxBackground, BoxProps } from './Box'

const backgroundColors: Record<BoxBackground, string> = {
  transparent: 'transparent',
  white: colors.white,
  neutral: colors.neutral[50],
}

type StyledBoxProps = Pick<BoxProps, 'padding' | 'background' | 'borderRadius' | 'shadow'>

export const StyledBox = styled('div', {
  shouldForwardProp: (prop) => !['padding', 'background', 'borderRadius', 'shadow'].includes(prop),
})<StyledBoxProps>`
  background: ${({ background = 'transparent' }) => backgroundColors[background]};
  border-radius: ${({ borderRadius }) => (borderRadius ? radii[borderRadius] : '0')};
  box-shadow: ${({ shadow = 'none' }) => shadows[shadow]};
  box-sizing: border-box;
  min-width: 0;
  padding: ${({ padding }) => (padding ? spacing[padding] : '0')};
`
