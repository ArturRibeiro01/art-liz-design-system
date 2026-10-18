import { useEffect } from 'react'
import type { RefObject } from 'react'
export function useCompositeReset(ref: RefObject<HTMLFieldSetElement | null>, reset: () => void) {
  useEffect(() => {
    const form = ref.current?.form
    if (!form) return
    const listener = (event: Event) => {
      queueMicrotask(() => {
        if (!event.defaultPrevented) reset()
      })
    }
    form.addEventListener('reset', listener)
    return () => form.removeEventListener('reset', listener)
  }, [ref, reset])
}
