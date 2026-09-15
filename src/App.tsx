import { RouterProvider } from '@tanstack/react-router'
import { QueryProvider } from '@app/providers'
import { router } from '@app/routes'

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}

export default App


