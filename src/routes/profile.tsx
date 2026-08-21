import { createFileRoute } from "@tanstack/react-router";
import { ProfileMovieBord } from "../features/profile/ProfileMovieBoard";
import { useQuery } from "@tanstack/react-query";
import { allUserMoviesQuery } from "../api/userMovies";
import { useAuth } from "../hooks/useAuth";
import { ProfileFullMovieBord } from "../features/profile/ProfileFullMovieBord";
import { Header } from "../components/Header";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { token } = useAuth();
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

  return reviewed.length === 0 &&
    watched.length === 0 &&
    want_to_watch.length === 0 ? (
    <>
      <Header />
      <div className="mx-auto flex w-[75%] flex-col items-center gap-3 py-24 text-center">
        <h2 className="text-xl font-black uppercase tracking-[-0.02em] text-white">
          No saved movies yet
        </h2>
        <p className="max-w-md text-sm text-white/60">
          Your saved movies will show up here once you add something to your
          watchlist, mark a movie as watched, or write a review.
        </p>
      </div>
    </>
  ) : (
    <div className="flex flex-col gap-10">
          <ProfileFullMovieBord/> 
          {reviewed.length > 0 ? (<ProfileMovieBord title="Movies you have reviewed" userMoviesDto={reviewed}/>) : (<></>)}
          {watched.length > 0 ? (<ProfileMovieBord title="Movies you have seen" userMoviesDto={watched}/>) : (<></>)}
          {want_to_watch.length > 0 ? (<ProfileMovieBord title="Movies in yore watchlist" userMoviesDto={want_to_watch}/>) : (<></>)}
    </div>
  );
}
