import type { AriaAttributes, ReactNode } from 'react'
import { useId } from 'react'
import { Text } from '../Text'
import { FieldRoot } from './Field.style'

export interface FieldMessages {
  label?: ReactNode
  helpText?: ReactNode
  error?: ReactNode
}

export function useField(
  id: string | undefined,
  helpText: ReactNode,
  error: ReactNode,
  describedBy?: string,
  invalid?: AriaAttributes['aria-invalid'],
) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  return {
    id: fieldId,
    'aria-describedby':
      [describedBy, helpText ? `${fieldId}-help` : '', error ? `${fieldId}-error` : '']
        .filter(Boolean)
        .join(' ') || undefined,
    'aria-invalid': error ? true : invalid,
  }
}

export function Field({
  id,
  label,
  helpText,
  error,
  children,
}: FieldMessages & { id: string; children: ReactNode }) {
  return (
    <FieldRoot>
      {label != null && (
        <Text as="label" htmlFor={id} color="neutral.600">
          {label}
        </Text>
      )}
      {children}
      {helpText && (
        <Text id={`${id}-help`} color="neutral.600">
          {helpText}
        </Text>
      )}
      {error && (
        <Text id={`${id}-error`} color="danger.800">
          {error}
        </Text>
      )}
    </FieldRoot>
  )
}
