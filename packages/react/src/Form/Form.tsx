import type { FormHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { spacing } from '@art-liz/tokens'
import { StyledForm } from './Form.style'
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  gap?: keyof typeof spacing
}
export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { gap = 4, ...props },
  ref,
) {
  return <StyledForm {...props} ref={ref} gap={gap} />
})
