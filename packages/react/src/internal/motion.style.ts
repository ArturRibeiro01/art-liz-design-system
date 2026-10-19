import { css, keyframes } from '@emotion/react'
import { motion, spacing } from '@art-liz/tokens'

export const interactiveMotion = css`
  transition:
    background-color ${motion.durations.fast} ${motion.easings.standard},
    border-color ${motion.durations.fast} ${motion.easings.standard},
    color ${motion.durations.fast} ${motion.easings.standard},
    box-shadow ${motion.durations.fast} ${motion.easings.standard},
    opacity ${motion.durations.fast} ${motion.easings.standard};
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
export const surfaceMotion = css`
  transition:
    opacity ${motion.durations.normal} ${motion.easings.entrance},
    transform ${motion.durations.normal} ${motion.easings.entrance},
    display ${motion.durations.normal} allow-discrete,
    overlay ${motion.durations.normal} allow-discrete;
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
export const hiddenMotion = css`
  ${surfaceMotion};
  opacity: 1;
  transform: none;
  &[hidden] {
    display: none;
    opacity: 0;
    transform: translateY(calc(-1 * ${spacing[1]}));
    pointer-events: none;
    transition-timing-function: ${motion.easings.exit};
  }
  @starting-style {
    &:not([hidden]) {
      opacity: 0;
      transform: translateY(calc(-1 * ${spacing[1]}));
    }
  }
`
const fadeContent = keyframes`from { opacity: 0.4; } to { opacity: 1; }`
export const contentMotion = css`
  animation: ${fadeContent} ${motion.durations.normal} ${motion.easings.entrance};
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
