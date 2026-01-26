
import { CreateReviewPayload } from "@/types/review";
import { api } from "./axios";

export const reviewApi = {
  create: (payload: CreateReviewPayload) =>
    api.post("/review", payload).then((r) => r.data),
};
