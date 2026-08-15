import { RouterProvider, createRouter } from '@tanstack/react-router'
// 1. Importera det som behövs från React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'

// 2. Skapa din QueryClient (detta är "hjärnan" som håller all cachad data)
const queryClient = new QueryClient()

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    // 3. Slå in hela din Router i QueryClientProvider och skicka med din client
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App