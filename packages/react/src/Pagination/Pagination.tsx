import * as Icons from '../Icons'
import type { HTMLAttributes } from 'react'
import { PageButton, PageList } from './Pagination.style'
export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}
export function Pagination({
  page,
  pageCount,
  onPageChange,
  'aria-label': label = 'Paginação',
  ...props
}: PaginationProps) {
  if (!Number.isSafeInteger(pageCount) || pageCount < 1 || !Number.isSafeInteger(page))
    throw new RangeError('Pagination requires integer page and positive pageCount.')
  const current = Math.max(1, Math.min(page, pageCount))
  const visible = [
    ...new Set([
      1,
      pageCount,
      current - 1,
      current,
      current + 1,
      ...(current < 4 ? [2, 3] : []),
      ...(current > pageCount - 3 ? [pageCount - 2, pageCount - 1] : []),
    ]),
  ]
    .filter((n) => n >= 1 && n <= pageCount)
    .sort((a, b) => a - b)
  return (
    <nav {...props} aria-label={label}>
      <PageList>
        <li>
          <PageButton
            aria-label="Página anterior"
            disabled={current === 1}
            onClick={() => onPageChange(current - 1)}
            type="button"
          >
            Anterior
          </PageButton>
        </li>
        {visible.map((n, index) => (
          <li key={n}>
            {index > 0 && n - visible[index - 1] > 1 && (
              <Icons.DotsThreeIcon aria-hidden="true" focusable="false" size={16} />
            )}
            <PageButton
              aria-current={n === current ? 'page' : undefined}
              aria-label={`Página ${n}`}
              onClick={() => {
                if (n !== current) onPageChange(n)
              }}
              type="button"
            >
              {n}
            </PageButton>
          </li>
        ))}
        <li>
          <PageButton
            aria-label="Próxima página"
            disabled={current === pageCount}
            onClick={() => onPageChange(current + 1)}
            type="button"
          >
            Próxima
          </PageButton>
        </li>
      </PageList>
    </nav>
  )
}
