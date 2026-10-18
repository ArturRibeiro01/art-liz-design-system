import type { HTMLAttributes, ReactNode } from 'react'
import { Text } from '../Text'
import { StepIndicator, StepsList } from './Steps.style'
export type StepStatus = 'finished' | 'error' | 'current' | 'wait'
export interface StepItem {
  id?: string
  title: ReactNode
  description?: ReactNode
  status?: StepStatus
}
export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
  items: StepItem[]
  current?: number
  orientation?: 'horizontal' | 'vertical'
}
const statusLabels = {
  finished: 'Concluído',
  error: 'Erro',
  current: 'Etapa atual',
  wait: 'Aguardando',
}
export function Steps({
  items,
  current = 0,
  orientation = 'horizontal',
  'aria-label': label = 'Etapas',
  ...props
}: StepsProps) {
  return (
    <StepsList {...props} aria-label={label} data-orientation={orientation}>
      {items.map((item, index) => {
        const status =
          item.status ?? (index < current ? 'finished' : index === current ? 'current' : 'wait')
        return (
          <li aria-current={status === 'current' ? 'step' : undefined} key={item.id ?? index}>
            <StepIndicator aria-label={statusLabels[status]} data-status={status} role="img">
              <span aria-hidden="true">
                {status === 'finished' ? '✓' : status === 'error' ? '!' : index + 1}
              </span>
            </StepIndicator>
            <div>
              <Text color="neutral.700" weight={status === 'current' ? 'semibold' : 'regular'}>
                {item.title}
              </Text>
              {item.description && (
                <Text color="neutral.600" variant="caption">
                  {item.description}
                </Text>
              )}
            </div>
          </li>
        )
      })}
    </StepsList>
  )
}
