import styled from '@emotion/styled'
import { colors, radii, spacing } from '@art-liz/tokens'
import { componentText, keyboardFocus } from '../internal/Field.style'
export const PageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing[1]};
  list-style: none;
  padding: 0;
  margin: 0;
  & > li {
    display: inline-flex;
    align-items: center;
    gap: ${spacing[1]};
  }
`
export const PageButton = styled.button`
  ${componentText};
  ${keyboardFocus};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${radii.small};
  background: ${colors.white};
  color: ${colors.neutral[700]};
  min-height: 36px;
  min-width: 36px;
  padding: ${spacing[1]} ${spacing[2]};
  cursor: pointer;
  &[aria-current='page'] {
    border-color: ${colors.primary[800]};
    background: ${colors.primary[100]};
    color: ${colors.primary[900]};
  }
  &:hover:not(:disabled) {
    border-color: ${colors.primary[800]};
  }
  &:disabled {
    color: ${colors.neutral[500]};
    cursor: not-allowed;
  }
`
