import styled from '@emotion/styled'
import { spacing } from '@art-liz/tokens'
import type { ButtonGroupProps } from './ButtonGroup'
export const StyledButtonGroup = styled('div', {
  shouldForwardProp: (prop) => prop !== 'orientation',
})<{ orientation: ButtonGroupProps['orientation'] }>`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: ${spacing[1]};
  flex-direction: ${({ orientation }) => (orientation === 'vertical' ? 'column' : 'row')};
`
