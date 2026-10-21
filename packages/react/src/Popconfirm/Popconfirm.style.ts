import styled from '@emotion/styled'
import { colors, spacing } from '@art-liz/tokens'
import { Button } from '../Button'
import { keyboardFocus } from '../internal/Field.style'
import { FloatingSurface, FloatingTrigger } from '../internal/Floating.style'
export const ConfirmTrigger = styled(FloatingTrigger)``
export const ConfirmSurface = styled(FloatingSurface)`
  display: none;
  &:popover-open {
    display: grid;
    gap: ${spacing[3]};
  }
`
export const ConfirmActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${spacing[2]};
`

export const CancelButton = styled(Button)`
  ${keyboardFocus};
`
export const ConfirmButton = styled(CancelButton)`
  color: ${({ intent }) => (intent === 'danger' ? colors.danger[800] : colors.primary[900])};
  border-color: currentColor;
  &:hover:not(:disabled),
  &:active:not(:disabled) {
    color: ${({ intent }) => (intent === 'danger' ? colors.danger[900] : colors.primary[900])};
    border-color: currentColor;
    background: ${colors.neutral[50]};
  }
`
