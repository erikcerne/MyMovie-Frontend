import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { AddRatingDto, AllUserMoviesDto } from "../Types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const useAddReviewMutation = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: AddRatingDto) => {
      const res = await fetch(`${API_BASE_URL}/add/revewe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });
      if (!res.ok) throw new Error("Kunde inte spara recensionen");
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["usermovies"] }),
  });
};

export const allUserMoviesQuery = (token: string) =>
  queryOptions({
    queryKey: ["usermovies", "all"],
    queryFn: async (): Promise<AllUserMoviesDto> => {
      const res = await fetch(`${API_BASE_URL}/usermovie/get/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Kunde inte hämta dina filmer");
      return res.json();
    },
    enabled: !!token,
  });

