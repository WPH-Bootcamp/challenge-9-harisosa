import axios from "axios";
import { AuthErrorResponse, FieldError } from "../auth.type";

export function parseFieldErrors(err: unknown): {
  fieldErrors?: Record<string, string>;
  formError?: string;
} {
  if (!axios.isAxiosError<AuthErrorResponse>(err)) {
    return { formError: "Request failed" };
  }

  const responseData = err.response?.data;

  if (!responseData) {
    return { formError: "Request failed" };
  }

  const { errors, message } = responseData;

  if (Array.isArray(errors)) {
    const fieldErrors: Record<string, string> = {};

    errors.forEach((e: FieldError) => {
      if (e.path && e.msg) {
        fieldErrors[e.path] = e.msg;
      }
    });

    return { fieldErrors };
  }

  if (typeof errors === "object" && typeof errors?.message === "string") {
    return { formError: errors.message };
  }

  if (typeof message === "string") {
    return { formError: message };
  }

  return { formError: "Request failed" };
}


