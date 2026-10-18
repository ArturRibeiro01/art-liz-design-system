import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import { Textarea } from './Textarea'
afterEach(cleanup)
it('associates descriptions, preserves multiline values and resets natively', async () => {
  const user = userEvent.setup()
  render(
    <form>
      <Textarea
        label="Mensagem"
        name="message"
        helpText="Detalhes"
        error="Confira a mensagem"
        defaultValue="Inicial"
      />
      <button type="reset">Restaurar</button>
    </form>,
  )
  const input = screen.getByRole('textbox') as HTMLTextAreaElement
  await user.clear(input)
  await user.type(input, 'Primeira{Enter}Segunda')
  expect(input.value).toBe('Primeira\nSegunda')
  expect(input.getAttribute('aria-invalid')).toBe('true')
  expect(input.getAttribute('aria-describedby')!.split(' ')).toHaveLength(2)
  expect(new FormData(input.form!).get('message')).toBe(input.value)
  await user.click(screen.getByRole('button'))
  expect(input.value).toBe('Inicial')
})
it('preserves readOnly and external descriptions', async () => {
  render(
    <Textarea
      label="Mensagem"
      readOnly
      defaultValue="Fixo"
      aria-describedby="external"
      helpText="Ajuda"
    />,
  )
  const input = screen.getByRole('textbox') as HTMLTextAreaElement
  await userEvent.setup().type(input, 'Outro')
  expect(input.value).toBe('Fixo')
  expect(input.getAttribute('aria-describedby')).toContain('external')
})
