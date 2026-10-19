import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Form } from './Form'
import { Input } from '../Input'
import { Button } from '../Button'
import { useState } from 'react'

const meta = {
  title: 'Forms/Form',
  component: Form,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Form>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function FormExample() {
    const [result, setResult] = useState('')
    return (
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          setResult(String(new FormData(event.currentTarget).get('name')))
        }}
      >
        <Input name="name" label="Nome" required />
        <Button variant="ghost" type="submit">
          Salvar
        </Button>
        <output aria-live="polite">{result}</output>
      </Form>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByRole('textbox'), 'Liz{Enter}')
    await expect(canvas.getByRole('status')).toHaveTextContent('Liz')
  },
}
