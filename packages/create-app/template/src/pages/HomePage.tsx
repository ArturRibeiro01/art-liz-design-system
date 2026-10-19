import {
  Icons,
  AuditStatus,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  Form,
  Input,
  Link,
  Message,
  Popover,
  Select,
  Steps,
  Switch,
  Tabs,
  Tag,
  Text,
  Tooltip,
} from '@art-liz/react'
import { useEffect, useRef, useState } from 'react'
import { useCounterStore } from '../store/counter'
import {
  Brand,
  BrandMark,
  Card,
  Count,
  Divider,
  Eyebrow,
  Feature,
  Footer,
  Grid,
  Hero,
  HeroIntro,
  Introduction,
  Navigation,
  NavigationLinks,
  Page,
  PageTitle,
  Preview,
  PreviewHeader,
  PreviewIcon,
  PrimaryButton,
  RouteLink,
  Row,
  SmallBadge,
  Stack,
  Workspace,
} from './HomePage.style'

export function HomePage() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)
  const reset = useCounterStore((state) => state.reset)
  const [createOpen, setCreateOpen] = useState(false)
  const projectNameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (createOpen) projectNameRef.current?.focus()
  }, [createOpen])
  const [project, setProject] = useState('')
  const [message, setMessage] = useState('')
  const [tags, setTags] = useState(['Interface', 'Acessibilidade', 'Tokens'])

  return (
    <Page>
      <Container maxWidth="xl">
        <Navigation>
          <Brand>
            <BrandMark>
              <Icons.SquaresFourIcon size={24} aria-hidden="true" />
            </BrandMark>
            <div>
              <Text variant="title" weight="semibold">
                art-liz
              </Text>
              <Text variant="caption" color="neutral.600">
                Um espaço para criar
              </Text>
            </div>
          </Brand>
          <NavigationLinks aria-label="Navegação principal">
            <SmallBadge intent="neutral">React + TypeScript</SmallBadge>
            <RouteLink to="/sobre">
              Sobre este template <Icons.ArrowRightIcon aria-hidden="true" size={16} />
            </RouteLink>
          </NavigationLinks>
        </Navigation>

        <main>
          <Hero aria-labelledby="welcome-title">
            <HeroIntro>
              <Eyebrow>Seu ponto de partida</Eyebrow>
              <PageTitle id="welcome-title">
                Sua aplicação <br />
                começa aqui
              </PageTitle>
              <Introduction>
                Menos configuração, mais espaço para criar. Experimente os componentes, ajuste os
                detalhes e dê forma à sua próxima ideia.
              </Introduction>
              <Row>
                <PrimaryButton
                  onClick={() => setCreateOpen(true)}
                  startIcon={<Icons.PlusIcon size="1em" />}
                >
                  Criar primeiro projeto
                </PrimaryButton>
                <Link href="#workspace">Explorar a interface</Link>
              </Row>
              <Row>
                <AuditStatus intent="success" icon={<Icons.CheckCircleIcon size={16} />}>
                  Tudo pronto para começar
                </AuditStatus>
              </Row>
            </HeroIntro>
            <Preview background="white" borderRadius="medium" padding={6}>
              <PreviewHeader>
                <PreviewIcon>
                  <Icons.CubeIcon size={24} aria-hidden="true" />
                </PreviewIcon>
                <SmallBadge intent={project ? 'success' : 'neutral'}>
                  {project ? 'Criado nesta sessão' : 'Seu próximo projeto'}
                </SmallBadge>
              </PreviewHeader>
              <Stack>
                <Text as="h2" variant="h2" weight="semibold">
                  {project || 'Um espaço para suas ideias.'}
                </Text>
                <Text color="neutral.600">Comece pelo essencial. O resto cresce com você.</Text>
              </Stack>
              <Divider />
              <Steps
                orientation="vertical"
                current={project ? 1 : 0}
                items={[
                  { title: 'Dê um nome à sua ideia', description: 'Crie seu primeiro projeto.' },
                  {
                    title: 'Encontre o seu estilo',
                    description: 'Explore os componentes e as preferências.',
                  },
                  { title: 'Faça acontecer', description: 'Transforme esta base no seu produto.' },
                ]}
              />
            </Preview>
          </Hero>

          <Workspace aria-labelledby="workspace-title" id="workspace">
            <Text as="h2" variant="h2" weight="semibold" id="workspace-title">
              Explore sua nova base.
            </Text>
            <Text color="neutral.600">Uma pequena amostra do que você já tem em mãos.</Text>
            {message && (
              <Message intent="success" onDismiss={() => setMessage('')}>
                {message}
              </Message>
            )}
            <Tabs
              label="Explore o template"
              items={[
                {
                  id: 'overview',
                  label: 'Visão geral',
                  content: (
                    <Grid>
                      <Card background="white" borderRadius="medium" padding={6}>
                        <Stack>
                          <Row>
                            <Icons.CodeIcon size={20} aria-hidden="true" />
                            <Text as="h3" variant="subtitle" weight="semibold">
                              Uma interação de verdade
                            </Text>
                          </Row>
                          <Text color="neutral.600">
                            Experimente o contador. O estado é compartilhado entre as páginas.
                          </Text>
                          <Count aria-live="polite">Contagem: {count}</Count>
                          <ButtonGroup aria-label="Ações do contador">
                            <Button
                              variant="ghost"
                              onClick={increment}
                              startIcon={<Icons.PlusIcon size="1em" />}
                            >
                              Aumentar contador
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={reset}
                              startIcon={<Icons.ArrowCounterClockwiseIcon size="1em" />}
                            >
                              Zerar
                            </Button>
                          </ButtonGroup>
                        </Stack>
                      </Card>
                      <Card background="white" borderRadius="medium" padding={6}>
                        <Stack>
                          <Feature>
                            <Icons.PaletteIcon size={24} aria-hidden="true" />
                            <div>
                              <Text weight="semibold">Uma linguagem visual em comum</Text>
                              <Text color="neutral.600">
                                Cores, tipografia e espaçamentos que funcionam juntos.
                              </Text>
                            </div>
                          </Feature>
                          <Feature>
                            <Icons.CubeIcon size={24} aria-hidden="true" />
                            <div>
                              <Text weight="semibold">Peças prontas para combinar</Text>
                              <Text color="neutral.600">
                                De campos simples a diálogos, abas e mensagens.
                              </Text>
                            </div>
                          </Feature>
                          <Link
                            href="https://arturribeiro01.github.io/art-liz-design-system/prod/"
                            target="_blank"
                          >
                            Conhecer a biblioteca
                          </Link>
                        </Stack>
                      </Card>
                    </Grid>
                  ),
                },
                {
                  id: 'preferences',
                  label: 'Preferências',
                  content: (
                    <Card background="white" borderRadius="medium" padding={6}>
                      <Form
                        gap={4}
                        onSubmit={(event) => {
                          event.preventDefault()
                          const data = new FormData(event.currentTarget)
                          setMessage(
                            `Preferências de ${data.get('displayName')} salvas nesta sessão.`,
                          )
                        }}
                      >
                        <Text as="h3" variant="subtitle" weight="semibold">
                          Deixe este espaço com a sua cara
                        </Text>
                        <Grid>
                          <Input
                            label="Como podemos chamar você?"
                            name="displayName"
                            defaultValue="Pessoa criadora"
                            required
                          />
                          <Select label="Seu foco" name="focus" defaultValue="personal">
                            <option value="personal">Projetos pessoais</option>
                            <option value="team">Trabalho em equipe</option>
                            <option value="learning">Aprendizado</option>
                          </Select>
                        </Grid>
                        <Switch
                          label="Receber novidades sobre o projeto"
                          name="updates"
                          defaultChecked
                        />
                        <Row>
                          <PrimaryButton type="submit" size="small">
                            Salvar preferências
                          </PrimaryButton>
                          <Text variant="caption" color="neutral.600">
                            Demonstração local, sem envio de dados.
                          </Text>
                        </Row>
                      </Form>
                    </Card>
                  ),
                },
                {
                  id: 'components',
                  label: 'Componentes',
                  content: (
                    <Card background="white" borderRadius="medium" padding={6}>
                      <Stack>
                        <Text as="h3" variant="subtitle" weight="semibold">
                          Pequenos detalhes, boas experiências
                        </Text>
                        <Text color="neutral.600">
                          Remova os marcadores e abra os detalhes para experimentar a interface.
                        </Text>
                        <Row>
                          {tags.map((tag) => (
                            <Tag
                              key={tag}
                              onRemove={() => setTags(tags.filter((item) => item !== tag))}
                            >
                              {tag}
                            </Tag>
                          ))}
                          {!tags.length && (
                            <Text color="neutral.600">Você removeu todos os marcadores.</Text>
                          )}
                        </Row>
                        <Row>
                          <Button
                            variant="ghost"
                            size="small"
                            onClick={() => setTags(['Interface', 'Acessibilidade', 'Tokens'])}
                          >
                            Restaurar marcadores
                          </Button>
                          <Popover trigger="Como personalizar" title="Comece pelos tokens">
                            <Text>
                              Ajuste cores e tipografia para criar a identidade do seu produto,
                              mantendo os componentes consistentes.
                            </Text>
                          </Popover>
                          <Tooltip content="Os exemplos desta página funcionam localmente, sem conexão com um servidor.">
                            <Button
                              variant="ghost"
                              size="small"
                              startIcon={<Icons.InfoIcon size="1em" />}
                            >
                              Sobre os exemplos
                            </Button>
                          </Tooltip>
                        </Row>
                      </Stack>
                    </Card>
                  ),
                },
              ]}
            />
          </Workspace>
        </main>
        <Footer>
          <Text variant="caption" color="neutral.600">
            Feito com Art-Liz. Agora é com você.
          </Text>
          <Link href="https://github.com/ArturRibeiro01/art-liz-design-system" target="_blank">
            Código e documentação
          </Link>
        </Footer>
      </Container>
      <Dialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Dê um nome à sua ideia"
        description="Crie um projeto de demonstração para começar a explorar."
      >
        <Form
          onSubmit={(event) => {
            event.preventDefault()
            const name = String(new FormData(event.currentTarget).get('projectName') || '').trim()
            if (!name) return
            setProject(name)
            setCreateOpen(false)
            setMessage(`Projeto ${name} criado nesta sessão.`)
          }}
        >
          <Input
            ref={projectNameRef}
            label="Nome do projeto"
            name="projectName"
            placeholder="Minha próxima ideia"
            required
            pattern={'.*\\S.*'}
            maxLength={80}
          />
          <Row>
            <PrimaryButton type="submit" size="small">
              Criar projeto
            </PrimaryButton>
            <Button variant="ghost" size="small" onClick={() => setCreateOpen(false)}>
              Cancelar
            </Button>
          </Row>
        </Form>
      </Dialog>
    </Page>
  )
}
