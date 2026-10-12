export { breakpoints } from './breakpoints.js'
export { colorCssVariables, colors, colorValues } from './colors.js'
export { focus } from './focus.js'
export { motion } from './motion.js'
export { radii } from './radii.js'
export { shadows } from './shadows.js'
export { spacing } from './spacing.js'
export { typography } from './typography.js'
export { zIndices } from './zIndices.js'

import { breakpoints } from './breakpoints.js'
import { colorCssVariables, colors, colorValues } from './colors.js'
import { focus } from './focus.js'
import { motion } from './motion.js'
import { radii } from './radii.js'
import { shadows } from './shadows.js'
import { spacing } from './spacing.js'
import { typography } from './typography.js'
import { zIndices } from './zIndices.js'

export const tokens = {
  breakpoints,
  colorCssVariables,
  colorValues,
  colors,
  focus,
  motion,
  radii,
  shadows,
  spacing,
  typography,
  zIndices,
} as const

export type DesignTokens = typeof tokens
