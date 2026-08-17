import { Star } from "../components/Star";
import type { TmdbReviewsDto } from "../Types";

export const Reviews = ({ Review }: { Review: TmdbReviewsDto }) => {
  return (
    <div className="m-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4 sm:flex-nowrap">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
            {(
              Review.author_details.name ||
              Review.author_details.username ||
              "?"
            )
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {Review.author_details.name || Review.author_details.username}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(Review.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {Review.author_details.rating && (
          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-sm font-bold shadow-sm">
            <Star />
            <span>{Review.author_details.rating}</span>
          </div>
        )}
      </div>

      <p className="leading-relaxed text-gray-700 dark:text-gray-300">
        {Review.content}
      </p>
    </div>
  );
};
