// services/queries/useCreateReview.ts
import { useMutation } from "@tanstack/react-query";
import type { CreateReviewPayload } from "@/types/review";
import { reviewApi } from "../api/review";

export function useCreateReview() {
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewApi.create(payload),
  });
}
