import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { TextVariant } from '../Text'
import { Text } from '../Text'
import { StyledButton } from './Button.style'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'link'
export type ButtonIntent = 'primary' | 'danger' | 'success' | 'info' | 'warning'
export type ButtonSize = 'small' | 'medium' | 'large'

const buttonTextVariants: Record<ButtonSize, TextVariant> = {
  small: 'body',
  medium: 'subtitle',
  large: 'title',
}

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: ButtonVariant
  intent?: ButtonIntent
  size?: ButtonSize
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export function Button({
  variant = 'primary',
  intent = 'primary',
  size = 'medium',
  startIcon,
  endIcon,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const hasAccessibleName =
    Boolean(props['aria-label']?.trim()) || Boolean(props['aria-labelledby']?.trim())

  if (children == null && !hasAccessibleName) {
    throw new Error('Button requires children or an accessible name when rendered with icons only.')
  }

  return (
    <StyledButton intent={intent} variant={variant} size={size} type={type} {...props}>
      {startIcon != null && (
        <span aria-hidden="true" data-button-icon>
          {startIcon}
        </span>
      )}
      {children != null && (
        <Text as="span" color="inherit" data-button-label variant={buttonTextVariants[size]}>
          {children}
        </Text>
      )}
      {endIcon != null && (
        <span aria-hidden="true" data-button-icon>
          {endIcon}
        </span>
      )}
    </StyledButton>
  )
}
