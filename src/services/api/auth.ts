import { UpdateProfileInput, User } from "@/types";
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

export const updateProfile = async (input: UpdateProfileInput) => {
  const fd = new FormData();
  if (input.name) fd.append("name", input.name);
  if (input.email) fd.append("email", input.email);
  if (input.phone) fd.append("phone", input.phone);
  if (input.avatar instanceof File) fd.append("avatar", input.avatar);

  const res = await api.put<ApiResponse<User>>("/auth/profile", fd, {
    headers: {
      "Content-Type": undefined as unknown as string,
    },
  });

  return res.data;
}
