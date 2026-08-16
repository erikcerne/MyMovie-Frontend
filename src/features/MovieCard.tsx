import type { TmdbMovieDto } from "../Types";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

export const MovieCard = ({ movie }: { movie: TmdbMovieDto }) => {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

  return (
    <div className="group w-36 sm:w-44 md:w-52 flex-shrink-0 snap-start">
      <a href={`/movie/${movie.id}`} className="block">{/* plasholder */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-base-300 shadow-md">
          {movie.poster_path ? (
            <>
              <img
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.original_title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-base-200 text-sm text-gray-500">
              Ingen bild
            </div>
          )}
        </div>
      </a>

      <div className="mt-3 px-1">
        <h3 className="line-clamp-1 text-sm font-medium leading-snug text-base-content transition-colors duration-200 group-hover:text-primary">
          {movie.original_title}
        </h3>

        <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-500 leading-none truncate">
          <span className="inline-flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="fill-primary/80 text-primary"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
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
