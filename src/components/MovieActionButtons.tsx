import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { movieDetailsLogInQuery } from "../api/tmdbMovie";
import {
  useAddWatchedMutation,
  useUpdateStatusMutation,
  useUpdateReviewMutation,
  useAddReviewMutation,
  useDeleteMovieMutation,
} from "../api/userMovies";
import { ReviewFormModal } from "../components/Modal/ReviewFormModal";

type MovieActionButtonsProps = {
  tmdbId: number;
  isAuthenticated: boolean;
  token: string | null;
  showToast: (message: string) => void;
};

export const MovieActionButtons = ({
  tmdbId,
  isAuthenticated,
  token,
  showToast,
}: MovieActionButtonsProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const queryClient = useQueryClient();

  const addWatched = useAddWatchedMutation(token ?? "");
  const updateStatus = useUpdateStatusMutation(token ?? "");
  const addReview = useAddReviewMutation(token ?? "");
  const updateReview = useUpdateReviewMutation(token ?? "");
  const deleteMovie = useDeleteMovieMutation(token ?? "");

  const { data, isPending, isError } = useQuery(
    movieDetailsLogInQuery(tmdbId, token ?? ""),
  );

  if (!isAuthenticated) return null;

  if (isPending) {
    return (
      <div className="mt-1 flex gap-4">
        <span className="loading loading-spinner loading-sm text-white/60"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mt-1 text-sm text-red-400">
        Failed to load library status.
      </p>
    );
  }

  const watchStatus = data?.watchStatus;
  const hasReview = data?.rating !== null || data?.content !== null;

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
          showToast("Added to watchlist");
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

  return (
    <>
      <div className="mt-1 flex flex-wrap gap-4">
        {watchStatus === null && (
          <>
            <button
              type="button"
              onClick={handleAddToWatched}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
            >
              <span>Add To Watched</span>
            </button>
            <button
              type="button"
              onClick={handleAddWantToWatch}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
            >
              <span>Want to watch</span>
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(true)}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
            >
              <span>Add a review</span>
            </button>
          </>
        )}

        {watchStatus === "WANT_TO_WATCH" && (
          <>
            <button
              type="button"
              onClick={handleMarkAsWatched}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-white backdrop-blur-md transition-all duration-200 hover:border-primary/40 hover:bg-white/15 active:scale-[0.98]"
            >
              <span>Mark as Watched</span>
            </button>
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
              <span>Remove</span>
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
              <span>Remove</span>
            </button>
          </>
        )}
      </div>

      {showReviewForm && (
        <ReviewFormModal
          onClose={() => setShowReviewForm(false)}
          isSubmitting={addReview.isPending || updateReview.isPending}
          initialContent={data?.content}
          initialRating={data?.rating}
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
