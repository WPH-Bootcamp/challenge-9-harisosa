import { api } from "./axios";
import type { ApiResponse } from "@/types/api";
import { AuthData, LoginPayload, RegisterPayload } from "@/types/auth";

export const register = async (payload: RegisterPayload) => {
  const res = await api.post<ApiResponse<AuthData>> (
    "/auth/register",
    payload
  );
  return res.data;
}


export const login = async (payload: LoginPayload) => {
  const { data } = await api.post<ApiResponse<AuthData>>("/auth/login", payload);
  return data;
}