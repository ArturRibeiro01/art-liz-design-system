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

const intentVariantStyles: Record<ButtonIntent, Record<ButtonVariant, ButtonVariantStyles>> = {
  primary: {
    primary: {
      base: {
        background: colors.primary[600],
        borderColor: colors.primary[600],
        color: colors.white,
      },
      hover: {
        background: colors.primary[400],
        borderColor: colors.primary[400],
        color: colors.white,
      },
      active: {
        background: colors.primary[700],
        borderColor: colors.primary[700],
        color: colors.white,
      },
      disabled: {
        background: colors.primary[300],
        borderColor: colors.primary[300],
        color: colors.white,
      },
    },
    outline: {
      base: {
        background: colors.white,
        borderColor: colors.neutral[300],
        color: colors.neutral[600],
      },
      hover: {
        background: colors.white,
        borderColor: colors.primary[500],
        color: colors.primary[500],
      },
      active: {
        background: colors.white,
        borderColor: colors.primary[700],
        color: colors.primary[700],
      },
      disabled: {
        background: colors.white,
        borderColor: colors.neutral[300],
        color: colors.neutral[400],
      },
    },
    ghost: {
      base: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.neutral[600],
      },
      hover: {
        background: colors.neutral[50],
        borderColor: 'transparent',
        color: colors.neutral[600],
      },
      active: {
        background: colors.neutral[200],
        borderColor: 'transparent',
        color: colors.neutral[600],
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
        color: colors.primary[600],
        textDecoration: 'none',
      },
      hover: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.primary[600],
        textDecoration: 'underline',
      },
      active: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.primary[700],
        textDecoration: 'underline',
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.primary[300],
        textDecoration: 'none',
      },
    },
  },
  danger: {
    primary: {
      base: {
        background: colors.danger[600],
        borderColor: colors.danger[600],
        color: colors.white,
      },
      hover: {
        background: colors.danger[400],
        borderColor: colors.danger[400],
        color: colors.white,
      },
      active: {
        background: colors.danger[700],
        borderColor: colors.danger[700],
        color: colors.white,
      },
      disabled: {
        background: colors.danger[300],
        borderColor: colors.danger[300],
        color: colors.white,
      },
    },
    outline: {
      base: {
        background: colors.white,
        borderColor: colors.danger[600],
        color: colors.danger[600],
      },
      hover: {
        background: colors.white,
        borderColor: colors.danger[400],
        color: colors.danger[400],
      },
      active: {
        background: colors.white,
        borderColor: colors.danger[700],
        color: colors.danger[700],
      },
      disabled: {
        background: colors.white,
        borderColor: colors.danger[300],
        color: colors.danger[400],
      },
    },
    ghost: {
      base: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.danger[600],
      },
      hover: {
        background: colors.danger[100],
        borderColor: 'transparent',
        color: colors.danger[600],
      },
      active: {
        background: colors.danger[300],
        borderColor: 'transparent',
        color: colors.danger[600],
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.danger[400],
      },
    },
    link: {
      base: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.danger[600],
        textDecoration: 'none',
      },
      hover: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.danger[400],
        textDecoration: 'underline',
      },
      active: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.danger[700],
        textDecoration: 'underline',
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.danger[300],
        textDecoration: 'none',
      },
    },
  },
  success: {
    primary: {
      base: {
        background: colors.success[600],
        borderColor: colors.success[600],
        color: colors.white,
      },
      hover: {
        background: colors.success[400],
        borderColor: colors.success[400],
        color: colors.white,
      },
      active: {
        background: colors.success[700],
        borderColor: colors.success[700],
        color: colors.white,
      },
      disabled: {
        background: colors.success[300],
        borderColor: colors.success[300],
        color: colors.white,
      },
    },
    outline: {
      base: {
        background: colors.white,
        borderColor: colors.success[600],
        color: colors.success[600],
      },
      hover: {
        background: colors.white,
        borderColor: colors.success[400],
        color: colors.success[400],
      },
      active: {
        background: colors.white,
        borderColor: colors.success[700],
        color: colors.success[700],
      },
      disabled: {
        background: colors.white,
        borderColor: colors.success[300],
        color: colors.success[400],
      },
    },
    ghost: {
      base: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.success[600],
      },
      hover: {
        background: colors.success[100],
        borderColor: 'transparent',
        color: colors.success[600],
      },
      active: {
        background: colors.success[300],
        borderColor: 'transparent',
        color: colors.success[600],
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.success[400],
      },
    },
    link: {
      base: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.success[600],
        textDecoration: 'none',
      },
      hover: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.success[400],
        textDecoration: 'underline',
      },
      active: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.success[700],
        textDecoration: 'underline',
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.success[300],
        textDecoration: 'none',
      },
    },
  },
  info: {
    primary: {
      base: {
        background: colors.info[600],
        borderColor: colors.info[600],
        color: colors.white,
      },
      hover: {
        background: colors.info[400],
        borderColor: colors.info[400],
        color: colors.white,
      },
      active: {
        background: colors.info[700],
        borderColor: colors.info[700],
        color: colors.white,
      },
      disabled: {
        background: colors.info[300],
        borderColor: colors.info[300],
        color: colors.white,
      },
    },
    outline: {
      base: {
        background: colors.white,
        borderColor: colors.info[600],
        color: colors.info[600],
      },
      hover: {
        background: colors.white,
        borderColor: colors.info[400],
        color: colors.info[400],
      },
      active: {
        background: colors.white,
        borderColor: colors.info[700],
        color: colors.info[700],
      },
      disabled: {
        background: colors.white,
        borderColor: colors.info[300],
        color: colors.info[400],
      },
    },
    ghost: {
      base: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.info[600],
      },
      hover: {
        background: colors.info[100],
        borderColor: 'transparent',
        color: colors.info[600],
      },
      active: {
        background: colors.info[300],
        borderColor: 'transparent',
        color: colors.info[600],
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.info[400],
      },
    },
    link: {
      base: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.info[600],
        textDecoration: 'none',
      },
      hover: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.info[400],
        textDecoration: 'underline',
      },
      active: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.info[700],
        textDecoration: 'underline',
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.info[300],
        textDecoration: 'none',
      },
    },
  },
  warning: {
    primary: {
      base: {
        background: colors.warning[600],
        borderColor: colors.warning[600],
        color: colors.white,
      },
      hover: {
        background: colors.warning[400],
        borderColor: colors.warning[400],
        color: colors.white,
      },
      active: {
        background: colors.warning[700],
        borderColor: colors.warning[700],
        color: colors.white,
      },
      disabled: {
        background: colors.warning[300],
        borderColor: colors.warning[300],
        color: colors.white,
      },
    },
    outline: {
      base: {
        background: colors.white,
        borderColor: colors.warning[600],
        color: colors.warning[600],
      },
      hover: {
        background: colors.white,
        borderColor: colors.warning[400],
        color: colors.warning[400],
      },
      active: {
        background: colors.white,
        borderColor: colors.warning[700],
        color: colors.warning[700],
      },
      disabled: {
        background: colors.white,
        borderColor: colors.warning[300],
        color: colors.warning[400],
      },
    },
    ghost: {
      base: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.warning[600],
      },
      hover: {
        background: colors.warning[100],
        borderColor: 'transparent',
        color: colors.warning[600],
      },
      active: {
        background: colors.warning[300],
        borderColor: 'transparent',
        color: colors.warning[600],
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.warning[400],
      },
    },
    link: {
      base: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.warning[600],
        textDecoration: 'none',
      },
      hover: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.warning[400],
        textDecoration: 'underline',
      },
      active: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.warning[700],
        textDecoration: 'underline',
      },
      disabled: {
        background: 'transparent',
        borderColor: 'transparent',
        color: colors.warning[300],
        textDecoration: 'none',
      },
    },
  },
}

const sizeStyles: Record<
  ButtonSize,
  { gap: string; minHeight: string; padding: string; iconSize: string }
> = {
  small: {
    gap: spacing[2],
    minHeight: '32px',
    padding: `${spacing[2]} ${spacing[3]}`,
    iconSize: typography.fontSizes.md,
  },
  medium: {
    gap: spacing[2],
    minHeight: '40px',
    padding: `${spacing[3]} ${spacing[4]}`,
    iconSize: typography.fontSizes.xl,
  },
  large: {
    gap: spacing[3],
    minHeight: '48px',
    padding: `${spacing[3]} ${spacing[6]}`,
    iconSize: typography.fontSizes['2xl'],
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
  gap: ${({ size }) => sizeStyles[size].gap};
  justify-content: center;
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

  & > span[data-button-icon] {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    font-size: ${({ size }) => sizeStyles[size].iconSize};
    justify-content: center;
    line-height: 1;
  }

  & > span[data-button-icon] > svg {
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
