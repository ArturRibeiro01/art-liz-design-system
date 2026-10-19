import styled from '@emotion/styled'
import { colors, radii, spacing, typography } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
export const ChartRoot = styled.figure`
  ${componentText};
  margin: 0;
  min-width: 0;
  color: ${colors.neutral[700]};
  overflow-wrap: anywhere;
  & > p {
    margin: ${spacing[2]} 0;
  }
`
export const ChartCaption = styled.figcaption`
  font-weight: ${typography.fontWeights.semibold};
`
export const ChartList = styled.ul`
  display: grid;
  gap: ${spacing[3]};
  list-style: none;
  margin: ${spacing[4]} 0 0;
  padding: 0;
`
export const ChartRow = styled.li`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 2fr) minmax(0, 0.5fr);
  gap: ${spacing[2]};
  align-items: center;
`
export const ChartTrack = styled.span`
  display: flex;
  min-width: 0;
  border-radius: ${radii.small};
  background: ${colors.neutral[100]};
`
export const ChartHalf = styled('span', { shouldForwardProp: (prop) => prop !== 'negative' })<{
  negative?: boolean
}>`
  display: flex;
  flex: 1;
  min-width: 0;
  justify-content: ${({ negative }) => (negative ? 'flex-end' : 'flex-start')};
`
export const ChartBar = styled('span', { shouldForwardProp: (prop) => prop !== 'percent' })<{
  percent: number
}>`
  display: block;
  height: ${spacing[4]};
  width: ${({ percent }) => percent}%;
  background: ${colors.primary[700]};
`
export const ChartValue = styled.span`
  font-variant-numeric: tabular-nums;
  text-align: right;
`
