import { interactiveMotion } from './motion.style'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { colors, focus, radii, spacing, typography } from '@art-liz/tokens'
import type { InputSize } from '../Input'

export const keyboardFocus = css`
  &:focus-visible {
    outline: ${focus.ringWidth} ${focus.ringStyle} ${colors.primary[800]};
    outline-offset: ${focus.ringOffset};
  }
`
export const componentText = css`
  font-family: ${typography.fontFamilies.component};
  font-size: ${typography.textStyles.body.fontSize};
  font-weight: ${typography.fontWeights.regular};
  line-height: ${typography.textStyles.body.lineHeight};
`
const sizes = {
  small: { height: '24px', text: typography.textStyles.caption },
  medium: { height: '36px', text: typography.textStyles.body },
  large: { height: '40px', text: typography.textStyles.subtitle },
}
export const formControl = (size: InputSize) => css`
  ${componentText};
  background: ${colors.white};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${radii.small};
  box-sizing: border-box;
  color: ${colors.neutral[700]};
  width: 100%;
  min-width: 0;
  min-height: ${sizes[size].height};
  padding: 0 ${spacing[3]};
  font-size: ${sizes[size].text.fontSize};
  line-height: ${sizes[size].text.lineHeight};
  &:hover:not(:disabled) {
    border-color: ${colors.primary[600]};
  }
  &[aria-invalid]:not([aria-invalid='false']) {
    border-color: ${colors.danger[600]};
  }
  &::placeholder {
    color: ${colors.neutral[600]};
    opacity: 1;
  }
  &:disabled {
    background: ${colors.neutral[100]};
    color: ${colors.neutral[500]};
    cursor: not-allowed;
  }
  ${keyboardFocus};
  ${interactiveMotion};
`
export const FieldRoot = styled.div`
  display: grid;
  gap: ${spacing[1]};
  min-width: 0;
  width: 100%;
  overflow-wrap: anywhere;
`
export const ChoiceLabel = styled.label`
  ${componentText};
  display: inline-flex;
  align-items: flex-start;
  gap: ${spacing[2]};
  color: ${colors.neutral[700]};
  cursor: pointer;
  min-width: 0;
  overflow-wrap: anywhere;
  &:has(input:disabled) {
    color: ${colors.neutral[500]};
    cursor: not-allowed;
  }
`
