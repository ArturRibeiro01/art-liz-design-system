import { colors, radii, spacing } from '@art-liz/tokens'
import styled from '@emotion/styled'
import type { ButtonVariant } from './Button'

export const StyledButton = styled.button<{ variant: ButtonVariant }>`
  align-items: center;
  background: ${({ variant }) => (variant === 'primary' ? colors.danger : 'transparent')};
  border: 1px solid ${colors.moss};
  border-radius: ${radii.small};
  color: ${({ variant }) => (variant === 'primary' ? colors.white : colors.forest)};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 600;
  justify-content: center;
  min-height: 40px;
  padding: ${spacing[2]} ${spacing[4]};
  transition:
    background 140ms ease,
    color 140ms ease;

  &:hover:not(:disabled) {
    background: ${({ variant }) => (variant === 'primary' ? colors.ink : '#e5eee8')};
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
