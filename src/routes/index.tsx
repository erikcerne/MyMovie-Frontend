import { createFileRoute } from "@tanstack/react-router";

import { MovieBord } from "../features/MovieBord";

import {
  nowPlayingMoviesQuery,
  topRatedMoviesQuery,
  upcomingMoviesQuery,
} from "../api/TmdbMovie";
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
      <MovieBord queryFn={upcomingMoviesQuery} title="Upcoming" />
      <MovieBord queryFn={nowPlayingMoviesQuery} title="Now Playing" />
      <MovieBord queryFn={topRatedMoviesQuery} title="Top Rated" />
      <Footer />
    </div>
  );
}
