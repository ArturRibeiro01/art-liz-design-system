import styled from '@emotion/styled'
import { spacing } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
import { intentText } from '../internal/intent'
import type { SemanticIntent } from '../internal/intent'
export const StatusRoot = styled.span`
  ${componentText};
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  color: inherit;
  min-width: 0;
  overflow-wrap: anywhere;
`
export const StatusMarker = styled('span', { shouldForwardProp: (prop) => prop !== 'intent' })<{
  intent: SemanticIntent
}>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  color: ${({ intent }) => intentText(intent)};
  &:empty {
    width: ${spacing[2]};
    height: ${spacing[2]};
    border-radius: 50%;
    background: currentColor;
  }
`
