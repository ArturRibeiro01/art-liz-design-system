import styled from '@emotion/styled'
import { spacing } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
import { intentText } from '../internal/intent'
import type { SemanticIntent } from '../internal/intent'
export const ResultRoot = styled.section`
  ${componentText};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[3]};
  text-align: center;
  min-width: 0;
  padding: ${spacing[6]};
  overflow-wrap: anywhere;
`
export const ResultIcon = styled('div', { shouldForwardProp: (prop) => prop !== 'intent' })<{
  intent: SemanticIntent
}>`
  display: flex;
  color: ${({ intent }) => intentText(intent)};
`
export const ResultActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${spacing[2]};
  max-width: 100%;
`
