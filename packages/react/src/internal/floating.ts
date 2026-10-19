import { useEffect, useRef, useState } from 'react'
export function positionFloating(anchor: HTMLElement, surface: HTMLElement) {
  const rect = anchor.getBoundingClientRect()
  const box = surface.getBoundingClientRect()
  const left = Math.max(8, Math.min(rect.left, window.innerWidth - box.width - 8))
  const top =
    rect.bottom + box.height + 8 <= window.innerHeight
      ? rect.bottom + 8
      : Math.max(8, rect.top - box.height - 8)
  surface.style.left = `${left}px`
  surface.style.top = `${top}px`
}
export function useNativePopover(onOpenChange?: (open: boolean) => void) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const element = surfaceRef.current
    if (!element) return
    const handleToggle = (event: Event) => {
      const next = (event as ToggleEvent).newState === 'open'
      setOpen(next)
      onOpenChange?.(next)
    }
    const handleBeforeToggle = (event: Event) => {
      const next = (event as ToggleEvent).newState === 'open'
      element.toggleAttribute('inert', !next)
      element.setAttribute('aria-hidden', String(!next))
    }
    if (!element.matches(':popover-open')) {
      element.toggleAttribute('inert', true)
      element.setAttribute('aria-hidden', 'true')
    }
    element.addEventListener('beforetoggle', handleBeforeToggle)
    element.addEventListener('toggle', handleToggle)
    return () => {
      element.removeEventListener('toggle', handleToggle)
      element.removeEventListener('beforetoggle', handleBeforeToggle)
    }
  }, [onOpenChange])
  useEffect(() => {
    if (!open) return
    const place = () => {
      if (triggerRef.current && surfaceRef.current)
        positionFloating(triggerRef.current, surfaceRef.current)
    }
    place()
    window.addEventListener('resize', place)
    document.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      document.removeEventListener('scroll', place, true)
    }
  }, [open])
  function show() {
    const surface = surfaceRef.current
    if (!surface || !triggerRef.current) return
    surface.showPopover()
    positionFloating(triggerRef.current, surface)
  }
  function hide(restoreFocus = false) {
    surfaceRef.current?.hidePopover()
    if (restoreFocus) triggerRef.current?.focus()
  }
  function toggle() {
    if (surfaceRef.current?.matches(':popover-open')) hide()
    else show()
  }
  return { triggerRef, surfaceRef, open, show, hide, toggle }
}
