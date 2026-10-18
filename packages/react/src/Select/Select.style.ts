import styled from '@emotion/styled'
import type { InputSize } from '../Input'
import { formControl } from '../internal/Field.style'
export const StyledSelect = styled('select', {
  shouldForwardProp: (prop) => prop !== 'controlSize',
})<{ controlSize: InputSize }>`
  ${({ controlSize }) => formControl(controlSize)};
`
