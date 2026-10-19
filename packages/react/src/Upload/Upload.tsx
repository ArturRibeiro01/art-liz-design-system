import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { FieldMessages } from '../internal/Field'
import { Field, useField } from '../internal/Field'
import { StyledUpload } from './Upload.style'
export interface UploadProps
  extends
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'type' | 'value' | 'defaultValue' | 'size' | 'children'
    >,
    FieldMessages {}
export const Upload = forwardRef<HTMLInputElement, UploadProps>(function Upload(
  {
    id,
    label,
    helpText,
    error,
    'aria-describedby': describedBy,
    'aria-invalid': invalid,
    ...props
  },
  ref,
) {
  const field = useField(id, helpText, error, describedBy, invalid)
  return (
    <Field {...{ label, helpText, error }} id={field.id}>
      <StyledUpload {...props} {...field} ref={ref} type="file" />
    </Field>
  )
})
