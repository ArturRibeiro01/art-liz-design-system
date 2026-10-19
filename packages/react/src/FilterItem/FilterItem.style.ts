import { interactiveMotion } from '../internal/motion.style'
import styled from '@emotion/styled'
import { colors, radii, spacing } from '@art-liz/tokens'
import { componentText, keyboardFocus } from '../internal/Field.style'
export const FilterButton = styled.button`
  ${componentText};
  ${keyboardFocus};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  max-width: 100%;
  padding: ${spacing[1]} ${spacing[3]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${radii.small};
  background: ${colors.white};
  color: ${colors.neutral[700]};
  cursor: pointer;
  overflow-wrap: anywhere;
  &[aria-pressed='true'] {
    color: ${colors.primary[900]};
    background: ${colors.primary[50]};
    border-color: ${colors.primary[700]};
  }
  &:hover:not(:disabled) {
    border-color: ${colors.primary[700]};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  ${interactiveMotion};
`
