import { useRef } from 'react'
import { useInert } from '../internal/useInert'
import * as Icons from '../Icons'
import type { HTMLAttributes, ReactNode } from 'react'
import type { SemanticIntent } from '../internal/intent'
import { Text } from '../Text'
import { AlertClose, StyledAlert } from './Alert.style'
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean
  title?: ReactNode
  intent?: SemanticIntent
  onDismiss?: () => void
  dismissLabel?: string
}
export function Alert({
  open = true,
  title,
  children,
  intent = 'info',
  onDismiss,
  dismissLabel = 'Fechar aviso',
  role = 'status',
  ...props
}: AlertProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inactive = !open || Boolean(props.hidden)
  useInert(ref, inactive)
  return (
    <StyledAlert
      {...props}
      ref={ref}
      hidden={!open || props.hidden}
      aria-hidden={inactive ? true : props['aria-hidden']}
      intent={intent}
      role={role}
    >
      <div>
        {title != null && (
          <Text color="inherit" weight="semibold">
            {title}
          </Text>
        )}
        <div>{children}</div>
      </div>
      {onDismiss && (
        <AlertClose aria-label={dismissLabel} onClick={onDismiss} type="button">
          <Icons.XIcon aria-hidden="true" focusable="false" size={16} />
        </AlertClose>
      )}
    </StyledAlert>
  )
}
