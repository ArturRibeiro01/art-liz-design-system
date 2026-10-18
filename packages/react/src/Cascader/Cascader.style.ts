import styled from '@emotion/styled'
import { colors, spacing } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
export const CascaderRoot = styled.fieldset`
  ${componentText};
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
  color: ${colors.neutral[700]};
  overflow-wrap: anywhere;
  & > legend {
    padding: 0;
    margin-bottom: ${spacing[2]};
  }
  & > p {
    margin-top: ${spacing[1]};
  }
`
export const CascaderLevels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  & > div {
    flex: 1 1 140px;
  }
`
