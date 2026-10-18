import * as Icons from '../Icons'
import type { HTMLAttributes, ReactNode } from 'react'
import { Link } from '../Link'
import { BreadcrumbList } from './Breadcrumb.style'
export interface BreadcrumbItem {
  label: ReactNode
  href?: string
}
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
}
export function Breadcrumb({
  items,
  'aria-label': label = 'Navegação estrutural',
  ...props
}: BreadcrumbProps) {
  if (!items.length) return null
  return (
    <nav {...props} aria-label={label}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <li key={index}>
            {index > 0 && <Icons.CaretRightIcon aria-hidden="true" focusable="false" size={12} />}
            {item.href ? (
              <Link aria-current={index === items.length - 1 ? 'page' : undefined} href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span aria-current={index === items.length - 1 ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </BreadcrumbList>
    </nav>
  )
}
