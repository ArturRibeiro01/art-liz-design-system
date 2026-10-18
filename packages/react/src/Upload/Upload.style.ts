import styled from '@emotion/styled'
import { colors, radii, spacing } from '@art-liz/tokens'
import { componentText, keyboardFocus } from '../internal/Field.style'
export const StyledUpload = styled.input`
  ${componentText};
  ${keyboardFocus};
  max-width: 100%;
  color: ${colors.neutral[700]};
  &::file-selector-button {
    font: inherit;
    background: ${colors.white};
    color: ${colors.neutral[700]};
    border: 1px solid ${colors.neutral[400]};
    border-radius: ${radii.small};
    padding: ${spacing[2]} ${spacing[3]};
    margin-inline-end: ${spacing[2]};
    cursor: pointer;
  }
  &:disabled,
  &:disabled::file-selector-button {
    cursor: not-allowed;
    opacity: 0.6;
  }
`
