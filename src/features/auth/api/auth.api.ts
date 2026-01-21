import { api } from "../../../services/api/axios";
import type { ApiResponse } from "@/types/api";
import { AuthData, LoginPayload, RegisterPayload } from "@/features/auth/auth.type";

export async function register(payload: RegisterPayload) {
  const res = await api.post<ApiResponse<AuthData>>(
    "/auth/register",
    payload
  );
  return res.data;
}


export async function login(payload: LoginPayload) {
  const { data } = await api.post<ApiResponse<AuthData>>("/auth/login", payload);
  return data;
}