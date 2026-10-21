import { useEffect } from 'react'
import type { RefObject } from 'react'
// Toggle the native attribute rather than a boolean JSX prop, including React 18 consumers.
export function useInert(ref: RefObject<HTMLElement | null>, inactive: boolean) {
  useEffect(() => {
    ref.current?.toggleAttribute('inert', inactive)
  }, [ref, inactive])
}
