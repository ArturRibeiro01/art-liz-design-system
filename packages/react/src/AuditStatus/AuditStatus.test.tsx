import { cleanup, render, screen } from '@testing-library/react'

import { afterEach, expect, it } from 'vitest'
import { AuditStatus } from './AuditStatus'

afterEach(cleanup)

it('provides a text status with decorative icon without creating a live region', () => {
  render(
    <AuditStatus intent="warning" icon={<span>!</span>}>
      Aguardando revisão
    </AuditStatus>,
  )
  expect(screen.getByText('Aguardando revisão')).toBeTruthy()
  expect(screen.getByText('!').parentElement!.getAttribute('aria-hidden')).toBe('true')
  expect(screen.queryByRole('status')).toBeNull()
})
