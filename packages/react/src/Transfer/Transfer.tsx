import { useId, useRef, useState } from 'react'
import type { FieldsetHTMLAttributes, ReactNode } from 'react'
import { Input } from '../Input'
import { Checkbox } from '../Checkbox'
import { Button } from '../Button'
import { Text } from '../Text'
import { useControllableState } from '../internal/useControllableState'
import { useCompositeReset } from '../internal/useCompositeReset'
import {
  TransferRoot,
  TransferLayout,
  TransferPanel,
  TransferList,
  TransferActions,
} from './Transfer.style'
export interface TransferItem {
  id: string
  label: string
  disabled?: boolean
}
export interface TransferProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'onChange' | 'defaultValue' | 'children'
> {
  label: ReactNode
  items: readonly TransferItem[]
  targetKeys?: readonly string[]
  defaultTargetKeys?: readonly string[]
  onTargetKeysChange?: (keys: string[]) => void
  sourceLabel?: string
  targetLabel?: string
  emptyLabel?: string
  helpText?: ReactNode
}
export function Transfer({
  label,
  items,
  targetKeys,
  defaultTargetKeys = [],
  onTargetKeysChange,
  sourceLabel = 'Disponíveis',
  targetLabel = 'Selecionados',
  emptyLabel = 'Nenhum item.',
  helpText,
  disabled,
  name,
  id,
  'aria-describedby': describedBy,
  ...props
}: TransferProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const ref = useRef<HTMLFieldSetElement>(null)
  const [keys, setKeys] = useControllableState<readonly string[]>(
    targetKeys,
    defaultTargetKeys,
    (next) => onTargetKeysChange?.([...next]),
  )
  const [checked, setChecked] = useState<string[]>([])
  const [queries, setQueries] = useState(['', ''])
  useCompositeReset(ref, () => {
    if (targetKeys === undefined) setKeys(defaultTargetKeys)
    setChecked([])
    setQueries(['', ''])
  })
  const target = new Set(keys)
  const sourceChecked = items
    .filter((item) => !item.disabled && !target.has(item.id) && checked.includes(item.id))
    .map((item) => item.id)
  const targetChecked = items
    .filter((item) => !item.disabled && target.has(item.id) && checked.includes(item.id))
    .map((item) => item.id)
  function move(toTarget: boolean) {
    const moving = toTarget ? sourceChecked : targetChecked
    const next = toTarget
      ? [...new Set([...keys, ...moving])]
      : keys.filter((key) => !moving.includes(key))
    setKeys(next)
    setChecked(checked.filter((key) => !moving.includes(key)))
  }
  return (
    <TransferRoot
      {...props}
      ref={ref}
      id={fieldId}
      disabled={disabled}
      aria-describedby={
        [describedBy, helpText ? `${fieldId}-help` : ''].filter(Boolean).join(' ') || undefined
      }
    >
      <legend>{label}</legend>
      <TransferLayout>
        {[sourceLabel, targetLabel].map((panelLabel, side) => {
          const visible = items.filter(
            (item) =>
              target.has(item.id) === Boolean(side) &&
              item.label.toLocaleLowerCase().includes(queries[side].toLocaleLowerCase()),
          )
          const eligible = visible.filter((item) => !item.disabled)
          const count = eligible.filter((item) => checked.includes(item.id)).length
          return (
            <TransferPanel key={side}>
              <legend>
                {panelLabel} ({items.filter((item) => target.has(item.id) === Boolean(side)).length}
                )
              </legend>
              <Input
                label={`Buscar em ${panelLabel}`}
                type="search"
                size="small"
                value={queries[side]}
                onChange={(event) =>
                  setQueries(
                    queries.map((query, index) =>
                      index === side ? event.currentTarget.value : query,
                    ),
                  )
                }
              />
              <Checkbox
                label="Selecionar itens visíveis"
                disabled={!eligible.length}
                checked={!!eligible.length && count === eligible.length}
                indeterminate={count > 0 && count < eligible.length}
                onChange={(event) => {
                  const visibleKeys = eligible.map((item) => item.id)
                  setChecked(
                    event.currentTarget.checked
                      ? [...new Set([...checked, ...visibleKeys])]
                      : checked.filter((key) => !visibleKeys.includes(key)),
                  )
                }}
              />
              <TransferList>
                {visible.map((item) => (
                  <li key={item.id}>
                    <Checkbox
                      label={item.label}
                      disabled={item.disabled}
                      checked={checked.includes(item.id)}
                      onChange={(event) =>
                        setChecked(
                          event.currentTarget.checked
                            ? [...checked, item.id]
                            : checked.filter((key) => key !== item.id),
                        )
                      }
                    />
                  </li>
                ))}
              </TransferList>
              {!visible.length && <Text>{emptyLabel}</Text>}
            </TransferPanel>
          )
        })}
        <TransferActions>
          <Button
            variant="outline"
            size="small"
            disabled={disabled || !sourceChecked.length}
            onClick={() => move(true)}
          >
            Adicionar selecionados
          </Button>
          <Button
            variant="ghost"
            size="small"
            disabled={disabled || !targetChecked.length}
            onClick={() => move(false)}
          >
            Remover selecionados
          </Button>
        </TransferActions>
      </TransferLayout>
      {helpText && (
        <Text id={`${fieldId}-help`} color="neutral.600">
          {helpText}
        </Text>
      )}
      {name &&
        items
          .filter((item) => target.has(item.id))
          .map((item) => <input key={item.id} type="hidden" name={name} value={item.id} />)}
    </TransferRoot>
  )
}
