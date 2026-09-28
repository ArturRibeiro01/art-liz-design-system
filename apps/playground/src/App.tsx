import { Button } from '@art-liz/react'
import './App.css'

function App() {
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
          <Button variant="secondary">Secondary action</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </main>
  )
}

export default App
