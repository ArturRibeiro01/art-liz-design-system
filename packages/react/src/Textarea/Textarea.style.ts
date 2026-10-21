import styled from '@emotion/styled'
import { spacing } from '@art-liz/tokens'
import type { InputSize } from '../Input'
import { formControl } from '../internal/Field.style'
export const StyledTextarea = styled('textarea', {
  shouldForwardProp: (prop) => prop !== 'controlSize',
})<{ controlSize: InputSize }>`
  ${({ controlSize }) => formControl(controlSize)};
  display: block;
  padding-block: ${spacing[2]};
  resize: vertical;
`
