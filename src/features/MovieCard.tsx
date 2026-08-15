import type { TmdbMovieDto } from "../Types";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MovieCard = ({ movie }: { movie: TmdbMovieDto }) => {

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        {movie.poster_path ? (
          <img
            src={`${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`}
            alt={movie.original_title}
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
            <span>Ingen bild</span>
          </div>
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title">{movie.original_title}</h2>

        

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary">Add to Watchlist</button>
        </div>
      </div>
    </div>
  );
};
