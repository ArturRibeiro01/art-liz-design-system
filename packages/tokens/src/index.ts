export { breakpoints } from './breakpoints'
export { colorCssVariables, colors, colorValues } from './colors'
export { focus } from './focus'
export { motion } from './motion'
export { radii } from './radii'
export { shadows } from './shadows'
export { spacing } from './spacing'
export { typography } from './typography'
export { zIndices } from './zIndices'

import { breakpoints } from './breakpoints'
import { colorCssVariables, colors, colorValues } from './colors'
import { focus } from './focus'
import { motion } from './motion'
import { radii } from './radii'
import { shadows } from './shadows'
import { spacing } from './spacing'
import { typography } from './typography'
import { zIndices } from './zIndices'

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
