import { hiddenMotion, interactiveMotion } from '../internal/motion.style'
import styled from '@emotion/styled'
import { radii, spacing } from '@art-liz/tokens'
import { componentText, keyboardFocus } from '../internal/Field.style'
import { intentColors, intentText } from '../internal/intent'
import type { SemanticIntent } from '../internal/intent'
export const StyledAlert = styled('div', { shouldForwardProp: (prop) => prop !== 'intent' })<{
  intent: SemanticIntent
}>`
  ${componentText};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing[3]};
  padding: ${spacing[4]};
  border: 1px solid ${({ intent }) => intentColors[intent][300]};
  border-radius: ${radii.small};
  background: ${({ intent }) => intentColors[intent][50]};
  color: ${({ intent }) => intentText(intent)};
  overflow-wrap: anywhere;
  & > div {
    min-width: 0;
  }
  ${hiddenMotion};
`
export const AlertClose = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${keyboardFocus};
  flex-shrink: 0;
  min-width: 24px;
  min-height: 24px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  padding: 0;
  ${interactiveMotion};
`
