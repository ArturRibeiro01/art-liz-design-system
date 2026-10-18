import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { FilterItem } from './FilterItem'

afterEach(cleanup)

it('toggles by keyboard without submitting its parent form', async () => {
  const submit = vi.fn()
  render(
    <form onSubmit={submit}>
      <FilterItem>Ativos</FilterItem>
    </form>,
  )
  const user = userEvent.setup()
  const button = screen.getByRole('button')
  button.focus()
  await user.keyboard(' ')
  expect(button.getAttribute('aria-pressed')).toBe('true')
  await user.keyboard('{Enter}')
  expect(button.getAttribute('aria-pressed')).toBe('false')
  expect(submit).not.toHaveBeenCalled()
})
it('respects controlled selection, disabled and cancellation', async () => {
  const update = vi.fn()
  const user = userEvent.setup()
  const { rerender } = render(
    <FilterItem selected onSelectedChange={update}>
      Ativos
    </FilterItem>,
  )
  await user.click(screen.getByRole('button'))
  expect(update).toHaveBeenCalledWith(false)
  expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('true')
  rerender(
    <FilterItem disabled onSelectedChange={update}>
      Ativos
    </FilterItem>,
  )
  update.mockClear()
  await user.click(screen.getByRole('button'))
  expect(update).not.toHaveBeenCalled()
  rerender(
    <FilterItem onClick={(event) => event.preventDefault()} onSelectedChange={update}>
      Ativos
    </FilterItem>,
  )
  await user.click(screen.getByRole('button'))
  expect(update).not.toHaveBeenCalled()
})
