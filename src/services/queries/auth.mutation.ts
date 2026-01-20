import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/api/auth";
import type { RegisterPayload } from "@/types/auth";
import axios from "axios";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });
}


type FieldError = {
  path: string;
  msg: string;
};

export function parseFieldErrors(err: unknown): {
  fieldErrors?: Record<string, string>;
  formError?: string;
} {

  if (!axios.isAxiosError(err)) {
    return { formError: "Request failed" };
  }

  const data = err.response?.data.errors;
console.log(data)
  if (Array.isArray(data)) {
    const fieldErrors: Record<string, string> = {};
    data.forEach((e: FieldError) => {
      if (e.path && e.msg) {
        fieldErrors[e.path] = e.msg;
      }
    });
    return { fieldErrors };
  }

  // CASE 2: normal error object
  if (typeof data?.message === "string") {
    return { formError: data.message };
  }

  return { formError: "Request failed" };
}