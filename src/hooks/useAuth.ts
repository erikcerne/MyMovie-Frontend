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

  useEffect(() => {
    const checkExistingUser = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const res = await fetch(`${API_BASE_URL}/isExistingUser`, {
            headers: { Authorization: `Bearer ${token}` },
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

    checkExistingUser();
  }, [isAuthenticated, getAccessTokenSilently]);

  return {
    isAuthenticated,
    login: loginWithRedirect,
    logout: () =>
      logout({ logoutParams: { returnTo: window.location.origin } }),
    user,
    isLoading,
    getAccessTokenSilently,
    needsUsername,
    setNeedsUsername,
  };
};
