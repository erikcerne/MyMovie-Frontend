import { createFileRoute } from "@tanstack/react-router";

import { MovieBord } from "../features/MovieBord";

import { trendingMoviesQuery, upcomingMoviesQuery } from "../api/TmdbMovie";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Hello "/Index"!</h1>
      <MovieBord queryFn={upcomingMoviesQuery} title="Upcoming Movies" />
      <MovieBord queryFn={trendingMoviesQuery} title="Trending Movies" />
    </div>
  );
}
