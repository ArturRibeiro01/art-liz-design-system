import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import { Tag } from './Tag'
afterEach(cleanup)
it('provides a keyboard-accessible removal action without submitting forms', async () => {
  const remove = vi.fn()
  const submit = vi.fn()
  render(
    <form onSubmit={submit}>
      <Tag onRemove={remove}>Design</Tag>
    </form>,
  )
  const user = userEvent.setup()
  await user.tab()
  await user.keyboard('{Enter}')
  expect(remove).toHaveBeenCalledOnce()
  expect(submit).not.toHaveBeenCalled()
})
it('preserves disabled removal', async () => {
  const remove = vi.fn()
  render(
    <Tag disabled onRemove={remove}>
      Design
    </Tag>,
  )
  await userEvent.setup().click(screen.getByRole('button'))
  expect(remove).not.toHaveBeenCalled()
})
