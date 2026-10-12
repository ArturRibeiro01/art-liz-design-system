import { Box, Button, Container, Text } from '@art-liz/react'
import { Link } from 'react-router-dom'
import { useCounterStore } from '../store/counter'

export function HomePage() {
  const count = useCounterStore((state) => state.count)
  const increment = useCounterStore((state) => state.increment)

  return (
    <Container background="neutral.50" maxWidth="lg" padding={6}>
      <Box background="white" borderRadius="small" padding={6} shadow="sm">
        <Text as="h1" variant="h1">
          Sua aplicação começa aqui
        </Text>
        <Text variant="body">React, Vite e Art-Liz Design System já configurados.</Text>
        <Text aria-live="polite" variant="subtitle">
          Contagem: {count}
        </Text>
        <Button onClick={increment}>Aumentar contador</Button>
        <p>
          <Link to="/sobre">Sobre este template</Link>
        </p>
      </Box>
    </Container>
  )
}
