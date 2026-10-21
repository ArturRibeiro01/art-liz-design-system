import type { HTMLAttributes } from 'react'
import { StyledButtonGroup } from './ButtonGroup.style'
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}
export function ButtonGroup({
  orientation = 'horizontal',
  'aria-label': label = 'Ações',
  ...props
}: ButtonGroupProps) {
  return <StyledButtonGroup {...props} aria-label={label} role="group" orientation={orientation} />
}
