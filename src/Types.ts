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
  created_at: string;
  author_details: AuthorDetails;
};

export type WatchStatus = "WATCHED" | "WANT_TO_WATCH";

export type UserMoviesDto = {
  content: string;
  rating: number | null;
  id: number;
  status: WatchStatus;
  date: string;
  original_title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

export type AllUserMoviesDto = {
  reviewed: UserMoviesDto[];
  watched: UserMoviesDto[];
  want_to_watch: UserMoviesDto[];
};

export type AddRatingDto = {
  content: string;
  rating: number;
  tmdbId: number;
};

export type AddToLibraryDto = {
  watchStatus: WatchStatus;
  tmdbId: number;
};

export type RegisterUserDto = {
  name: string;
};
