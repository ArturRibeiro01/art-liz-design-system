import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

afterEach(cleanup)

describe('Input', () => {
  it('associates labels and help/error messages while preserving external descriptions', () => {
    const { rerender } = render(
      <>
        <p id="external">Instrução externa</p>
        <Input
          aria-describedby="external"
          error="E-mail inválido"
          helpText="Use seu e-mail pessoal"
          label="E-mail"
        />
      </>,
    )
    const input = screen.getByRole('textbox', { name: 'E-mail' }) as HTMLInputElement
    const descriptions = input
      .getAttribute('aria-describedby')!
      .split(' ')
      .map((id) => document.getElementById(id)?.textContent)
    expect(descriptions).toEqual(['Instrução externa', 'Use seu e-mail pessoal', 'E-mail inválido'])
    expect(input.getAttribute('aria-invalid')).toBe('true')
    rerender(<Input label="E-mail" />)
    const updatedInput = screen.getByRole('textbox', { name: 'E-mail' })
    expect(updatedInput.hasAttribute('aria-invalid')).toBe(false)
    expect(updatedInput.hasAttribute('aria-describedby')).toBe(false)
  })

  it('supports explicit IDs and external labels', () => {
    render(
      <>
        <label htmlFor="name">Nome</label>
        <Input id="name" />
      </>,
    )
    expect(screen.getByRole('textbox', { name: 'Nome' }).id).toBe('name')
  })

  it('generates distinct labels and messages for multiple fields', () => {
    render(
      <>
        <Input helpText="Primeiro nome" label="Nome" />
        <Input helpText="Último nome" label="Sobrenome" />
      </>,
    )
    const first = screen.getByRole('textbox', { name: 'Nome' })
    const last = screen.getByRole('textbox', { name: 'Sobrenome' })
    expect(first.id).not.toBe(last.id)
    expect(first.getAttribute('aria-describedby')).not.toBe(last.getAttribute('aria-describedby'))
  })

  it('preserves native uncontrolled input, form data and reset', async () => {
    const user = userEvent.setup()
    const submit = vi.fn()
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault()
          submit(new FormData(event.currentTarget).get('name'))
        }}
      >
        <Input defaultValue="Ana" label="Nome" name="name" required />
        <button type="submit">Salvar</button>
        <button type="reset">Restaurar</button>
      </form>,
    )
    const input = screen.getByRole('textbox', { name: 'Nome' }) as HTMLInputElement
    await user.clear(input)
    expect(input.validity.valueMissing).toBe(true)
    await user.type(input, 'Artur{Enter}')
    expect(submit).toHaveBeenCalledWith('Artur')
    await user.click(screen.getByRole('button', { name: 'Restaurar' }))
    expect(input.value).toBe('Ana')
  })

  it('supports controlled values and changes from the consumer', async () => {
    function Controlled() {
      const [value, setValue] = useState('')
      return <Input label="Nome" onChange={(event) => setValue(event.target.value)} value={value} />
    }
    render(<Controlled />)
    await userEvent.setup().type(screen.getByRole('textbox'), 'Liz')
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Liz')
  })

  it('preserves readOnly, disabled and keyboard order', async () => {
    const user = userEvent.setup()
    const change = vi.fn()
    render(
      <>
        <Input disabled label="Desabilitado" onChange={change} />
        <Input defaultValue="Fixo" label="Leitura" readOnly />
        <Input label="Editável" />
      </>,
    )
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Leitura' }))
    await user.keyboard('Outro')
    expect((document.activeElement as HTMLInputElement).value).toBe('Fixo')
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Editável' }))
    expect(change).not.toHaveBeenCalled()
  })

  it('forwards its ref to the native input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input label="Nome" ref={ref} />)
    ref.current!.focus()
    expect(document.activeElement).toBe(screen.getByRole('textbox'))
  })

  it('clears an uncontrolled field without submitting and returns focus', async () => {
    const user = userEvent.setup()
    const clear = vi.fn()
    const submit = vi.fn((event) => event.preventDefault())
    render(
      <form onSubmit={submit}>
        <Input clearable defaultValue="Artur" label="Nome" name="name" onClear={clear} />
      </form>,
    )
    const input = screen.getByRole('textbox') as HTMLInputElement
    await user.click(input)
    // The native button is tested in jsdom independently of browser :focus-within styling.
    const button = screen.getByRole('button', { hidden: true })
    fireEvent.click(button)
    expect(input.value).toBe('')
    expect(document.activeElement).toBe(input)
    expect(clear).toHaveBeenCalledOnce()
    expect(submit).not.toHaveBeenCalled()
    expect(new FormData(input.form!).get('name')).toBe('')
  })

  it('lets the consumer clear a controlled value via onClear', async () => {
    function Controlled() {
      const [value, setValue] = useState('Liz')
      return (
        <Input
          clearable
          label="Nome"
          onChange={(event) => setValue(event.target.value)}
          onClear={() => setValue('')}
          value={value}
        />
      )
    }
    render(<Controlled />)
    await userEvent.setup().click(screen.getByRole('textbox'))
    fireEvent.click(screen.getByRole('button', { hidden: true }))
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('')
  })

  it('respects controlled values when the consumer declines clearing', async () => {
    const clear = vi.fn()
    render(<Input clearable label="Nome" onChange={() => {}} onClear={clear} value="Mantido" />)
    await userEvent.setup().click(screen.getByRole('textbox'))
    fireEvent.click(screen.getByRole('button', { hidden: true }))
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Mantido')
    expect(clear).toHaveBeenCalledOnce()
  })

  it('restores an uncontrolled clearable value after form reset', async () => {
    const user = userEvent.setup()
    render(
      <form>
        <Input clearable defaultValue="Inicial" label="Nome" />
        <button type="reset">Restaurar</button>
      </form>,
    )
    const input = screen.getByRole('textbox') as HTMLInputElement
    await user.clear(input)
    await user.click(screen.getByRole('button', { name: 'Restaurar' }))
    await waitFor(() => expect(input.value).toBe('Inicial'))
  })

  it('preserves the current value when a form reset is cancelled', async () => {
    const user = userEvent.setup()
    render(
      <form onReset={(event) => event.preventDefault()}>
        <Input clearable defaultValue="Inicial" label="Nome" />
        <button type="reset">Restaurar</button>
      </form>,
    )
    const input = screen.getByRole('textbox') as HTMLInputElement
    await user.clear(input)
    await user.click(screen.getByRole('button', { name: 'Restaurar' }))
    await waitFor(() => expect(input.value).toBe(''))
  })

  it.each([{ disabled: true }, { readOnly: true }])('does not expose clearing for %o', (state) => {
    render(<Input {...state} clearable defaultValue="Fixo" label="Nome" />)
    expect(screen.queryByRole('button', { hidden: true })).toBeNull()
  })
})
