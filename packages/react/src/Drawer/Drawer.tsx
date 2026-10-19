import type { DialogProps } from '../Dialog'
import { forwardRef } from 'react'
import { StyledDrawer } from './Drawer.style'
export interface DrawerProps extends DialogProps {
  side?: 'left' | 'right'
}
export const Drawer = forwardRef<HTMLDialogElement, DrawerProps>(function Drawer(
  { side = 'right', ...props },
  ref,
) {
  return <StyledDrawer {...props} data-side={side} ref={ref} />
})
