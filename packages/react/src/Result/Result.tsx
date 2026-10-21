import { useId } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import type { SemanticIntent } from '../internal/intent'
import { Text } from '../Text'
import { ResultRoot, ResultIcon, ResultActions } from './Result.style'
export interface ResultProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  actions?: ReactNode
  intent?: SemanticIntent
}
export function Result({
  title,
  description,
  icon,
  actions,
  children,
  intent = 'info',
  'aria-labelledby': labelledBy,
  ...props
}: ResultProps) {
  const id = useId()
  return (
    <ResultRoot {...props} aria-labelledby={labelledBy ?? id}>
      {icon != null && (
        <ResultIcon aria-hidden="true" intent={intent}>
          {icon}
        </ResultIcon>
      )}
      <Text as="h2" variant="title" weight="semibold" id={id}>
        {title}
      </Text>
      {description != null && <Text color="neutral.700">{description}</Text>}
      {children}
      {actions != null && <ResultActions>{actions}</ResultActions>}
    </ResultRoot>
  )
}
