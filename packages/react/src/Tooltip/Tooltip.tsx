import { motion } from '@art-liz/tokens'
import type { SemanticIntent } from '../internal/intent'
import { useInert } from '../internal/useInert'
import type { ReactElement, ReactNode } from 'react'
import { cloneElement, useEffect, useId, useRef, useState } from 'react'
import { positionFloating } from '../internal/floating'
import { TooltipRoot, TooltipSurface } from './Tooltip.style'
export interface TooltipProps {
  children: ReactElement<{ 'aria-describedby'?: string }>
  intent?: SemanticIntent
  content: ReactNode
}
export function Tooltip({ children, content, intent = 'neutral' }: TooltipProps) {
  const id = useId()
  const anchor = useRef<HTMLSpanElement>(null)
  const surface = useRef<HTMLSpanElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [hover, setHover] = useState(false)
  const [focused, setFocused] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const open = (hover || focused) && !dismissed
  useInert(surface, !open)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (!open) return
    const place = () => {
      if (anchor.current && surface.current) positionFloating(anchor.current, surface.current)
    }
    place()
    window.addEventListener('resize', place)
    document.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      document.removeEventListener('scroll', place, true)
    }
  }, [open])
  return (
    <TooltipRoot
      ref={anchor}
      onMouseEnter={() => {
        clearTimeout(timer.current)
        setHover(true)
        setDismissed(false)
      }}
      onMouseLeave={() => {
        timer.current = setTimeout(() => setHover(false), Number.parseFloat(motion.durations.fast))
      }}
      onFocus={() => {
        setFocused(true)
        setDismissed(false)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
      }}
      onKeyDown={(event) => {
        if (open && event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          setDismissed(true)
        }
      }}
    >
      {cloneElement(children, {
        'aria-describedby': [children.props['aria-describedby'], id].filter(Boolean).join(' '),
      })}
      <TooltipSurface
        intent={intent}
        aria-hidden={!open}
        hidden={!open}
        id={id}
        ref={surface}
        role="tooltip"
      >
        {content}
      </TooltipSurface>
    </TooltipRoot>
  )
}
