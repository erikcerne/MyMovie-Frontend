import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Header } from '../components/Header'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </>
  ),
})