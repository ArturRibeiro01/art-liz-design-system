import type { AnchorHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { StyledLink } from './Link.style'
export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { target, rel, ...props },
  ref,
) {
  const safeRel =
    target === '_blank'
      ? [...new Set([...(rel?.split(/\s+/) ?? []), 'noopener', 'noreferrer'])]
          .filter(Boolean)
          .join(' ')
      : rel
  return <StyledLink {...props} ref={ref} target={target} rel={safeRel} />
})
