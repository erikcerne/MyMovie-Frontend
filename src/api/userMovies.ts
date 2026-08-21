import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { AddRatingDto, AddToLibraryDto, AllUserMoviesDto, RegisterUserDto } from "../Types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const allUserMoviesQuery = (token: string) =>
  queryOptions({
    queryKey: ["usermovies", "all"],
    queryFn: async (): Promise<AllUserMoviesDto> => {
      const res = await fetch(`${API_BASE_URL}/users/me/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Could not get youre movies");
      return res.json();
    },
    enabled: !!token,
  });

export const useAddReviewMutation = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: AddRatingDto) => {
      const res = await fetch(`${API_BASE_URL}/users/me/movies/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });
      if (!res.ok) throw new Error("Could not save");
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["usermovies"] }),
  });
};

export const useAddWatchedMutation = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movie: AddToLibraryDto) => {
      const res = await fetch(`${API_BASE_URL}/users/me/movies/library`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movie),
      });

      if (!res.ok) {
        throw new Error("Kunde inte lägga till film");
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["usermovies"] }),
  });
};

export const useRegisterUserMutation = (token: string) => {
  return useMutation({
    mutationFn: async (dto: RegisterUserDto) => {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        throw new Error("Could not register username");
      }
    },
  });
};
