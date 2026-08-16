import { Header } from "../components/Header";
import type { TmdbMovieDto } from "../Types";

export const FullMovieCard = ({ movie }: { movie: TmdbMovieDto }) => {
  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.original_title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 via-15% to-transparent to-30%" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 via-20% to-transparent to-50%" />{" "}
      </div>
      <Header />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-10 md:px-12 md:pb-20 w-[75vw] mx-auto">
        {" "}
        <h2 className="text-2xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] md:text-4xl xl:text-5xl">
          {movie.original_title}
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/80 ">
          <span className="inline-flex items-center gap-1.5">
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
              className="fill-primary text-primary"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-white/30" aria-hidden="true">
            ·
          </span>
        </div>
        <p className="mt-4 line-clamp-3 max-w-xl text-sm text-white/90 md:text-base">
          {movie.overview.length > 230
            ? `${movie.overview.substring(0, 230)}...`
            : movie.overview}
        </p>
        <div className="mt-6">
          <a href={`/movie/${movie.id}`}>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              <span>See More</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
