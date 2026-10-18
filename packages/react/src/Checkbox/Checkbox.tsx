import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import { Text } from '../Text'
import { CheckboxControl, CheckboxLabel, CheckboxMark, StyledCheckbox } from './Checkbox.style'

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'children'
> {
  label?: ReactNode
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, indeterminate = false, disabled, ...props },
  forwardedRef,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)
  const hasLabel = label != null
  useImperativeHandle(forwardedRef, () => inputRef.current!, [])
  useLayoutEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  })

  return (
    <CheckboxLabel data-checkbox-root disabled={disabled}>
      <CheckboxControl hasLabel={hasLabel}>
        <StyledCheckbox
          {...props}
          disabled={disabled}
          id={inputId}
          ref={inputRef}
          type="checkbox"
        />
        <CheckboxMark aria-hidden="true" data-checkbox-mark />
      </CheckboxControl>
      {hasLabel && (
        <Text as="label" color="inherit" htmlFor={inputId} variant="body">
          {label}
        </Text>
      )}
    </CheckboxLabel>
  )
})
