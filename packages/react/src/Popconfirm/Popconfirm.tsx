import { useId } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { Text } from '../Text'
import { useNativePopover } from '../internal/floating'
import {
  ConfirmSurface,
  ConfirmTrigger,
  ConfirmActions,
  ConfirmButton,
  CancelButton,
} from './Popconfirm.style'
export interface PopconfirmProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  trigger: ReactNode
  title: ReactNode
  description?: ReactNode
  onConfirm: () => void
  onCancel?: () => void
  onOpenChange?: (open: boolean) => void
  confirmLabel?: string
  cancelLabel?: string
  disabled?: boolean
  intent?: 'primary' | 'danger'
}
export function Popconfirm({
  trigger,
  title,
  description,
  onConfirm,
  onCancel,
  onOpenChange,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  disabled,
  intent = 'primary',
  ...props
}: PopconfirmProps) {
  const id = useId()
  const { triggerRef, surfaceRef, open, toggle, hide } = useNativePopover(onOpenChange)
  function cancel() {
    hide(true)
    onCancel?.()
  }
  return (
    <>
      <ConfirmTrigger
        type="button"
        ref={triggerRef}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          toggle()
          if (surfaceRef.current?.matches(':popover-open'))
            surfaceRef.current.querySelector<HTMLButtonElement>('[data-cancel]')?.focus()
        }}
      >
        {trigger}
      </ConfirmTrigger>
      <ConfirmSurface
        {...props}
        id={id}
        ref={surfaceRef}
        popover="auto"
        role="alertdialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={description != null ? `${id}-description` : undefined}
        onKeyDown={(event) => {
          props.onKeyDown?.(event)
          if (!event.defaultPrevented && event.key === 'Escape') {
            event.preventDefault()
            event.stopPropagation()
            cancel()
          }
        }}
      >
        <Text as="h2" variant="subtitle" weight="semibold" id={`${id}-title`}>
          {title}
        </Text>
        {description != null && <Text id={`${id}-description`}>{description}</Text>}
        <ConfirmActions>
          <CancelButton variant="ghost" size="small" data-cancel onClick={cancel}>
            {cancelLabel}
          </CancelButton>
          <ConfirmButton
            variant="outline"
            size="small"
            intent={intent}
            onClick={() => {
              hide(true)
              onConfirm()
            }}
          >
            {confirmLabel}
          </ConfirmButton>
        </ConfirmActions>
      </ConfirmSurface>
    </>
  )
}
