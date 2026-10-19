import type { ReactNode } from 'react'
import { useId, useRef } from 'react'
import { useNativePopover } from '../internal/floating'
import { DropdownSurface, DropdownTrigger, MenuItem } from './Dropdown.style'
export interface DropdownItem {
  id: string
  label: ReactNode
  disabled?: boolean
  onSelect?: () => void
}
export interface DropdownProps {
  trigger: ReactNode
  label: string
  items: DropdownItem[]
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
}
export function Dropdown({ trigger, label, items, disabled, onOpenChange }: DropdownProps) {
  const id = useId()
  const { triggerRef, surfaceRef, open, show, hide, toggle } = useNativePopover(onOpenChange)
  const search = useRef({ text: '', time: 0 })
  const enabledItems = () => [
    ...(surfaceRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []),
  ]
  function openAtEnd(last = false) {
    show()
    const buttons = enabledItems()
    buttons[last ? buttons.length - 1 : 0]?.focus()
  }
  return (
    <>
      <DropdownTrigger
        aria-controls={id}
        aria-expanded={open}
        aria-haspopup="menu"
        disabled={disabled}
        onClick={() => {
          toggle()
          if (surfaceRef.current?.matches(':popover-open')) enabledItems()[0]?.focus()
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            openAtEnd(event.key === 'ArrowUp')
          }
        }}
        ref={triggerRef}
        type="button"
      >
        {trigger}
      </DropdownTrigger>
      <DropdownSurface
        aria-label={label}
        id={id}
        popover="auto"
        ref={surfaceRef}
        role="menu"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault()
            event.stopPropagation()
            hide(true)
            return
          }
          if (event.key === 'Tab') {
            hide(true)
            return
          }
          const buttons = enabledItems()
          if (!buttons.length) return
          const current = buttons.indexOf(document.activeElement as HTMLButtonElement)
          if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault()
            const next =
              event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? buttons.length - 1
                  : (current + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) %
                    buttons.length
            buttons[next]?.focus()
          } else if (
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            event.key !== ' '
          ) {
            const now = Date.now()
            search.current.text =
              now - search.current.time > 500 ? event.key : search.current.text + event.key
            search.current.time = now
            const candidates = [...buttons.slice(current + 1), ...buttons.slice(0, current + 1)]
            candidates
              .find((button) =>
                button.textContent
                  ?.trim()
                  .toLocaleLowerCase()
                  .startsWith(search.current.text.toLocaleLowerCase()),
              )
              ?.focus()
          }
        }}
      >
        {items.map((item) => (
          <MenuItem
            disabled={item.disabled}
            key={item.id}
            onClick={() => {
              hide(true)
              item.onSelect?.()
            }}
            role="menuitem"
            tabIndex={-1}
            type="button"
          >
            {item.label}
          </MenuItem>
        ))}
      </DropdownSurface>
    </>
  )
}
