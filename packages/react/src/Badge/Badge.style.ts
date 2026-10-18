import styled from '@emotion/styled'
import { radii, spacing, typography } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
import { intentColors, intentText } from '../internal/intent'
import type { SemanticIntent } from '../internal/intent'
export const StyledBadge = styled('span', { shouldForwardProp: (prop) => prop !== 'intent' })<{
  intent: SemanticIntent
}>`
  ${componentText};
  display: inline-flex;
  align-items: center;
  border-radius: ${radii.pill};
  padding: 0 ${spacing[2]};
  font-size: ${typography.textStyles.caption.fontSize};
  background: ${({ intent }) => intentColors[intent][100]};
  color: ${({ intent }) => intentText(intent)};
  overflow-wrap: anywhere;
  max-width: 100%;
  box-sizing: border-box;
`
