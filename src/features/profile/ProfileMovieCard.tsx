import { Star } from "../../components/Star";
import type { UserMoviesDto } from "../../Types";

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL_POSTER as string;

export const ProfileMovieCard = ({ movie }: { movie: UserMoviesDto }) => {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

  return (
    <div className="group w-36 sm:w-44 md:w-52 flex-shrink-0 snap-start">
      <a href={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-base-300 shadow-md">
          <img
            src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.original_title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </a>

      <div className="mt-3 px-1">
        <h3 className="line-clamp-1 text-sm font-medium leading-snug text-base-content transition-colors duration-200 group-hover:text-primary">
          {movie.original_title}
        </h3>

        <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-500 leading-none truncate">
          <span className="inline-flex items-center gap-1">
            <Star />
            <span className="tabular-nums font-medium">{rating}</span>
          </span>

          <span className="text-white/20" aria-hidden="true">
            ·
          </span>
          <span className="tabular-nums">{releaseYear}</span>

          <span className="text-white/20" aria-hidden="true">
            ·
          </span>
          <span>Movie</span>
        </div>
      </div>
    </div>
  );
};
