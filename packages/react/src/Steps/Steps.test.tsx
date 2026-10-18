import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { Steps } from './Steps'
afterEach(cleanup)
it('identifies the current step and completed/error states without color alone', () => {
  render(
    <Steps
      current={1}
      items={[{ title: 'Dados' }, { title: 'Revisão' }, { title: 'Envio', status: 'error' }]}
    />,
  )
  expect(screen.getByRole('img', { name: 'Concluído' })).toBeTruthy()
  expect(screen.getByRole('img', { name: 'Erro' })).toBeTruthy()
  expect(screen.getAllByRole('listitem')[1].getAttribute('aria-current')).toBe('step')
})
