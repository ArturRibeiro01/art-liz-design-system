import styled from '@emotion/styled'
import { colors, spacing } from '@art-liz/tokens'
import { keyboardFocus } from '../internal/Field.style'
export const StyledSlider = styled.input`
  accent-color: ${colors.primary[800]};
  width: 100%;
  min-height: ${spacing[6]};
  margin: 0;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
  ${keyboardFocus};
`
