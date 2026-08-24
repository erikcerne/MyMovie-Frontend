import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { movieDetailsLogInQuery } from "../api/TmdbMovie";
import {
  useAddWatchedMutation,
  useUpdateStatusMutation,
  useUpdateReviewMutation,
  useAddReviewMutation,
  useDeleteMovieMutation,
} from "../api/userMovies";
import { ReviewFormModal } from "../components/Modal/ReviewFormModal";
import type { TmdbMovieDetailsDto } from "../Types";

type MovieActionButtonsProps = {
  movieDetails: TmdbMovieDetailsDto;
  isAuthenticated: boolean;
  token: string | null;
  showToast: (message: string) => void;
};

export const MovieActionButtons = ({
  movieDetails,
  isAuthenticated,
  token,
  showToast,
}: MovieActionButtonsProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const queryClient = useQueryClient();
  const tmdbId = movieDetails.id;
  const addWatched = useAddWatchedMutation(token ?? "");
  const updateStatus = useUpdateStatusMutation(token ?? "");
  const addReview = useAddReviewMutation(token ?? "");
  const updateReview = useUpdateReviewMutation(token ?? "");
  const deleteMovie = useDeleteMovieMutation(token ?? "");

  const { data, isPending, isError } = useQuery(
    movieDetailsLogInQuery(tmdbId, token ?? ""),
  );

  // Vissar meddelande för utloggade användare med en snygg "chip"-design
  if (!isAuthenticated) {
    return (
      <div className="mt-6">
        <p className="inline-block rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 shadow-sm backdrop-blur-md">
          Login to add movies to your library
        </p>
      </div>
    );
  }

  // Laddningsstate som tar upp ungefär samma utrymme för att undvika hopp
  if (isPending || !data) {
    return (
      <div className="mt-4 flex min-h-[60px] items-center gap-4">
        <span className="loading loading-spinner loading-sm text-white/60"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mt-4 text-sm text-red-400">
        Failed to load library status.
      </p>
    );
  }

  const movieTitle = movieDetails.original_title;
  const watchStatus = data.watchStatus;
  const hasReview = data.rating !== null || data.content !== null;

  const invalidateMovieData = () => {
    void queryClient.invalidateQueries({
      queryKey: ["movie", "details", "logged-in", tmdbId],
    });
    void queryClient.invalidateQueries({ queryKey: ["usermovies"] });
  };

  const handleAddToWatched = () => {
    addWatched.mutate(
      { tmdbId, watchStatus: "WATCHED" },
      {
        onSuccess: () => {
          showToast("Added to watched");
          invalidateMovieData();
        },
      },
    );
  };

  const handleAddWantToWatch = () => {
    addWatched.mutate(
      { tmdbId, watchStatus: "WANT_TO_WATCH" },
      {
        onSuccess: () => {
          showToast("Added to movie library");
          invalidateMovieData();
        },
      },
    );
  };

  const handleMarkAsWatched = () => {
    updateStatus.mutate(
      { tmdbId, watchStatus: "WATCHED" },
      {
        onSuccess: () => {
          showToast("Marked as watched");
          invalidateMovieData();
        },
      },
    );
  };

  const handleDelete = () => {
    deleteMovie.mutate(tmdbId, {
      onSuccess: () => {
        showToast("Removed from library");
        invalidateMovieData();
      },
    });
  };

  const deleteLabel =
    watchStatus === "WANT_TO_WATCH"
      ? "Remove from watchlist"
      : hasReview
        ? "Remove review"
        : "Remove from library";

  return (
    <>
      {/* Ändrade till mt-4 för att ge knapparna lite mer andrum neråt från filmbeskrivningen */}
      <div className="mt-4 flex flex-col gap-3">
        
        {/* FAST HÖJD HÄR (min-h-[20px]) löser problemet med knappar som hoppar */}
        <div className="flex min-h-[20px] items-center text-sm font-medium text-white/80">
          {watchStatus === "WANT_TO_WATCH" && (
            <span>{movieTitle} is in your movie library</span>
          )}
          {watchStatus === "WATCHED" && (
            <span>
              {hasReview
                ? `You have reviewed ${movieTitle}`
                : `You have watched ${movieTitle}`}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {watchStatus === null && (
            <>
              <button
                type="button"
                onClick={() => setShowReviewForm(true)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
              >
                <span>Add a review</span>
              </button>
              <button
                type="button"
                onClick={handleAddToWatched}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
              >
                <span>Have Watched</span>
              </button>
              <button
                type="button"
                onClick={handleAddWantToWatch}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
              >
                <span>Add to Movie Library</span>
              </button>
            </>
          )}

          {watchStatus === "WANT_TO_WATCH" && (
            <>
              <button
                type="button"
                onClick={() => setShowReviewForm(true)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
              >
                <span>{hasReview ? "Update review" : "Add a review"}</span>
              </button>
              <button
                type="button"
                onClick={handleMarkAsWatched}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
              >
                <span>Have Watched</span>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-6 py-2.5 text-red-200 backdrop-blur-md transition-all duration-200 hover:bg-red-500/20 active:scale-[0.98]"
              >
                <span>{deleteLabel}</span>
              </button>
            </>
          )}

          {watchStatus === "WATCHED" && (
            <>
              <button
                type="button"
                onClick={() => setShowReviewForm(true)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
              >
                <span>{hasReview ? "Update review" : "Add a review"}</span>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-6 py-2.5 text-red-200 backdrop-blur-md transition-all duration-200 hover:bg-red-500/20 active:scale-[0.98]"
              >
                <span>{deleteLabel}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {showReviewForm && (
        <ReviewFormModal
          onClose={() => setShowReviewForm(false)}
          isSubmitting={addReview.isPending || updateReview.isPending}
          initialContent={data.content}
          initialRating={data.rating}
          onSubmit={(content, rating) => {
            const payload = { content, rating, tmdbId };
            const options = {
              onSuccess: () => {
                setShowReviewForm(false);
                showToast(hasReview ? "Review updated" : "Review saved");
                invalidateMovieData();
              },
            };
            if (hasReview) {
              updateReview.mutate(payload, options);
            } else {
              addReview.mutate(payload, options);
            }
          }}
        />
      )}
    </>
  );
};