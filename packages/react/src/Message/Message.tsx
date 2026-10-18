import type { HTMLAttributes, ReactNode } from 'react'
import type { SemanticIntent } from '../internal/intent'
import { MessageRoot, MessageContent, MessageClose } from './Message.style'
export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  intent?: SemanticIntent
  icon?: ReactNode
  onDismiss?: () => void
  dismissLabel?: string
}
export function Message({
  intent = 'info',
  icon,
  children,
  onDismiss,
  dismissLabel = 'Fechar mensagem',
  role = 'status',
  ...props
}: MessageProps) {
  return (
    <MessageRoot {...props} intent={intent} role={role}>
      {icon != null && <span aria-hidden="true">{icon}</span>}
      <MessageContent>{children}</MessageContent>
      {onDismiss && (
        <MessageClose type="button" aria-label={dismissLabel} onClick={onDismiss}>
          ×
        </MessageClose>
      )}
    </MessageRoot>
  )
}
