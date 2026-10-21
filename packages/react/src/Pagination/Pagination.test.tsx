import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Pagination } from './Pagination'
afterEach(cleanup)
it('requests valid page changes and bounds navigation', async () => {
  const change = vi.fn()
  const { rerender } = render(<Pagination page={1} pageCount={1000} onPageChange={change} />)
  expect(
    (screen.getByRole('button', { name: 'Página anterior' }) as HTMLButtonElement).disabled,
  ).toBe(true)
  expect(screen.getAllByRole('button').length).toBeLessThan(10)
  await userEvent.setup().click(screen.getByRole('button', { name: 'Próxima página' }))
  expect(change).toHaveBeenCalledWith(2)
  rerender(<Pagination page={1000} pageCount={1000} onPageChange={change} />)
  expect(
    (screen.getByRole('button', { name: 'Próxima página' }) as HTMLButtonElement).disabled,
  ).toBe(true)
})
it('does not request the current page again', async () => {
  const change = vi.fn()
  render(<Pagination page={4} pageCount={10} onPageChange={change} />)
  await userEvent.setup().click(screen.getByRole('button', { name: 'Página 4' }))
  expect(change).not.toHaveBeenCalled()
})
