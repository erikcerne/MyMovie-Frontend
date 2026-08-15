export type TmdbMovieDto = {
  id: number;
  original_title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  popularity: number;
  vote_average: number;
  genre_ids: number[];
};

export type AuthorDetails = {
  name: string;
  username: string;
  rating: string;
};

export type TmdbReviewsDto = {
  content: string;
  createdAt: string;
  authorDetails: AuthorDetails;
};
