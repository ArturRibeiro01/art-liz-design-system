import type { DialogHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react'
import { Text } from '../Text'
import { useBodyScrollLock } from '../internal/useBodyScrollLock'
import { focusableElements } from '../internal/focusable'
import { DialogClose, DialogHeader, DialogBody, DialogFooter, StyledDialog } from './Dialog.style'
export interface DialogProps extends Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  'open' | 'onClose' | 'title'
> {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  footer?: ReactNode
  closeLabel?: string
  dismissOnBackdrop?: boolean
}
export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog(
  {
    open,
    onClose,
    title,
    description,
    children,
    footer,
    closeLabel = 'Fechar diálogo',
    dismissOnBackdrop = true,
    onCancel,
    onClick,
    onKeyDown,
    'aria-labelledby': labelledBy,
    'aria-describedby': describedBy,
    ...props
  },
  forwardedRef,
) {
  const id = useId()
  const ref = useRef<HTMLDialogElement>(null)
  useImperativeHandle(forwardedRef, () => ref.current!, [])
  useBodyScrollLock(open)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [open])
  return (
    <StyledDialog
      {...props}
      aria-describedby={
        [describedBy, description ? `${id}-description` : ''].filter(Boolean).join(' ') || undefined
      }
      aria-labelledby={labelledBy ?? `${id}-title`}
      ref={ref}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || event.key !== 'Tab' || !event.currentTarget.matches(':modal'))
          return
        const elements = focusableElements(event.currentTarget)
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
      onCancel={(event) => {
        onCancel?.(event)
        if (!event.defaultPrevented) {
          event.preventDefault()
          onClose()
        }
      }}
      onClose={() => {
        if (open && !ref.current?.open) onClose()
      }}
      onClick={(event) => {
        onClick?.(event)
        if (
          event.defaultPrevented ||
          !dismissOnBackdrop ||
          event.target !== event.currentTarget ||
          event.detail === 0
        )
          return
        const rect = event.currentTarget.getBoundingClientRect()
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose()
      }}
    >
      <DialogHeader>
        <div>
          <Text as="h2" id={`${id}-title`} variant="title" weight="semibold">
            {title}
          </Text>
          {description && (
            <Text id={`${id}-description`} color="neutral.600">
              {description}
            </Text>
          )}
        </div>
        <DialogClose aria-label={closeLabel} onClick={onClose} type="button">
          ×
        </DialogClose>
      </DialogHeader>
      <DialogBody>{children}</DialogBody>
      {footer != null && <DialogFooter>{footer}</DialogFooter>}
    </StyledDialog>
  )
})
