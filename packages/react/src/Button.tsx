
import type { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './Button.style'

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}



export function Button({ variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <StyledButton variant={variant} type={type} {...props} />
}