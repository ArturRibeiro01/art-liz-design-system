import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { useControllableState } from '../internal/useControllableState'
import { FilterButton } from './FilterItem.style'
export interface FilterItemProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'aria-pressed'
> {
  selected?: boolean
  defaultSelected?: boolean
  onSelectedChange?: (selected: boolean) => void
}
export const FilterItem = forwardRef<HTMLButtonElement, FilterItemProps>(function FilterItem(
  { selected, defaultSelected = false, onSelectedChange, onClick, ...props },
  ref,
) {
  const [active, setActive] = useControllableState(selected, defaultSelected, onSelectedChange)
  return (
    <FilterButton
      {...props}
      ref={ref}
      type="button"
      aria-pressed={active}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setActive(!active)
      }}
    />
  )
})
