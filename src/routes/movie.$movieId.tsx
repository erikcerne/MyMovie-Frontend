import { createFileRoute } from "@tanstack/react-router";
import { BackdropPoster } from "../features/BackdropPoster";
import { movieReviewsQuery, SimilarMoviesQuery } from "../api/TmdbMovie";
import { useQuery } from "@tanstack/react-query";
import type { TmdbMovieDto } from "../Types";
import { MovieCard } from "../features/MovieCard";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { Reviews } from "../features/Reviews";

export const Route = createFileRoute("/movie/$movieId")({
  component: RouteComponent,
});
// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { movieId }: { movieId: string } = Route.useParams();
  const movieIdNumber = Number(movieId);
  const [activeTab, setActiveTab] = useState<"Similar Movies" | "Reviews">(
    "Similar Movies",
  );

  const { data } = useQuery(SimilarMoviesQuery(movieIdNumber));
  const { data: reviewsData } = useQuery(movieReviewsQuery(movieIdNumber));

  return (
    <>
      <BackdropPoster movieid={movieId} />
      <div className="mx-auto w-[75%] mt-5 mb-5">
        {" "}
        <div className="inline-flex w-fit items-center rounded-full bg-base-200 p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("Similar Movies")}
            className={`rounded-full px-6 py-2.5 text-base font-medium transition-colors ${
              activeTab === "Similar Movies"
                ? "bg-base-100 text-base-content shadow-md"
                : "text-gray-500 hover:text-base-content"
            }`}
          >
            Similar Movies
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("Reviews")}
            className={`rounded-full px-6 py-2.5 text-base font-medium transition-colors ${
              activeTab === "Reviews"
                ? "bg-base-100 text-base-content shadow-md"
                : "text-gray-500 hover:text-base-content"
            }`}
          >
            Reviews
          </button>
        </div>
      </div>
      {activeTab === "Similar Movies" && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {(data as TmdbMovieDto[])?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {activeTab === "Reviews" && (
        <div className="p-4">
          {reviewsData?.map((review) => (
            <Reviews key={review.author_details.username} Review={review} />
          ))}
        </div>
      )}

      <Footer />
    </>
  );
}
