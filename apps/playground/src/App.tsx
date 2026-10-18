import { RemainingComponentsGallery } from './RemainingComponentsGallery'
import { Button, Checkbox, Input, Text } from '@art-liz/react'
import { useState } from 'react'
import { ComponentGallery } from './ComponentGallery'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [result, setResult] = useState('')
  return (
    <main className="playground">
      <header>
        <p className="eyebrow">ART-LIZ / DESIGN SYSTEM</p>
        <h1>Component playground</h1>
        <p className="intro">Um espaço para validar componentes em um app consumidor real.</p>
      </header>
      <section aria-labelledby="button-title">
        <h2 id="button-title">Button</h2>
        <div className="button-row">
          <Button>Primary action</Button>
          <Button variant="outline">Outline action</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
      <section aria-labelledby="form-title">
        <h2 id="form-title">Input e Checkbox</h2>
        <form
          className="form-example"
          onSubmit={(event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            setResult(
              `${data.get('name')}: ${data.has('news') ? 'receberá novidades' : 'cadastro sem novidades'}.`,
            )
          }}
        >
          <Input
            clearable
            helpText="Informe como prefere ser chamado."
            label="Nome"
            name="name"
            onChange={(event) => setName(event.target.value)}
            onClear={() => setName('')}
            required
            value={name}
          />
          <Input label="E-mail" name="email" placeholder="voce@exemplo.com" required type="email" />
          <Checkbox label="Quero receber novidades do design system" name="news" />
          <Button type="submit">Salvar preferências</Button>
          <Text role="status">{result}</Text>
        </form>
      </section>
      <section aria-labelledby="typography-title">
        <h2 id="typography-title">Typography</h2>
        <div className="typography-example">
          <Text as="h1" variant="h1">
            Título principal
          </Text>
          <Text as="p" variant="body">
            Texto de corpo usa a escala tipográfica definida nos tokens do design system.
          </Text>
        </div>
      </section>
      <ComponentGallery />
      <RemainingComponentsGallery />
    </main>
  )
}

export default App
