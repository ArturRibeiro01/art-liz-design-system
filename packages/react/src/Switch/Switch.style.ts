import styled from '@emotion/styled'
import { colors, motion, radii, spacing } from '@art-liz/tokens'
import { keyboardFocus } from '../internal/Field.style'
export const StyledSwitch = styled.input`
  appearance: none;
  background: ${colors.neutral[600]};
  border: 1px solid transparent;
  border-radius: ${radii.pill};
  box-sizing: border-box;
  cursor: inherit;
  flex: 0 0 40px;
  width: 40px;
  height: ${spacing[6]};
  margin: 0;
  position: relative;
  transition: background-color ${motion.durations.normal} ${motion.easings.standard};
  &::before {
    content: '';
    background: ${colors.white};
    border-radius: ${radii.pill};
    position: absolute;
    top: 1px;
    left: 1px;
    width: 20px;
    height: 20px;
    transition: transform ${motion.durations.normal} ${motion.easings.standard};
  }
  &:checked {
    background: ${colors.primary[800]};
  }
  &:checked::before {
    transform: translateX(16px);
  }
  &:disabled {
    opacity: 0.5;
  }
  ${keyboardFocus};
  @media (prefers-reduced-motion: reduce) {
    &,
    &::before {
      transition: none;
    }
  }
  @media (forced-colors: active) {
    appearance: auto;
    &::before {
      display: none;
    }
  }
`
