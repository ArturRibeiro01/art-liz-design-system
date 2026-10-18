import { useState } from 'react'
export function useControllableState<T>(
  value: T | undefined,
  initial: T,
  onChange?: (value: T) => void,
) {
  const [local, setLocal] = useState(initial)
  const current = value === undefined ? local : value
  function update(next: T) {
    if (next === current) return
    if (value === undefined) setLocal(next)
    onChange?.(next)
  }
  return [current, update] as const
}
