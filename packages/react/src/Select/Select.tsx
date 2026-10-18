import type { SelectHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { InputSize } from '../Input'
import type { FieldMessages } from '../internal/Field'
import { Field, useField } from '../internal/Field'
import { StyledSelect } from './Select.style'
export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, FieldMessages {
  size?: InputSize
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    id,
    label,
    helpText,
    error,
    size = 'medium',
    'aria-describedby': describedBy,
    'aria-invalid': invalid,
    ...props
  },
  ref,
) {
  const field = useField(id, helpText, error, describedBy, invalid)
  return (
    <Field {...{ label, helpText, error }} id={field.id}>
      <StyledSelect {...props} {...field} ref={ref} controlSize={size} />
    </Field>
  )
})
