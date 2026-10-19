import { interactiveMotion } from '../internal/motion.style'
import { motion } from '@art-liz/tokens'
import { check, checkDisabled } from '../Icons/assets'
import { colors, focus, spacing } from '@art-liz/tokens'
import styled from '@emotion/styled'

export const CheckboxLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<{ disabled?: boolean }>`
  align-items: flex-start;
  color: ${({ disabled }) => (disabled ? colors.neutral[400] : colors.neutral[600])};
  display: inline-flex;
  gap: ${spacing[2]};
  min-width: 0;
  vertical-align: middle;

  & > label {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    min-width: 0;
    overflow-wrap: anywhere;
  }
`

export const CheckboxControl = styled('span', {
  shouldForwardProp: (prop) => prop !== 'hasLabel',
})<{ hasLabel: boolean }>`
  display: inline-flex;
  flex: 0 0 ${spacing[4]};
  height: ${spacing[4]};
  margin-top: ${({ hasLabel }) => (hasLabel ? '3px' : 0)};
  position: relative;
  width: ${spacing[4]};
`

export const CheckboxMark = styled.span`
  background: ${colors.white};
  border: 1px solid ${colors.neutral[300]};
  border-radius: 2px;
  box-sizing: border-box;
  inset: 0;
  pointer-events: none;
  position: absolute;

  &::after {
    content: '';
    display: block;
    opacity: 0;
    background: ${colors.white};
    mask: url(${JSON.stringify(check)}) center / contain no-repeat;
    transition:
      opacity ${motion.durations.fast} ${motion.easings.standard},
      transform ${motion.durations.fast} ${motion.easings.standard};
    height: 10px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.7);
    width: 10px;
  }
  ${interactiveMotion};
  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`

export const StyledCheckbox = styled.input`
  cursor: pointer;
  height: 100%;
  inset: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  width: 100%;

  &:checked + [data-checkbox-mark] {
    background: ${colors.primary[600]};
    border-color: ${colors.primary[600]};
    &::after {
      background: ${colors.white};
      display: block;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      mask: url(${JSON.stringify(check)}) center / contain no-repeat;
    }
  }

  &:indeterminate + [data-checkbox-mark] {
    background: ${colors.white};
    border-color: ${colors.neutral[300]};
    &::after {
      background: ${colors.primary[600]};
      border-radius: 1px;
      display: block;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      height: ${spacing[2]};
      mask: none;
      width: ${spacing[2]};
    }
  }

  [data-checkbox-root]:hover
    &:not(:disabled):not(:checked):not(:indeterminate)
    + [data-checkbox-mark] {
    border-color: ${colors.primary[500]};
  }

  &:focus-visible + [data-checkbox-mark] {
    outline: ${focus.ringWidth} ${focus.ringStyle} ${focus.ringColor};
    outline-offset: ${focus.ringOffset};
  }

  &:disabled {
    cursor: not-allowed;
  }
  &:disabled + [data-checkbox-mark] {
    background: ${colors.neutral[100]};
    border-color: ${colors.neutral[300]};
    &::after {
      background: ${colors.neutral[400]};
    }
  }
  &:disabled:checked:not(:indeterminate) + [data-checkbox-mark]::after {
    mask-image: url(${JSON.stringify(checkDisabled)});
  }

  @media (forced-colors: active) {
    opacity: 1;
    position: static;
    & + [data-checkbox-mark] {
      display: none;
    }
  }
`
