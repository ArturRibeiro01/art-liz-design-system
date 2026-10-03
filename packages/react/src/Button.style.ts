import { colors, focus, motion, radii, spacing, typography } from '@art-liz/tokens'
import styled from '@emotion/styled'
import type { ButtonVariant } from './Button'

export const StyledButton = styled.button<{ variant: ButtonVariant }>`
  align-items: center;
  background: ${({ variant }) => (variant === 'primary' ? colors.primary[700] : 'transparent')};
  border: 1px solid
    ${({ variant }) => (variant === 'primary' ? colors.primary[700] : colors.neutral[400])};
  border-radius: ${radii.small};
  color: ${({ variant }) => (variant === 'primary' ? colors.white : colors.primary[700])};
  cursor: pointer;
  display: inline-flex;
  font-family: ${typography.fontFamilies.component};
  font-size: ${typography.fontSizes.md};
  font-weight: ${typography.fontWeights.regular};
  justify-content: center;
  line-height: ${typography.lineHeights.normal};
  min-height: 40px;
  padding: ${spacing[2]} ${spacing[4]};
  transition:
    background ${motion.durations.normal} ${motion.easings.standard},
    border-color ${motion.durations.normal} ${motion.easings.standard},
    color ${motion.durations.normal} ${motion.easings.standard};

  &:hover:not(:disabled) {
    background: ${({ variant }) => (variant === 'primary' ? colors.primary[800] : colors.primary[50])};
    border-color: ${({ variant }) => (variant === 'primary' ? colors.primary[800] : colors.primary[300])};
  }

  &:focus-visible {
    outline: ${focus.ringWidth} ${focus.ringStyle} ${focus.ringColor};
    outline-offset: ${focus.ringOffset};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }
`
