import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Pagination } from './Pagination'
import { useState } from 'react'

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  args: { page: 1, pageCount: 20, onPageChange: () => undefined },
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Pagination>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Pages() {
    const [page, setPage] = useState(1)
    return <Pagination page={page} pageCount={20} onPageChange={setPage} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button', { name: 'Página anterior' })).toBeDisabled()
    await userEvent.click(canvas.getByRole('button', { name: 'Próxima página' }))
    await expect(canvas.getByRole('button', { name: 'Página 2' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  },
}
