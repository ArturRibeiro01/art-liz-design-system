import type { InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { FieldMessages } from '../internal/Field'
import { Field, useField } from '../internal/Field'
import { StyledSlider } from './Slider.style'
export interface SliderProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'children'>,
    FieldMessages {}
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
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
      <StyledSlider {...props} {...field} ref={ref} type="range" />
    </Field>
  )
})
