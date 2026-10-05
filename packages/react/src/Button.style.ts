import { colors, focus, motion, radii, spacing, typography } from '@art-liz/tokens'
import styled from '@emotion/styled'
import type { ButtonIntent, ButtonSize, ButtonVariant } from './Button'

type ButtonVisualState = {
  background: string
  borderColor: string
  color: string
  textDecoration?: string
}

type ButtonVariantStyles = {
  base: ButtonVisualState
  hover: ButtonVisualState
  active: ButtonVisualState
  disabled: ButtonVisualState
}

type IntentPalette = typeof colors.primary

const intentPalettes: Record<ButtonIntent, IntentPalette> = {
  primary: colors.primary,
  danger: colors.danger,
  success: colors.success,
  info: colors.info,
  warning: colors.warning,
}

const createVariantStyles = (
  palette: IntentPalette,
): Record<ButtonVariant, ButtonVariantStyles> => ({
  primary: {
    base: {
      background: palette[600],
      borderColor: palette[600],
      color: colors.white,
    },
    hover: {
      background: palette[400],
      borderColor: palette[400],
      color: colors.white,
    },
    active: {
      background: palette[700],
      borderColor: palette[700],
      color: colors.white,
    },
    disabled: {
      background: palette[300],
      borderColor: palette[300],
      color: colors.white,
    },
  },
  outline: {
    base: {
      background: 'transparent',
      borderColor: palette[300],
      color: palette[600],
    },
    hover: {
      background: palette[50],
      borderColor: palette[400],
      color: palette[700],
    },
    active: {
      background: palette[100],
      borderColor: palette[700],
      color: palette[800],
    },
    disabled: {
      background: 'transparent',
      borderColor: colors.neutral[300],
      color: colors.neutral[400],
    },
  },
  ghost: {
    base: {
      background: 'transparent',
      borderColor: 'transparent',
      color: palette[600],
    },
    hover: {
      background: palette[50],
      borderColor: 'transparent',
      color: palette[700],
    },
    active: {
      background: palette[100],
      borderColor: 'transparent',
      color: palette[800],
    },
    disabled: {
      background: 'transparent',
      borderColor: 'transparent',
      color: colors.neutral[400],
    },
  },
  link: {
    base: {
      background: 'transparent',
      borderColor: 'transparent',
      color: palette[600],
      textDecoration: 'none',
    },
    hover: {
      background: 'transparent',
      borderColor: 'transparent',
      color: palette[700],
      textDecoration: 'underline',
    },
    active: {
      background: 'transparent',
      borderColor: 'transparent',
      color: palette[800],
      textDecoration: 'underline',
    },
    disabled: {
      background: 'transparent',
      borderColor: 'transparent',
      color: palette[300],
      textDecoration: 'none',
    },
  },
})

const intentVariantStyles: Record<ButtonIntent, Record<ButtonVariant, ButtonVariantStyles>> = {
  primary: createVariantStyles(intentPalettes.primary),
  danger: createVariantStyles(intentPalettes.danger),
  success: createVariantStyles(intentPalettes.success),
  info: createVariantStyles(intentPalettes.info),
  warning: createVariantStyles(intentPalettes.warning),
}

const sizeStyles: Record<
  ButtonSize,
  { gap: string; minHeight: string; padding: string; fontSize: string }
> = {
  small: {
    gap: spacing[2],
    minHeight: '32px',
    padding: `${spacing[2]} ${spacing[3]}`,
    fontSize: typography.fontSizes.sm,
  },
  medium: {
    gap: spacing[2],
    minHeight: '40px',
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSizes.md,
  },
  large: {
    gap: spacing[3],
    minHeight: '48px',
    padding: `${spacing[3]} ${spacing[6]}`,
    fontSize: typography.fontSizes.lg,
  },
}

export const StyledButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'intent' && prop !== 'variant' && prop !== 'size',
})<{ intent: ButtonIntent; variant: ButtonVariant; size: ButtonSize }>`
  align-items: center;
  background: ${({ intent, variant }) => intentVariantStyles[intent][variant].base.background};
  border: 1px solid
    ${({ intent, variant }) => intentVariantStyles[intent][variant].base.borderColor};
  border-radius: ${radii.small};
  color: ${({ intent, variant }) => intentVariantStyles[intent][variant].base.color};
  cursor: pointer;
  display: inline-flex;
  font-family: ${typography.fontFamilies.component};
  font-size: ${({ size }) => sizeStyles[size].fontSize};
  font-weight: ${typography.fontWeights.regular};
  gap: ${({ size }) => sizeStyles[size].gap};
  justify-content: center;
  line-height: ${typography.lineHeights.normal};
  min-height: ${({ size }) => sizeStyles[size].minHeight};
  padding: ${({ size }) => sizeStyles[size].padding};
  transition:
    background ${motion.durations.normal} ${motion.easings.standard},
    border-color ${motion.durations.normal} ${motion.easings.standard},
    color ${motion.durations.normal} ${motion.easings.standard};

  &:hover:not(:disabled) {
    background: ${({ intent, variant }) => intentVariantStyles[intent][variant].hover.background};
    border-color: ${({ intent, variant }) => intentVariantStyles[intent][variant].hover.borderColor};
    color: ${({ intent, variant }) => intentVariantStyles[intent][variant].hover.color};
    text-decoration: ${({ intent, variant }) =>
      intentVariantStyles[intent][variant].hover.textDecoration ?? 'none'};
  }

  &:active:not(:disabled) {
    background: ${({ intent, variant }) => intentVariantStyles[intent][variant].active.background};
    border-color: ${({ intent, variant }) => intentVariantStyles[intent][variant].active.borderColor};
    color: ${({ intent, variant }) => intentVariantStyles[intent][variant].active.color};
    text-decoration: ${({ intent, variant }) =>
      intentVariantStyles[intent][variant].active.textDecoration ?? 'none'};
  }

  &:focus-visible {
    outline: ${focus.ringWidth} ${focus.ringStyle} ${focus.ringColor};
    outline-offset: ${focus.ringOffset};
  }

  & > span {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: center;
    line-height: 1;
  }

  & > span > svg {
    display: block;
    height: 1em;
    width: 1em;
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ intent, variant }) => intentVariantStyles[intent][variant].disabled.background};
    border-color: ${({ intent, variant }) => intentVariantStyles[intent][variant].disabled.borderColor};
    color: ${({ intent, variant }) => intentVariantStyles[intent][variant].disabled.color};
    text-decoration: ${({ intent, variant }) =>
      intentVariantStyles[intent][variant].disabled.textDecoration ?? 'none'};
  }
`
