import type { BadgeSize } from './Badge'
import { interactiveMotion } from '../internal/motion.style'
import styled from '@emotion/styled'
import { radii, spacing, typography } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
import { intentColors, intentText } from '../internal/intent'
import type { SemanticIntent } from '../internal/intent'
export const StyledBadge = styled('span', {
  shouldForwardProp: (prop) => !['intent', 'size'].includes(prop),
})<{
  intent: SemanticIntent
  size: BadgeSize
}>`
  ${componentText};
  display: inline-flex;
  align-items: center;
  border-radius: ${radii.pill};
  padding: ${({ size }) => (size === 'small' ? `0 ${spacing[2]}` : size === 'medium' ? `${spacing[1]} ${spacing[3]}` : `${spacing[2]} ${spacing[4]}`)};
  font-size: ${({ size }) => typography.textStyles[size === 'small' ? 'caption' : size === 'medium' ? 'body' : 'subtitle'].fontSize};
  background: ${({ intent }) => intentColors[intent][100]};
  color: ${({ intent }) => intentText(intent)};
  overflow-wrap: anywhere;
  max-width: 100%;
  box-sizing: border-box;
  ${interactiveMotion};
`
