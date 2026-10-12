import type { HTMLAttributes } from 'react'
import type { ContainerBackground, ContainerMargin, ContainerPadding } from './Container.style'
import { StyledContainer } from './Container.style'

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: ContainerMaxWidth
  background?: ContainerBackground
  padding?: ContainerPadding
  margin?: ContainerMargin
}

export function Container({
  maxWidth = 'xl',
  background = 'transparent',
  margin = 'auto',
  ...props
}: ContainerProps) {
  return <StyledContainer background={background} margin={margin} maxWidth={maxWidth} {...props} />
}
