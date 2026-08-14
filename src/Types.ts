export type TmdbMovieDto = {
  id: number;
  originalTitle: string;
  overview: string;
  backdropPath: string | null;
  posterPath: string | null;
  releaseDate: string;
  popularity: number;
  voteAverage: number;
  genreIds: number[];
};

export type AuthorDetails = {
    name: string;
    username: string;
    rating: string;
}

export type TmdbReviewsDto = {
    content: string;
    createdAt: string;
    authorDetails: AuthorDetails;
}
