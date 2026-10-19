import type { TextareaHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { InputSize } from '../Input'
import type { FieldMessages } from '../internal/Field'
import { Field, useField } from '../internal/Field'
import { StyledTextarea } from './Textarea.style'
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldMessages {
  size?: InputSize
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    id,
    label,
    helpText,
    error,
    size = 'medium',
    rows = 3,
    'aria-describedby': describedBy,
    'aria-invalid': invalid,
    ...props
  },
  ref,
) {
  const field = useField(id, helpText, error, describedBy, invalid)
  return (
    <Field {...{ label, helpText, error }} id={field.id}>
      <StyledTextarea {...props} {...field} ref={ref} rows={rows} controlSize={size} />
    </Field>
  )
})
