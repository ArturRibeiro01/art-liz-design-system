import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { ChoiceLabel } from '../internal/Field.style'
import { StyledRadio } from './Radio.style'
export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'children'
> {
  label?: ReactNode
}
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, ...props },
  ref,
) {
  return (
    <ChoiceLabel>
      <StyledRadio {...props} ref={ref} type="radio" />
      {label != null && <span>{label}</span>}
    </ChoiceLabel>
  )
})
