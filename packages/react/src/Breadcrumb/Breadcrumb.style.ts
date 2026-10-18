import styled from '@emotion/styled'
import { colors, spacing } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
export const BreadcrumbList = styled.ol`
  ${componentText};
  color: ${colors.neutral[700]};
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  & > li {
    display: inline-flex;
    align-items: center;
    & > svg {
      flex-shrink: 0;
    }
    gap: ${spacing[2]};
    min-width: 0;
    overflow-wrap: anywhere;
  }
`
