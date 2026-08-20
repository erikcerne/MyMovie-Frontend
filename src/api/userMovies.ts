import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import type { AddRatingDto } from "../Types";

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
