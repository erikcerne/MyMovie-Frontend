import MyMovieIcon from "../assets/movie-icon-7.png";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "@tanstack/react-router";

export const Header = () => {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect: login,
    logout: auth0Logout,
  } = useAuth0();

  if (isLoading) return <div className="p-4">Loading...</div>;

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  return (
    <header className="relative mx-auto flex h-[68px] w-[75%] items-center justify-between bg-transparent md:h-[80px]">
      <Link to="/" className="group relative z-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary transition-transform duration-300 group-hover:scale-105">
          <img src={MyMovieIcon} alt="MyMovie Icon" />
        </div>
        <span className="text-xl font-bold text-base-content md:text-2xl">
          MyMovies
        </span>
      </Link>

      <nav className="relative z-10 hidden items-center gap-2 md:flex">
        <Link
          to="/"
          className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-content transition-all duration-200 hover:bg-base-200 hover:text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="font-medium">Home</span>
        </Link>

        <div className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-content transition-all duration-200 hover:bg-base-200 hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="font-medium">Search</span>
        </div>

        {isAuthenticated ? (
          <Link
            to="/profile"
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-content transition-all duration-200 hover:bg-base-200 hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
            <span className="font-medium">Profile</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => login()}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-content transition-all duration-200 hover:bg-base-200 hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
            <span className="font-medium">Profile</span>
          </button>
        )}

        {!isAuthenticated ? (
          <>
            <button
              type="button"
              onClick={() => login()}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-content transition-all duration-200 hover:bg-base-200 hover:text-primary"
            >
              <span className="font-medium">Login</span>
            </button>
            <button
              type="button"
              onClick={() => signup()}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-content transition-all duration-200 hover:bg-base-200 hover:text-primary"
            >
              <span className="font-medium">Signup</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => logout()}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-base-content transition-all duration-200 hover:bg-base-200 hover:text-primary"
          >
            <span className="font-medium">Logout</span>
          </button>
        )}
      </nav>
    </header>
  );
};
