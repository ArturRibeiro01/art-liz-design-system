import type { ReactNode, TableHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { StyledTable, TableScroll } from './Table.style'
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  caption?: ReactNode
}
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { caption, children, ...props },
  ref,
) {
  return (
    <TableScroll
      role="region"
      aria-label={typeof caption === 'string' ? caption : (props['aria-label'] ?? 'Tabela')}
      tabIndex={0}
    >
      <StyledTable {...props} ref={ref}>
        {caption != null && <caption>{caption}</caption>}
        {children}
      </StyledTable>
    </TableScroll>
  )
})
