import { queryOptions } from "@tanstack/react-query";
import type { TmdbMovieDto, TmdbReviewsDto } from "../Types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const upcomingMoviesQuery = () =>
  queryOptions({
    queryKey: ["movies", "upcoming"],
    queryFn: async (): Promise<TmdbMovieDto[]> => {
      const res = await fetch(`${API_BASE_URL}/movies/upcoming`);
      if (!res.ok) throw new Error("Could not retrieve movies");
      const data = await res.json();
      return data.results;
    },
  });

export const trendingMoviesQuery = () =>
  queryOptions({
    queryKey: ["movies", "trending"],
    queryFn: async (): Promise<TmdbMovieDto[]> => {
      const res = await fetch(`${API_BASE_URL}/movies/trending`);
      if (!res.ok) throw new Error("Could not retrieve movies");
      const data = await res.json();
      return data.results;
    },
  });

export const topRatedMoviesQuery = () =>
  queryOptions({
    queryKey: ["movies", "top_rated"],
    queryFn: async (): Promise<TmdbMovieDto[]> => {
      const res = await fetch(`${API_BASE_URL}/movies/top-rated`);
      if (!res.ok) throw new Error("Could not retrieve movies");
      const data = await res.json();
      return data.results;
    },
  });

export const nowPlayingMoviesQuery = () =>
  queryOptions({
    queryKey: ["movies", "nowplaying"],
    queryFn: async (): Promise<TmdbMovieDto[]> => {
      const res = await fetch(`${API_BASE_URL}/movies/now-playing`);
      if (!res.ok) throw new Error("Could not retrieve movies");
      const data = await res.json();
      return data.results;
    },
  });

  export const popularMoviesQuery = () =>
  queryOptions({
    queryKey: ["movies", "nowplaying"],
    queryFn: async (): Promise<TmdbMovieDto[]> => {
      const res = await fetch(`${API_BASE_URL}/movies/popular`);
      if (!res.ok) throw new Error("Could not retrieve movies");
      const data = await res.json();
      return data.results;
    },
  });

export const movieDetailsQuery = (id: number) =>
  queryOptions({
    queryKey: ["movie", "details", id],
    queryFn: async (): Promise<TmdbMovieDto> => {
      const res = await fetch(`${API_BASE_URL}/movies/${id}`);
      if (!res.ok) throw new Error("Could not retrieve movies");
      return res.json();
    },
    enabled: !!id,
  });

export const movieReviewsQuery = (id: number) =>
  queryOptions({
    queryKey: ["movie", "reviews", id],
    queryFn: async (): Promise<TmdbReviewsDto[]> => {
      const res = await fetch(`${API_BASE_URL}/movies/${id}/reviews`);
      if (!res.ok) throw new Error("Could not retrieve movies");
      const data = await res.json();
      return data.results;
    },
    enabled: !!id,
  });

export const SimilarMoviesQuery = (id: number) =>
  queryOptions({
    queryKey: ["movie", "similar", id],
    queryFn: async (): Promise<TmdbMovieDto[]> => {
      const res = await fetch(`${API_BASE_URL}/movies/${id}/similar`);
      if (!res.ok) throw new Error("Could not retrieve movies");
      const data = await res.json();
      return data.results;
    },
    enabled: !!id,
  });
