import type { HTMLAttributes } from 'react'
import type { SemanticIntent } from '../internal/intent'
import { StyledBadge } from './Badge.style'
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: SemanticIntent
}
export function Badge({ intent = 'neutral', ...props }: BadgeProps) {
  return <StyledBadge {...props} intent={intent} />
}
