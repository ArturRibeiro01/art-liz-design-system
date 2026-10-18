import {
  clearLarge,
  clearMedium,
  clearSmall,
  clearLargeHover,
  clearMediumHover,
  clearSmallHover,
  clearLargeActive,
  clearMediumActive,
  clearSmallActive,
} from '../Icons/assets'
import { colors, focus, radii, spacing, typography } from '@art-liz/tokens'
import styled from '@emotion/styled'
import type { InputSize } from './Input'

const sizes = {
  small: {
    height: '24px',
    inset: spacing[2],
    text: typography.textStyles.caption,
    clear: '12px',
    gap: spacing[1],
    icon: [clearSmall, clearSmallHover, clearSmallActive],
  },
  medium: {
    height: '36px',
    inset: spacing[3],
    text: typography.textStyles.body,
    clear: '14px',
    gap: spacing[2],
    icon: [clearMedium, clearMediumHover, clearMediumActive],
  },
  large: {
    height: '40px',
    inset: spacing[3],
    text: typography.textStyles.subtitle,
    clear: '16px',
    gap: spacing[2],
    icon: [clearLarge, clearLargeHover, clearLargeActive],
  },
} satisfies Record<InputSize, object>

export const InputRoot = styled.div`
  display: grid;
  gap: ${spacing[1]};
  min-width: 0;
  width: 100%;
  overflow-wrap: anywhere;
`

export const InputControl = styled('div', {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: InputSize }>`
  height: ${({ size }) => sizes[size].height};
  min-width: 0;
  position: relative;
`

export const StyledInput = styled('input', {
  shouldForwardProp: (prop) => !['controlSize', 'invalid', 'hasClear'].includes(prop),
})<{ controlSize: InputSize; invalid: boolean; hasClear: boolean }>`
  appearance: none;
  background: ${colors.white};
  border: 1px solid ${({ invalid }) => (invalid ? colors.danger[600] : colors.neutral[300])};
  border-radius: ${radii.small};
  box-sizing: border-box;
  caret-color: ${colors.neutral[700]};
  color: ${colors.neutral[600]};
  display: block;
  font-family: ${typography.fontFamilies.component};
  font-size: ${({ controlSize }) => sizes[controlSize].text.fontSize};
  font-weight: ${typography.fontWeights.regular};
  height: 100%;
  letter-spacing: 0;
  line-height: ${({ controlSize }) => sizes[controlSize].text.lineHeight};
  min-width: 0;
  outline: none;
  padding-block: 0;
  padding-inline: ${({ controlSize }) => `calc(${sizes[controlSize].inset} - 1px)`};
  width: 100%;

  &::placeholder {
    color: ${colors.neutral[400]};
    opacity: 1;
  }

  &:hover:not(:disabled) {
    border-color: ${({ invalid }) => (invalid ? colors.danger[600] : colors.primary[500])};
  }

  &:focus:not(:disabled),
  &:has(+ button:focus):not(:disabled) {
    border-color: ${({ invalid }) => (invalid ? colors.danger[600] : colors.primary[600])};
    box-shadow: 0 0 1px 1px color-mix(in srgb, ${colors.primary[600]} 16%, transparent);
  }

  &:focus-visible {
    outline: ${focus.ringWidth} ${focus.ringStyle} ${focus.ringColor};
    outline-offset: ${focus.ringOffset};
  }

  &:disabled {
    background: ${colors.neutral[50]};
    border-color: ${colors.neutral[200]};
    color: ${colors.neutral[400]};
    cursor: not-allowed;
    opacity: 1;
    -webkit-text-fill-color: ${colors.neutral[400]};
  }

  &:disabled::placeholder {
    color: ${colors.neutral[300]};
    -webkit-text-fill-color: ${colors.neutral[300]};
  }

  ${({ controlSize, hasClear }) => hasClear && `&:not(:placeholder-shown) { padding-inline-end: calc(${sizes[controlSize].inset} + ${sizes[controlSize].clear} + ${sizes[controlSize].gap} - 1px); }`}

  &::-webkit-search-cancel-button {
    appearance: none;
  }
`

export const ClearButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'size',
})<{ size: InputSize }>`
  appearance: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  height: ${({ size }) => sizes[size].clear};
  inset-inline-end: ${({ size }) => sizes[size].inset};
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;
  width: ${({ size }) => sizes[size].clear};

  &::before {
    background: ${colors.neutral[400]};
    content: '';
    inset: 0;
    mask: url(${({ size }) => JSON.stringify(sizes[size].icon[0])}) center / contain no-repeat;
    position: absolute;
  }

  [data-input-control]:focus-within input:not(:placeholder-shown) + & {
    visibility: visible;
  }
  &:hover::before {
    background: ${colors.neutral[500]};
    mask-image: url(${({ size }) => JSON.stringify(sizes[size].icon[1])});
  }
  &:active::before {
    background: ${colors.neutral[600]};
    mask-image: url(${({ size }) => JSON.stringify(sizes[size].icon[2])});
  }
  &:focus-visible {
    outline: ${focus.ringWidth} ${focus.ringStyle} ${focus.ringColor};
    outline-offset: ${focus.ringOffset};
  }
`
