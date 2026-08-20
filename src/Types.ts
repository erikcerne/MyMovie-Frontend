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

export type WatchStatus = 'WATCHED' | 'WANT_TO_WATCH';

export type UserMoviesDto = {
    content: string;
    rating: number | null; 
    tmdbId: number;
    status: WatchStatus;
    date: string;          
    originalTitle: string;
    posterPath: string;
    popularity: number;
}

export type AllUserMoviesDto = {
    reviewed: UserMoviesDto[];
    watched: UserMoviesDto[];
    wantToWatch: UserMoviesDto[];
}

export type AddRatingDto = {
    content: string;
    rating: number;
    tmdbId: number;
}
