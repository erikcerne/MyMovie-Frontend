import type { TmdbReviewsDto } from "../Types";

export const Reviews = ({ Review }: { Review: TmdbReviewsDto }) => {
  return (
    <div className="m-4 rounded-xl border border-gray-500 p-5 text-gray-500">
      <div className="mb-4 flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-full"></div>

        <div>
          <p className="font-semibold">{Review.author_details.name}</p>

          <p className="text-sm text-gray-400">
            {new Date(Review.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-gray-500">{Review.content}</p>
    </div>
  );
};
