import type { HTMLAttributes, ReactNode } from 'react'
import { useId } from 'react'
import { useControllableState } from '../internal/useControllableState'
import { TabButton, TabList, TabPanel, TabsRoot } from './Tabs.style'
export interface TabItem {
  id: string
  label: ReactNode
  content: ReactNode
  disabled?: boolean
}
export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  label: string
}
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  label,
  ...props
}: TabsProps) {
  const baseId = useId()
  const enabled = items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i !== -1)
  const [selection, select] = useControllableState(
    value,
    defaultValue ?? items[enabled[0]]?.id,
    onValueChange,
  )
  const active = items.findIndex((item) => item.id === selection && !item.disabled)
  const selectedIndex = active >= 0 ? active : (enabled[0] ?? -1)
  return (
    <TabsRoot {...props} data-orientation={orientation}>
      <TabList aria-label={label} aria-orientation={orientation} role="tablist">
        {items.map((item, index) => (
          <TabButton
            aria-controls={`${baseId}-panel-${index}`}
            aria-selected={index === selectedIndex}
            disabled={item.disabled}
            id={`${baseId}-tab-${index}`}
            key={item.id}
            onClick={() => select(item.id)}
            role="tab"
            tabIndex={index === selectedIndex ? 0 : -1}
            type="button"
            onKeyDown={(event) => {
              const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown'
              const previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp'
              if (![nextKey, previousKey, 'Home', 'End'].includes(event.key) || !enabled.length)
                return
              event.preventDefault()
              const currentIndex = enabled.indexOf(index)
              const destination =
                event.key === 'Home'
                  ? enabled[0]
                  : event.key === 'End'
                    ? enabled[enabled.length - 1]
                    : enabled[
                        (currentIndex + (event.key === nextKey ? 1 : -1) + enabled.length) %
                          enabled.length
                      ]
              select(items[destination].id)
              document.getElementById(`${baseId}-tab-${destination}`)?.focus()
            }}
          >
            {item.label}
          </TabButton>
        ))}
      </TabList>
      {items.map((item, index) => (
        <TabPanel
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== selectedIndex}
          id={`${baseId}-panel-${index}`}
          key={item.id}
          role="tabpanel"
          tabIndex={0}
        >
          {item.content}
        </TabPanel>
      ))}
    </TabsRoot>
  )
}
