import { api } from "./axios";
import type { RegisterPayload, RegisterData } from "@/types/auth";
import type { ApiResponse } from "@/types/api";

export async function register(payload: RegisterPayload) {
  const res = await api.post<ApiResponse<RegisterData>>(
    "/api/auth/register",
    payload
  );
  return res.data;
}
