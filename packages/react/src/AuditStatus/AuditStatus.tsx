import type { HTMLAttributes, ReactNode } from 'react'
import type { SemanticIntent } from '../internal/intent'
import { StatusRoot, StatusMarker } from './AuditStatus.style'
export interface AuditStatusProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: SemanticIntent
  icon?: ReactNode
  children: ReactNode
}
export function AuditStatus({ intent = 'neutral', icon, children, ...props }: AuditStatusProps) {
  return (
    <StatusRoot {...props}>
      <StatusMarker aria-hidden="true" intent={intent}>
        {icon}
      </StatusMarker>
      {children}
    </StatusRoot>
  )
}
