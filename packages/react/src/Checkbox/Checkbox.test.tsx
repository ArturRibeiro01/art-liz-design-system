import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox'

afterEach(cleanup)

describe('Checkbox', () => {
  it('toggles an uncontrolled checkbox by label and by Space', async () => {
    const user = userEvent.setup()
    const change = vi.fn()
    render(<Checkbox label="Receber novidades" onChange={change} />)
    const input = screen.getByRole('checkbox', { name: 'Receber novidades' }) as HTMLInputElement
    await user.click(screen.getByText('Receber novidades'))
    expect(input.checked).toBe(true)
    await user.keyboard(' ')
    expect(input.checked).toBe(false)
    expect(change).toHaveBeenCalledTimes(2)
  })

  it('supports controlled selection and changes from the consumer', async () => {
    function Controlled() {
      const [checked, setChecked] = useState(false)
      return (
        <Checkbox
          checked={checked}
          label="Aceito"
          onChange={(event) => setChecked(event.target.checked)}
        />
      )
    }
    render(<Controlled />)
    const input = screen.getByRole('checkbox') as HTMLInputElement
    await userEvent.setup().click(input)
    expect(input.checked).toBe(true)
  })

  it('sets the native indeterminate property and updates it from props', () => {
    const { rerender } = render(<Checkbox indeterminate label="Selecionar todos" />)
    const input = screen.getByRole('checkbox') as HTMLInputElement
    expect(input.indeterminate).toBe(true)
    rerender(<Checkbox indeterminate={false} label="Selecionar todos" />)
    expect(input.indeterminate).toBe(false)
  })

  it('uses native activation to resolve an indeterminate selection', async () => {
    render(<Checkbox indeterminate label="Selecionar todos" />)
    const input = screen.getByRole('checkbox') as HTMLInputElement
    await userEvent.setup().click(input)
    expect(input.indeterminate).toBe(false)
    expect(input.checked).toBe(true)
  })

  it('does not toggle or receive Tab focus when disabled', async () => {
    const user = userEvent.setup()
    const change = vi.fn()
    render(
      <>
        <Checkbox disabled label="Indisponível" onChange={change} />
        <Checkbox label="Disponível" />
      </>,
    )
    await user.click(screen.getByText('Indisponível'))
    expect(change).not.toHaveBeenCalled()
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('checkbox', { name: 'Disponível' }))
  })

  it('supports unnamed visual controls through an accessible name or external label', () => {
    render(
      <>
        <Checkbox aria-label="Selecionar item" />
        <label htmlFor="terms">Aceito os termos</label>
        <Checkbox id="terms" />
      </>,
    )
    expect(screen.getByRole('checkbox', { name: 'Selecionar item' })).toBeTruthy()
    expect(screen.getByRole('checkbox', { name: 'Aceito os termos' }).id).toBe('terms')
  })

  it('preserves required validation, form data and native reset', async () => {
    const user = userEvent.setup()
    render(
      <form>
        <Checkbox label="Termos" name="terms" required value="accepted" />
        <Checkbox defaultChecked disabled label="Desabilitado" name="disabled" />
        <button type="reset">Restaurar</button>
      </form>,
    )
    const input = screen.getByRole('checkbox', { name: 'Termos' }) as HTMLInputElement
    expect(input.validity.valueMissing).toBe(true)
    await user.click(input)
    expect(input.validity.valid).toBe(true)
    expect([...new FormData(input.form!).entries()]).toEqual([['terms', 'accepted']])
    await user.click(screen.getByRole('button'))
    expect(input.checked).toBe(false)
  })

  it('forwards refs to the native input and preserves native attributes', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Checkbox aria-describedby="help" label="Aceito" name="terms" ref={ref} />)
    ref.current!.focus()
    expect(document.activeElement).toBe(screen.getByRole('checkbox'))
    expect(ref.current!.getAttribute('aria-describedby')).toBe('help')
    expect(ref.current!.name).toBe('terms')
  })
})
