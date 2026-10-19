import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { FilterItem } from './FilterItem'
import { useState } from 'react'
import { Button } from '../Button'
import { Badge } from '../Badge'
import { Text } from '../Text'
const meta = {
  title: 'Data Display/FilterItem',
  component: FilterItem,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Botão de filtro com estado selecionado. A aplicação usa onSelectedChange para filtrar seus dados; o componente não faz a busca sozinho. A demonstração combina filtros sobre uma lista real.',
      },
    },
  },
} satisfies Meta<typeof FilterItem>
export default meta
type Story = StoryObj<typeof meta>

const projects = [
  { name: 'Portal do cliente', active: true, pending: true },
  { name: 'Design system', active: true, pending: false },
  { name: 'Site anterior', active: false, pending: false },
]
export const Default: Story = {
  name: 'Filtrar projetos',
  render: function ProjectFilters() {
    const [active, setActive] = useState(false)
    const [pending, setPending] = useState(false)
    const visible = projects.filter(
      (project) => (!active || project.active) && (!pending || project.pending),
    )
    return (
      <section aria-label="Projetos" style={{ display: 'grid', gap: 16, maxWidth: 560 }}>
        <Text>Combine os filtros para refinar a lista de projetos.</Text>
        <div
          role="group"
          aria-label="Filtros de projetos"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}
        >
          <FilterItem selected={active} onSelectedChange={setActive}>
            Somente ativos
          </FilterItem>
          <FilterItem selected={pending} onSelectedChange={setPending}>
            Com pendências
          </FilterItem>
          <Button
            variant="ghost"
            size="small"
            disabled={!active && !pending}
            onClick={() => {
              setActive(false)
              setPending(false)
            }}
          >
            Limpar filtros
          </Button>
        </div>
        <Text role="status">
          {visible.length} de {projects.length} projetos
        </Text>
        <ul aria-label="Resultados" style={{ margin: 0, paddingLeft: 24 }}>
          {visible.map((project) => (
            <li key={project.name} style={{ marginBottom: 12 }}>
              {project.name}{' '}
              <Badge intent={project.active ? 'success' : 'neutral'}>
                {project.active ? 'Ativo' : 'Arquivado'}
              </Badge>
            </li>
          ))}
        </ul>
      </section>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3)
    await userEvent.click(canvas.getByRole('button', { name: 'Somente ativos' }))
    await expect(canvas.getAllByRole('listitem')).toHaveLength(2)
    await userEvent.click(canvas.getByRole('button', { name: 'Com pendências' }))
    await expect(canvas.getAllByRole('listitem')).toHaveLength(1)
    await expect(canvas.getByRole('status')).toHaveTextContent('1 de 3 projetos')
    await userEvent.click(canvas.getByRole('button', { name: 'Limpar filtros' }))
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3)
    await expect(canvas.getByRole('button', { name: 'Somente ativos' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  },
}

export const Keyboard: Story = {
  args: { children: 'Ativos' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Ativos' })
    button.focus()
    await userEvent.keyboard(' ')
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await userEvent.keyboard('{Enter}')
    await expect(button).toHaveAttribute('aria-pressed', 'false')
  },
}
export const Selected: Story = { args: { children: 'Arquivados', defaultSelected: true } }
export const Disabled: Story = { args: { children: 'Indisponível', disabled: true } }
