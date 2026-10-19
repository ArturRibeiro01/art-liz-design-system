import type { HTMLAttributes } from 'react'
import type { SemanticIntent } from '../internal/intent'
import { StyledBadge } from './Badge.style'
export type BadgeSize = 'small' | 'medium' | 'large'
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: SemanticIntent
  size?: BadgeSize
}
export function Badge({ intent = 'neutral', size = 'small', ...props }: BadgeProps) {
  return <StyledBadge {...props} intent={intent} size={size} />
}
