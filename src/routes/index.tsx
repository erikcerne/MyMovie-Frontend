import { createFileRoute } from "@tanstack/react-router";

import { MovieBord } from "../features/MovieBord";

import {
  nowPlayingMoviesQuery,
  popularMoviesQuery,
  topRatedMoviesQuery,
  upcomingMoviesQuery,
} from "../api/tmdbMovie";
import { FullMovieBord } from "../features/FullMovieBord";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  return (
    <div>
      <FullMovieBord />
      <MovieBord queryFn={upcomingMoviesQuery} title="Upcoming Movies" />
      <MovieBord queryFn={nowPlayingMoviesQuery} title="Now Playing Movies" />
      <MovieBord queryFn={topRatedMoviesQuery} title="Top Rated Movies" />
      <MovieBord queryFn={popularMoviesQuery} title="Popular Movies" />
      <Footer />
    </div>
  );
}
