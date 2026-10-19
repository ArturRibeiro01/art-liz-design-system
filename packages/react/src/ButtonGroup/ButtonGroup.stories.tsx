import type { Meta, StoryObj } from '@storybook/react-vite'
import { ButtonGroup } from './ButtonGroup'
import { Button } from '../Button'

const meta = {
  title: 'Actions/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    a11y: { test: 'error' },
    docs: {
      description: {
        component:
          'Componente baseado nos tokens e padrões atuais do Art-Liz. Ajuste visual ao Figma ainda pendente.',
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup aria-label="Edição">
      <Button variant="ghost">Copiar</Button>
      <Button variant="ghost">Colar</Button>
      <Button variant="ghost" disabled>
        Recortar
      </Button>
    </ButtonGroup>
  ),
}
export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" aria-label="Arquivo">
      <Button variant="ghost">Abrir</Button>
      <Button variant="ghost">Salvar</Button>
    </ButtonGroup>
  ),
}
