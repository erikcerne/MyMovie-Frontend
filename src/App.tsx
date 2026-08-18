import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";

import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, VITE_AUTH0_AUDIENCE } =
    import.meta.env;

  return (
    <Auth0Provider
      domain={VITE_AUTH0_DOMAIN}
      clientId={VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: VITE_AUTH0_AUDIENCE,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Auth0Provider>
  );
}

export default App;
