export const colors = {
  ink: '#142923',
  forest: '#236b58',
  moss: '#a9c6a1',
  paper: '#f4f6f3',
  white: '#ffffff',
  muted: '#52615b',
  border: '#d8dedb',
  danger: '#b23a48',
} as const

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
} as const

export const radii = {
  small: '4px',
  medium: '8px',
  pill: '999px',
} as const

export const tokens = { colors, spacing, radii } as const

export type DesignTokens = typeof tokens
