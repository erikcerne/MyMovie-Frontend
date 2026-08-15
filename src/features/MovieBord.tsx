import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { TmdbMovieDto } from "../Types";
import { MovieCard } from "./MovieCard";

type MovieBordProps = {
  queryFn: () => UseQueryOptions<TmdbMovieDto[], Error, TmdbMovieDto[], string[]>;
};

export const MovieBord = ({ queryFn }: MovieBordProps) => {
  const { data, isPending, isError, error } = useQuery(queryFn());

  if (isPending) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {(data as TmdbMovieDto[]).map((movie: TmdbMovieDto) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};