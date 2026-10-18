import styled from '@emotion/styled'
import { colors, radii, spacing } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
export const TransferRoot = styled.fieldset`
  ${componentText};
  padding: 0;
  margin: 0;
  border: 0;
  min-width: 0;
  color: ${colors.neutral[700]};
  overflow-wrap: anywhere;
  & > legend {
    padding: 0;
    margin-bottom: ${spacing[2]};
  }
`
export const TransferLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[3]};
`
export const TransferPanel = styled.fieldset`
  display: flex;
  flex: 1 1 220px;
  flex-direction: column;
  gap: ${spacing[2]};
  margin: 0;
  min-width: 0;
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${radii.small};
  padding: ${spacing[3]};
  & > legend {
    padding: 0 ${spacing[1]};
  }
`
export const TransferList = styled.ul`
  display: grid;
  gap: ${spacing[2]};
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 240px;
  overflow: auto;
`
export const TransferActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  width: 100%;
`
