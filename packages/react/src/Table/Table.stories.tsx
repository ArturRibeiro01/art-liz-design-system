import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table } from './Table'

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table caption="Projetos">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Design system</th>
          <td>Ativo</td>
        </tr>
        <tr>
          <th scope="row">Playground</th>
          <td>Em revisão</td>
        </tr>
      </tbody>
    </Table>
  ),
}
