import { createFileRoute } from "@tanstack/react-router";
import { ProfileMovieBord } from "../features/profile/ProfileMovieBoard";
import { useQuery } from "@tanstack/react-query";
import { allUserMoviesQuery } from "../api/userMovies";
import { useAuth } from "../hooks/useAuth";
import { ProfileFullMovieBord } from "../features/profile/ProfileFullMovieBord";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { token, isAuthenticated } = useAuth();
  const { data, isPending, isError, error } = useQuery(
    allUserMoviesQuery(token ?? ""),
  );

  if (isPending) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="m-4 rounded-xl border border-red-500 p-5 text-red-500">
        [GET] Misslyckades: {error.message}
      </div>
    );
  }

  const { reviewed, watched, want_to_watch } = data;

  return (
    <>
      {isAuthenticated ? (
        <div>
          <ProfileFullMovieBord/> 
          <ProfileMovieBord title="Movies you have reviewed" userMoviesDto={reviewed}/>
          <ProfileMovieBord title="Movies you have seen" userMoviesDto={watched}/>
          <ProfileMovieBord title="Movies in yore watchlist" userMoviesDto={want_to_watch}/>
        </div>
      ) : (
        <>
        This is your movie library login to see all your saved movies</>
      )}
    </>
  );
}
