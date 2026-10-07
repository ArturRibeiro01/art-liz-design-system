import type { HTMLAttributes } from 'react'
import { StyledBox } from './Box.style'

export type BoxBackground = 'transparent' | 'white' | 'neutral'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 1 | 2 | 3 | 4 | 6 | 8
  background?: BoxBackground
  borderRadius?: 'small' | 'medium' | 'pill'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

export function Box({ children, ...props }: BoxProps) {
  return <StyledBox {...props}>{children}</StyledBox>
}
