import styled from '@emotion/styled'
import { colors, radii, shadows, spacing } from '@art-liz/tokens'
import { componentText, keyboardFocus } from '../internal/Field.style'
export const StyledDialog = styled.dialog`
  ${componentText};
  background: ${colors.white};
  color: ${colors.neutral[700]};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${radii.medium};
  box-shadow: ${shadows.lg};
  box-sizing: border-box;
  width: min(560px, calc(100vw - 32px));
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 0;
  overflow: auto;
  overflow-wrap: anywhere;
  &::backdrop {
    background: rgb(0 0 0 / 0.45);
  }
`
export const DialogHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${spacing[4]};
  padding: ${spacing[6]};
  border-bottom: 1px solid ${colors.neutral[200]};
  & > div {
    min-width: 0;
  }
`
export const DialogClose = styled.button`
  ${keyboardFocus};
  min-width: 32px;
  min-height: 32px;
  flex-shrink: 0;
  padding: 0;
  font: inherit;
  font-size: 24px;
  border: 0;
  background: transparent;
  color: ${colors.neutral[600]};
  cursor: pointer;
`
export const DialogBody = styled.div`
  padding: ${spacing[6]};
`
export const DialogFooter = styled.footer`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[2]};
  justify-content: flex-end;
  border-top: 1px solid ${colors.neutral[200]};
  padding: ${spacing[4]} ${spacing[6]};
`
