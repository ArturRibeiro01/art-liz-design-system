import { Container, Text } from '@art-liz/react'
import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <Container maxWidth="md" padding={6}>
      <Text as="h1" variant="h1">
        Sobre este template
      </Text>
      <Text variant="body">
        O projeto usa React Router para navegação, Zustand para estado local e TanStack Query para
        estado de servidor.
      </Text>
      <Link to="/">Voltar ao início</Link>
    </Container>
  )
}
