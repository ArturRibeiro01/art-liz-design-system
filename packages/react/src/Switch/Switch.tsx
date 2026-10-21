import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { ChoiceLabel } from '../internal/Field.style'
import { StyledSwitch } from './Switch.style'
export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'role' | 'size' | 'children'
> {
  label?: ReactNode
}
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, ...props },
  ref,
) {
  return (
    <ChoiceLabel>
      <StyledSwitch {...props} ref={ref} role="switch" type="checkbox" />
      {label != null && <span>{label}</span>}
    </ChoiceLabel>
  )
})
