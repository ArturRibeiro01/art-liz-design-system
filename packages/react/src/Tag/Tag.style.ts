import styled from '@emotion/styled'
import { colors, radii, spacing } from '@art-liz/tokens'
import { componentText, keyboardFocus } from '../internal/Field.style'
import { intentColors, intentText } from '../internal/intent'
import type { SemanticIntent } from '../internal/intent'
export const StyledTag = styled('span', { shouldForwardProp: (prop) => prop !== 'intent' })<{
  intent: SemanticIntent
}>`
  ${componentText};
  display: inline-flex;
  align-items: center;
  gap: ${spacing[1]};
  border: 1px solid ${({ intent }) => intentColors[intent][300]};
  border-radius: ${radii.small};
  background: ${({ intent }) => intentColors[intent][50]};
  color: ${({ intent }) => intentText(intent)};
  padding: 0 ${spacing[2]};
  max-width: 100%;
  box-sizing: border-box;
  overflow-wrap: anywhere;
  & > span {
    min-width: 0;
  }
`
export const RemoveTag = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${keyboardFocus};
  color: inherit;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  font: inherit;
  min-width: 24px;
  min-height: 24px;
  flex-shrink: 0;
  &:disabled {
    color: ${colors.neutral[500]};
    cursor: not-allowed;
  }
`
