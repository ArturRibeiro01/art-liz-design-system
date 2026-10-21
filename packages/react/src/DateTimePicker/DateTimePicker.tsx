import { forwardRef } from 'react'
import type { InputProps } from '../Input'
import { PickerInput } from './DateTimePicker.style'
export interface DateTimePickerProps extends Omit<
  InputProps,
  'type' | 'clearable' | 'onClear' | 'clearLabel'
> {
  mode?: 'date' | 'time' | 'datetime-local'
}
export const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  function DateTimePicker({ mode = 'datetime-local', ...props }, ref) {
    return <PickerInput {...props} type={mode} ref={ref} />
  },
)
