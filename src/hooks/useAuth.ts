import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const useAuth = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();

  const [needsUsername, setNeedsUsername] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);

          const res = await fetch(`${API_BASE_URL}/isExistingUser`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const exists: boolean = await res.json();

          if (!exists) {
            setNeedsUsername(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    
    init();
  }, [isAuthenticated, getAccessTokenSilently]);

  return {
    isAuthenticated,
    login: loginWithRedirect,
    logout: () =>
      logout({ logoutParams: { returnTo: window.location.origin } }),
    user,
    isLoading,
    getAccessTokenSilently,
    token,
    needsUsername,
    setNeedsUsername,
  };
};
