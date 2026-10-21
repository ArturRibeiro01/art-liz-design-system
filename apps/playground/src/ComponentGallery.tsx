import { useState } from 'react'
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Dialog,
  Drawer,
  Dropdown,
  Form,
  Input,
  Link,
  Pagination,
  Popover,
  Radio,
  Select,
  Slider,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  Text,
  Textarea,
  Tooltip,
  Upload,
} from '@art-liz/react'

export function ComponentGallery() {
  const [page, setPage] = useState(1)
  const [dialog, setDialog] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [tag, setTag] = useState(true)
  const [message, setMessage] = useState('A coleção de componentes está disponível para revisão.')
  return (
    <>
      <section aria-labelledby="navigation-title" id="componentes">
        <h2 id="navigation-title">Navegação</h2>
        <div className="component-stack">
          <Breadcrumb items={[{ label: 'Início', href: '#' }, { label: 'Componentes' }]} />
          <Link href="#forms-expanded-title">Ir para os controles de formulário</Link>
          <Tabs
            label="Áreas do projeto"
            items={[
              {
                id: 'overview',
                label: 'Visão geral',
                content: 'Componentes compartilhados entre os projetos.',
              },
              {
                id: 'preferences',
                label: 'Preferências',
                content: 'Personalize os componentes com os tokens do sistema.',
              },
              { id: 'unavailable', label: 'Em breve', content: '', disabled: true },
            ]}
          />
          <Pagination page={page} pageCount={12} onPageChange={setPage} />
          <Steps
            current={1}
            items={[
              { title: 'Identificação', description: 'Concluído' },
              { title: 'Preferências', description: 'Etapa atual' },
              { title: 'Revisão' },
            ]}
          />
        </div>
      </section>
      <section aria-labelledby="forms-expanded-title">
        <h2 id="forms-expanded-title">Controles de formulário</h2>
        <Form
          className="form-example"
          onSubmit={(event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            setMessage(`Preferências de ${data.get('project')} salvas para revisão.`)
          }}
        >
          <Input name="project" label="Nome do projeto" defaultValue="Art-Liz" required />
          <Textarea label="Descrição" name="description" helpText="Um resumo do projeto." />
          <Select label="Categoria" name="category" defaultValue="personal">
            <option value="personal">Pessoal</option>
            <option value="team">Equipe</option>
          </Select>
          <fieldset className="choice-group">
            <legend>Visibilidade</legend>
            <Radio label="Privado" name="visibility" value="private" defaultChecked />
            <Radio label="Público" name="visibility" value="public" />
          </fieldset>
          <Switch label="Receber atualizações" name="updates" defaultChecked />
          <Slider
            label="Prioridade"
            name="priority"
            min={0}
            max={100}
            step={10}
            defaultValue={50}
          />
          <Upload
            label="Referências"
            name="references"
            multiple
            helpText="Seleção local de arquivos para demonstração."
          />
          <ButtonGroup aria-label="Ações do formulário">
            <Button type="submit" variant="ghost">
              Salvar
            </Button>
            <Button type="reset" variant="ghost">
              Restaurar
            </Button>
          </ButtonGroup>
        </Form>
      </section>
      <section aria-labelledby="feedback-title">
        <h2 id="feedback-title">Feedback e dados</h2>
        <div className="component-stack">
          <Alert title="Biblioteca de componentes" intent="info">
            {message}
          </Alert>
          <div className="button-row">
            <Badge intent="success">Ativo</Badge>
            <Badge intent="warning">Em revisão</Badge>
            {tag && <Tag onRemove={() => setTag(false)}>Design system</Tag>}
          </div>
          <Table caption="Pacotes do projeto">
            <thead>
              <tr>
                <th scope="col">Pacote</th>
                <th scope="col">Finalidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">React</th>
                <td>Componentes reutilizáveis</td>
              </tr>
              <tr>
                <th scope="row">Tokens</th>
                <td>Valores visuais compartilhados</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
      <section aria-labelledby="overlays-title">
        <h2 id="overlays-title">Diálogos e conteúdo contextual</h2>
        <div className="button-row">
          <Button variant="ghost" onClick={() => setDialog(true)}>
            Abrir diálogo
          </Button>
          <Button variant="ghost" onClick={() => setDrawer(true)}>
            Abrir painel
          </Button>
          <Tooltip content="Os dados ficam apenas nesta demonstração.">
            <Button variant="ghost">Sobre a demonstração</Button>
          </Tooltip>
          <Popover trigger="Ver detalhes" title="Sobre os componentes">
            <Text>Uma base para construir as interfaces dos projetos.</Text>
          </Popover>
          <Dropdown
            trigger="Mais ações"
            label="Ações da demonstração"
            items={[
              {
                id: 'preview',
                label: 'Visualizar',
                onSelect: () => setMessage('Modo de revisão selecionado.'),
              },
              { id: 'archive', label: 'Arquivar', disabled: true },
              { id: 'restore', label: 'Restaurar marcador', onSelect: () => setTag(true) },
            ]}
          />
        </div>
        <Dialog
          open={dialog}
          onClose={() => setDialog(false)}
          title="Editar projeto"
          description="Confira os dados do projeto."
        >
          <Input label="Nome" defaultValue="Art-Liz" />
        </Dialog>
        <Drawer open={drawer} onClose={() => setDrawer(false)} title="Detalhes do projeto">
          <Text>
            A biblioteca agora reúne controles de formulário, navegação, feedback e sobreposições.
          </Text>
        </Drawer>
      </section>
    </>
  )
}
