import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { UsernameModal } from "../components/UsernameModal";

export const Route = createRootRoute({
  component: () => (
    <>
      <main className="w-full">
        <Outlet />
        <UsernameModal />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
