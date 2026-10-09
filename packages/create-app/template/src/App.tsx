import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 60_000 },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<AboutPage />} path="/sobre" />
          <Route element={<HomePage />} path="*" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
