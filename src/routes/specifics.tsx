import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/specifics')({
  component: RouteComponent,
})

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  return <div>Hello "/specifics"!</div>
}
