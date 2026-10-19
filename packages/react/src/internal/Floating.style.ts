import { surfaceMotion, interactiveMotion } from './motion.style'
import { motion } from '@art-liz/tokens'
import styled from '@emotion/styled'
import { colors, radii, shadows, spacing } from '@art-liz/tokens'
import { componentText, keyboardFocus } from './Field.style'
export const FloatingTrigger = styled.button`
  ${componentText};
  ${keyboardFocus};
  color: ${colors.neutral[700]};
  background: ${colors.white};
  border: 1px solid ${colors.neutral[400]};
  border-radius: ${radii.small};
  padding: ${spacing[2]} ${spacing[3]};
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  ${interactiveMotion};
`
export const FloatingSurface = styled.div`
  ${componentText};
  ${keyboardFocus};
  position: fixed;
  inset: auto;
  margin: 0;
  padding: ${spacing[4]};
  box-sizing: border-box;
  color: ${colors.neutral[700]};
  background: ${colors.white};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${radii.small};
  box-shadow: ${shadows.md};
  width: max-content;
  max-width: min(320px, calc(100vw - 16px));
  max-height: calc(100dvh - 16px);
  overflow: auto;
  overflow-wrap: anywhere;
  ${surfaceMotion};
  opacity: 0;
  transform: translateY(calc(-1 * ${spacing[1]}));
  pointer-events: none;
  transition-timing-function: ${motion.easings.exit};
  &:popover-open {
    opacity: 1;
    transform: none;
    pointer-events: auto;
    transition-timing-function: ${motion.easings.entrance};
  }
  @starting-style {
    &:popover-open {
      opacity: 0;
      transform: translateY(calc(-1 * ${spacing[1]}));
    }
  }
`
