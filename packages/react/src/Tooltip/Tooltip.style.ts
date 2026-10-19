import { hiddenMotion } from '../internal/motion.style'
import { intentColors, intentText } from '../internal/intent'
import type { SemanticIntent } from '../internal/intent'
import styled from '@emotion/styled'
import { colors, radii, shadows, spacing, zIndices } from '@art-liz/tokens'
import { componentText } from '../internal/Field.style'
export const TooltipRoot = styled.span`
  display: inline-flex;
`
export const TooltipSurface = styled('span', { shouldForwardProp: (prop) => prop !== 'intent' })<{
  intent: SemanticIntent
}>`
  ${componentText};
  display: block;
  position: fixed;
  z-index: ${zIndices.toast};
  max-width: min(240px, calc(100vw - 16px));
  padding: ${spacing[2]} ${spacing[3]};
  border-radius: ${radii.small};
  box-shadow: ${shadows.md};
  background: ${({ intent }) => (intent === 'neutral' ? colors.neutral[800] : intentColors[intent][100])};
  color: ${({ intent }) => (intent === 'neutral' ? colors.white : intentText(intent))};
  overflow-wrap: anywhere;
  box-sizing: border-box;
  ${hiddenMotion};
`
