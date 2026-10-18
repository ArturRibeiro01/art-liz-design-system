import { useState } from 'react'
import {
  AuditStatus,
  Button,
  Cascader,
  Chart,
  DateTimePicker,
  FilterItem,
  Form,
  Message,
  Popconfirm,
  Result,
  Text,
  Transfer,
} from '@art-liz/react'

export function RemainingComponentsGallery() {
  const [message, setMessage] = useState('Explore os novos componentes.')
  const [showMessage, setShowMessage] = useState(true)
  const [showResult, setShowResult] = useState(true)
  return (
    <>
      <section aria-labelledby="composite-fields-title">
        <h2 id="composite-fields-title">Seleção em níveis e transferência</h2>
        <Form
          onSubmit={(event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            setMessage(
              `Local: ${data.get('location') || 'não informado'}; componentes: ${data.getAll('components').join(', ') || 'nenhum'}; agendamento: ${data.get('appointment') || 'não informado'}.`,
            )
            setShowMessage(true)
          }}
        >
          <Cascader
            label="Localização"
            name="location"
            helpText="Selecione até chegar à cidade."
            options={[
              {
                value: 'br',
                label: 'Brasil',
                children: [
                  {
                    value: 'sp',
                    label: 'São Paulo',
                    children: [
                      { value: 'mogi', label: 'Mogi das Cruzes' },
                      { value: 'capital', label: 'São Paulo' },
                    ],
                  },
                ],
              },
              { value: 'pt', label: 'Portugal', children: [{ value: 'lisbon', label: 'Lisboa' }] },
            ]}
          />
          <DateTimePicker label="Agendamento" name="appointment" defaultValue="2026-10-18T14:30" />
          <Transfer
            label="Componentes do projeto"
            name="components"
            defaultTargetKeys={['checkbox']}
            items={[
              { id: 'button', label: 'Button' },
              { id: 'input', label: 'Input' },
              { id: 'checkbox', label: 'Checkbox' },
              { id: 'reserved', label: 'Reservado', disabled: true },
            ]}
          />
          <div className="button-row">
            <Button type="submit" variant="ghost">
              Conferir seleção
            </Button>
            <Button type="reset" variant="ghost">
              Restaurar seleção
            </Button>
          </div>
        </Form>
      </section>
      <section aria-labelledby="remaining-feedback-title">
        <h2 id="remaining-feedback-title">Filtros, status e resultados</h2>
        <div className="component-stack">
          <div className="button-row">
            <FilterItem
              defaultSelected
              onSelectedChange={(selected) => {
                setMessage(`Filtro ativos ${selected ? 'aplicado' : 'removido'}.`)
                setShowMessage(true)
              }}
            >
              Ativos
            </FilterItem>
            <FilterItem>Arquivados</FilterItem>
            <FilterItem disabled>Indisponíveis</FilterItem>
            <AuditStatus intent="success">Aprovado</AuditStatus>
            <AuditStatus intent="warning">Aguardando revisão</AuditStatus>
          </div>
          {showMessage && (
            <Message intent="info" onDismiss={() => setShowMessage(false)}>
              {message}
            </Message>
          )}
          <Chart
            title="Componentes por grupo"
            description="Dados ilustrativos para a demonstração."
            data={[
              { id: 'forms', label: 'Formulários', value: 12 },
              { id: 'navigation', label: 'Navegação', value: 5 },
              { id: 'feedback', label: 'Feedback', value: 8 },
            ]}
          />
          <Popconfirm
            trigger="Limpar resultado"
            title="Limpar o resultado da demonstração?"
            description="Você pode restaurá-lo a qualquer momento."
            onConfirm={() => {
              setShowResult(false)
              setMessage('Resultado removido da demonstração.')
              setShowMessage(true)
            }}
            confirmLabel="Limpar"
            intent="danger"
          />
          {showResult ? (
            <Result
              title="Biblioteca pronta para explorar"
              description="Os componentes podem ser combinados para construir interfaces."
              intent="success"
              actions={
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMessage('Continue explorando os exemplos no Storybook.')
                    setShowMessage(true)
                  }}
                >
                  Continuar explorando
                </Button>
              }
            />
          ) : (
            <Button variant="ghost" onClick={() => setShowResult(true)}>
              Restaurar resultado
            </Button>
          )}
          <Text color="neutral.600">
            Exemplos funcionais com os tokens atuais; ajustes visuais ao Figma seguem pendentes.
          </Text>
        </div>
      </section>
    </>
  )
}
