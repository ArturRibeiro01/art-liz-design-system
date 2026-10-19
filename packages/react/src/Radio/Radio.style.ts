import styled from '@emotion/styled'
import { colors, spacing } from '@art-liz/tokens'
import { keyboardFocus } from '../internal/Field.style'
export const StyledRadio = styled.input`
  accent-color: ${colors.primary[800]};
  width: ${spacing[4]};
  height: ${spacing[4]};
  margin: 3px 0 0;
  flex: 0 0 ${spacing[4]};
  cursor: inherit;
  ${keyboardFocus};
`
