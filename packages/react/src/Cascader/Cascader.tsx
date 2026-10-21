import { useId, useRef } from 'react'
import type { FieldsetHTMLAttributes, ReactNode } from 'react'
import type { InputSize } from '../Input'
import { Select } from '../Select'
import { Text } from '../Text'
import { useControllableState } from '../internal/useControllableState'
import { useCompositeReset } from '../internal/useCompositeReset'
import { CascaderRoot, CascaderLevels } from './Cascader.style'
export interface CascaderOption {
  value: string
  label: string
  disabled?: boolean
  children?: readonly CascaderOption[]
}
export interface CascaderProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'onChange' | 'defaultValue' | 'children'
> {
  label: ReactNode
  options: readonly CascaderOption[]
  value?: readonly string[]
  defaultValue?: readonly string[]
  onValueChange?: (path: string[]) => void
  helpText?: ReactNode
  error?: ReactNode
  size?: InputSize
  placeholder?: string
}
export function Cascader({
  label,
  options,
  value,
  defaultValue = [],
  onValueChange,
  helpText,
  error,
  size = 'medium',
  placeholder = 'Selecione',
  disabled,
  name,
  id,
  'aria-describedby': describedBy,
  ...props
}: CascaderProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const ref = useRef<HTMLFieldSetElement>(null)
  const [path, setPath] = useControllableState<readonly string[]>(value, defaultValue, (next) =>
    onValueChange?.([...next]),
  )
  useCompositeReset(ref, () => {
    if (value === undefined) setPath(defaultValue)
  })
  const levels: { options: readonly CascaderOption[]; value: string }[] = []
  const validPath: string[] = []
  let list = options
  let leaf: CascaderOption | undefined
  while (list.length) {
    const choice = list.find((item) => item.value === path[levels.length] && !item.disabled)
    levels.push({ options: list, value: choice?.value ?? '' })
    if (!choice) {
      leaf = undefined
      break
    }
    validPath.push(choice.value)
    leaf = choice
    list = choice.children ?? []
  }
  return (
    <CascaderRoot
      {...props}
      ref={ref}
      id={fieldId}
      disabled={disabled}
      aria-describedby={
        [describedBy, helpText ? `${fieldId}-help` : '', error ? `${fieldId}-error` : '']
          .filter(Boolean)
          .join(' ') || undefined
      }
    >
      <legend>{label}</legend>
      <CascaderLevels>
        {levels.map((level, index) => (
          <Select
            key={index}
            aria-label={`Nível ${index + 1}`}
            size={size}
            value={level.value}
            aria-invalid={error ? true : undefined}
            onChange={(event) => {
              const next = event.currentTarget.value
              setPath(next ? [...validPath.slice(0, index), next] : validPath.slice(0, index))
            }}
          >
            <option value="">{placeholder}</option>
            {level.options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </Select>
        ))}
      </CascaderLevels>
      {name && leaf && !leaf.children?.length && (
        <input type="hidden" name={name} value={leaf.value} />
      )}
      {helpText && (
        <Text id={`${fieldId}-help`} color="neutral.600">
          {helpText}
        </Text>
      )}
      {error && (
        <Text id={`${fieldId}-error`} color="danger.800">
          {error}
        </Text>
      )}
    </CascaderRoot>
  )
}
