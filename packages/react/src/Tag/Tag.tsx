import type { HTMLAttributes } from 'react'
import type { SemanticIntent } from '../internal/intent'
import { RemoveTag, StyledTag } from './Tag.style'
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: SemanticIntent
  onRemove?: () => void
  removeLabel?: string
  disabled?: boolean
}
export function Tag({
  children,
  intent = 'neutral',
  onRemove,
  removeLabel,
  disabled,
  ...props
}: TagProps) {
  return (
    <StyledTag {...props} intent={intent}>
      <span>{children}</span>
      {onRemove && (
        <RemoveTag
          aria-label={
            removeLabel ?? `Remover ${typeof children === 'string' ? children : 'marcador'}`
          }
          disabled={disabled}
          onClick={onRemove}
          type="button"
        >
          ×
        </RemoveTag>
      )}
    </StyledTag>
  )
}
