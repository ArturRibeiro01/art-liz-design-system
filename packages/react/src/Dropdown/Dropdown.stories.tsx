import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Dropdown } from './Dropdown'
import { fn } from 'storybook/test'

const meta = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Dropdown>
export default meta
type Story = StoryObj<typeof meta>

const select = fn()
export const Default: Story = {
  args: {
    trigger: 'Ações',
    label: 'Ações do projeto',
    items: [
      { id: 'edit', label: 'Editar', onSelect: select },
      { id: 'delete', label: 'Excluir', disabled: true },
      { id: 'archive', label: 'Arquivar', onSelect: select },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Ações' })
    trigger.focus()
    await userEvent.keyboard('{ArrowDown}')
    await expect(canvas.getByRole('menuitem', { name: 'Editar' })).toHaveFocus()
    await userEvent.keyboard('{ArrowDown}')
    await expect(canvas.getByRole('menuitem', { name: 'Arquivar' })).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await expect(trigger).toHaveFocus()
    await expect(select).toHaveBeenCalledOnce()
  },
}
