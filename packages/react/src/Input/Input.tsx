import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId, useImperativeHandle, useRef } from 'react'
import { Text } from '../Text'
import { ClearButton, InputControl, InputRoot, StyledInput } from './Input.style'

export type InputSize = 'small' | 'medium' | 'large'

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'children'
> {
  size?: InputSize
  label?: ReactNode
  helpText?: ReactNode
  error?: ReactNode
  clearable?: boolean
  clearLabel?: string
  /** In controlled mode, update value here. Clearing does not synthesize an onChange event. */
  onClear?: () => void
}

const clearableTypes = new Set(['text', 'search', 'email', 'tel', 'url', 'password'])

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    helpText,
    error,
    size = 'medium',
    type = 'text',
    disabled,
    readOnly,
    value,
    defaultValue,
    onChange,
    placeholder,
    clearable = false,
    clearLabel = 'Limpar campo',
    onClear,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
    ...props
  },
  forwardedRef,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(forwardedRef, () => inputRef.current!, [])

  const hasError = Boolean(error)
  const invalid =
    hasError || (ariaInvalid != null && ariaInvalid !== false && ariaInvalid !== 'false')
  const description =
    [describedBy, helpText ? `${inputId}-help` : null, hasError ? `${inputId}-error` : null]
      .filter(Boolean)
      .join(' ') || undefined
  const showClear = clearable && clearableTypes.has(type) && !disabled && !readOnly
  const messageVariant = size === 'small' ? 'caption' : 'body'

  function handleClear() {
    const input = inputRef.current
    if (!input) return
    if (value === undefined) {
      input.value = ''
    }
    onClear?.()
    input.focus()
  }

  return (
    <InputRoot>
      {label != null && (
        <Text as="label" color="neutral.600" htmlFor={inputId} variant="body">
          {label}
        </Text>
      )}
      <InputControl data-input-control size={size}>
        <StyledInput
          {...props}
          aria-describedby={description}
          aria-invalid={hasError ? true : ariaInvalid}
          defaultValue={defaultValue}
          disabled={disabled}
          hasClear={showClear}
          id={inputId}
          invalid={invalid}
          onChange={onChange}
          placeholder={showClear ? placeholder || ' ' : placeholder}
          readOnly={readOnly}
          ref={inputRef}
          controlSize={size}
          type={type}
          value={value}
        />
        {showClear && (
          <ClearButton aria-label={clearLabel} onClick={handleClear} size={size} type="button" />
        )}
      </InputControl>
      {helpText && (
        <Text color="neutral.600" id={`${inputId}-help`} variant={messageVariant}>
          {helpText}
        </Text>
      )}
      {hasError && (
        <Text color="danger.800" id={`${inputId}-error`} variant={messageVariant}>
          {error}
        </Text>
      )}
    </InputRoot>
  )
})
