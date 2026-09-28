import { colors, radii, spacing } from '@art-liz/tokens'
import styled from '@emotion/styled'
import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const StyledButton = styled.button<{ variant: ButtonVariant }>`
  align-items: center;
  background: ${({ variant }) =>
    variant === 'primary' ? colors.forest : 'transparent'};
  border: 1px solid ${colors.forest};
  border-radius: ${radii.small};
  color: ${({ variant }) =>
    variant === 'primary' ? colors.white : colors.forest};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 600;
  justify-content: center;
  min-height: 40px;
  padding: ${spacing[2]} ${spacing[4]};
  transition: background 140ms ease, color 140ms ease;

  &:hover:not(:disabled) {
    background: ${({ variant }) =>
      variant === 'primary' ? colors.ink : '#e5eee8'};
  }

  &:focus-visible {
    outline: 3px solid ${colors.moss};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }
`

export function Button({ variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <StyledButton variant={variant} type={type} {...props} />
}