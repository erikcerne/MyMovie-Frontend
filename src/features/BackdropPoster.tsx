import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { movieDetailsQuery } from "../api/TmdbMovie";
import { Header } from "../components/Header";
import { Star } from "../components/Star";
import { useAuth } from "../hooks/useAuth";
import { MovieActionButtons } from "../components/MovieActionButtons"; 

const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL_BACKDROP as string;

export const BackdropPoster = ({ movieid }: { movieid: string }) => {
  const { token, isAuthenticated } = useAuth();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const movieIdNumber = Number(movieid);
  const { data, isPending, isError, error } = useQuery(
    movieDetailsQuery(movieIdNumber),
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
        [GET] Failed: {error.message}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={`${TMDB_IMAGE_BASE_URL}${data?.backdrop_path}`}
          alt={data?.original_title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 via-15% to-transparent to-30%" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 via-20% to-transparent to-50%" />
      </div>
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="relative z-10 mx-auto flex h-full w-[75%] flex-col justify-end pb-10 md:pb-20">
        <h2 className="max-w-2xl text-2xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] md:text-4xl xl:text-5xl">
          {data?.original_title}
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/80">
          <span className="inline-flex items-center gap-1.5">
            <Star />
            {data?.vote_average.toFixed(1)}
          </span>
          <span className="text-white/30" aria-hidden="true">
            ·
          </span>
        </div>

        <p className="mt-4 line-clamp-3 max-w-xl text-sm text-white/90 md:text-base">
          {data.overview}
        </p>

        <MovieActionButtons
          tmdbId={data.id}
          isAuthenticated={isAuthenticated}
          token={token}
          showToast={showToast}
        />
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-white/20 bg-black/90 px-6 py-3 text-sm text-white backdrop-blur-md">
          {toast}
        </div>
      )}
    </div>
  );
};
