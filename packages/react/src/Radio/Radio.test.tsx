import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, expect, it } from 'vitest'
import { Radio } from './Radio'
afterEach(cleanup)
it('preserves radio groups and excludes disabled options', async () => {
  const user = userEvent.setup()
  render(
    <>
      <Radio label="Pessoal" name="plan" defaultChecked />
      <Radio label="Equipe" name="plan" />
      <Radio label="Bloqueado" name="plan" disabled />
    </>,
  )
  await user.click(screen.getByLabelText('Equipe'))
  expect((screen.getByLabelText('Equipe') as HTMLInputElement).checked).toBe(true)
  expect((screen.getByLabelText('Pessoal') as HTMLInputElement).checked).toBe(false)
  await user.click(screen.getByLabelText('Bloqueado'))
  expect((screen.getByLabelText('Equipe') as HTMLInputElement).checked).toBe(true)
})
it('forwards the native ref and form value', () => {
  const ref = createRef<HTMLInputElement>()
  render(
    <form>
      <Radio ref={ref} label="Plano" name="plan" value="team" defaultChecked required />
    </form>,
  )
  expect(new FormData(ref.current!.form!).get('plan')).toBe('team')
})
