import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/movie')({
  component: RouteComponent,
})

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  return <div>Hello "/movie"!</div>
}
