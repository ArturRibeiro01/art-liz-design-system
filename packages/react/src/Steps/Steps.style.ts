import styled from '@emotion/styled'
import { colors, radii, spacing } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
export const StepsList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[6]};
  list-style: none;
  margin: 0;
  padding: 0;
  &[data-orientation='vertical'] {
    flex-direction: column;
  }
  & > li {
    display: flex;
    gap: ${spacing[2]};
    min-width: 0;
    align-items: flex-start;
  }
  & > li > div {
    min-width: 0;
    overflow-wrap: anywhere;
  }
`
export const StepIndicator = styled.span`
  ${componentText};
  flex: 0 0 ${spacing[8]};
  height: ${spacing[8]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.neutral[400]};
  border-radius: ${radii.pill};
  color: ${colors.neutral[600]};
  background: ${colors.white};
  &[data-status='current'],
  &[data-status='finished'] {
    background: ${colors.primary[100]};
    border-color: ${colors.primary[900]};
    color: ${colors.primary[900]};
  }
  &[data-status='error'] {
    color: ${colors.danger[800]};
    background: ${colors.danger[50]};
    border-color: ${colors.danger[800]};
  }
`
