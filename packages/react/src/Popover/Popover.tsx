import type { HTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'
import { Text } from '../Text'
import { useNativePopover } from '../internal/floating'
import { PopoverSurface, PopoverTrigger } from './Popover.style'
export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  trigger: ReactNode
  title: ReactNode
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}
export function Popover({
  trigger,
  title,
  children,
  onOpenChange,
  disabled,
  ...props
}: PopoverProps) {
  const id = useId()
  const { triggerRef, surfaceRef, open, toggle, hide } = useNativePopover(onOpenChange)
  return (
    <>
      <PopoverTrigger
        aria-controls={id}
        aria-expanded={open}
        aria-haspopup="dialog"
        disabled={disabled}
        onClick={() => {
          toggle()
          if (surfaceRef.current?.matches(':popover-open')) surfaceRef.current.focus()
        }}
        ref={triggerRef}
        type="button"
      >
        {trigger}
      </PopoverTrigger>
      <PopoverSurface
        {...props}
        aria-labelledby={`${id}-title`}
        id={id}
        popover="auto"
        ref={surfaceRef}
        role="dialog"
        tabIndex={-1}
        onKeyDown={(event) => {
          props.onKeyDown?.(event)
          if (!event.defaultPrevented && event.key === 'Escape') {
            event.preventDefault()
            event.stopPropagation()
            hide(true)
          }
        }}
      >
        <Text as="h2" id={`${id}-title`} variant="subtitle" weight="semibold">
          {title}
        </Text>
        {children}
      </PopoverSurface>
    </>
  )
}
