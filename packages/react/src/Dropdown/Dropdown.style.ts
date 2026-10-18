import styled from '@emotion/styled'
import { colors, spacing } from '@art-liz/tokens'
import { FloatingSurface, FloatingTrigger } from '../internal/Floating.style'
import { componentText, keyboardFocus } from '../internal/Field.style'
export const DropdownTrigger = styled(FloatingTrigger)``
export const DropdownSurface = styled(FloatingSurface)`
  padding: ${spacing[1]};
  min-width: min(180px, calc(100vw - 16px));
`
export const MenuItem = styled.button`
  ${componentText};
  ${keyboardFocus};
  display: block;
  text-align: start;
  padding: ${spacing[2]} ${spacing[3]};
  width: 100%;
  border: 0;
  color: ${colors.neutral[700]};
  background: ${colors.white};
  cursor: pointer;
  &:hover:not(:disabled),
  &:focus {
    background: ${colors.primary[100]};
    color: ${colors.primary[900]};
  }
  &:disabled {
    color: ${colors.neutral[500]};
    cursor: not-allowed;
  }
`
