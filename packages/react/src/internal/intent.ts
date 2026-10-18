import { colors } from '@art-liz/tokens'
export type SemanticIntent = 'neutral' | 'primary' | 'danger' | 'success' | 'info' | 'warning'
export const intentColors = {
  neutral: colors.neutral,
  primary: colors.primary,
  danger: colors.danger,
  success: colors.success,
  info: colors.info,
  warning: colors.warning,
} as const
export const intentText = (intent: SemanticIntent) =>
  intent === 'warning' ? colors.neutral[700] : intentColors[intent][900]
