import styled from '@emotion/styled'
import { colors, spacing } from '@art-liz/tokens'
import { componentText, keyboardFocus } from '../internal/Field.style'
export const TableScroll = styled.div`
  ${keyboardFocus};
  max-width: 100%;
  overflow-x: auto;
`
export const StyledTable = styled.table`
  ${componentText};
  border-collapse: collapse;
  width: 100%;
  color: ${colors.neutral[700]};
  text-align: start;
  & caption {
    text-align: start;
    font-weight: 600;
    padding-block: ${spacing[2]};
  }
  & th,
  & td {
    border-bottom: 1px solid ${colors.neutral[300]};
    padding: ${spacing[3]} ${spacing[4]};
    text-align: start;
  }
  & th {
    background: ${colors.neutral[50]};
    font-weight: 600;
  }
`
