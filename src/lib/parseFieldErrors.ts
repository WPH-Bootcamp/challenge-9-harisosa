import axios from "axios";
import { Errors, AuthErrorResponse, FieldError } from "@/types/auth";


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



export const mapAuthFieldErrorsToErrors =(
  fieldErrors?: Record<string, string>
): Errors => {
  const e: Errors = {};
  if (!fieldErrors) return e;

  for (const [key, message] of Object.entries(fieldErrors)) {
    if (key === "name") e.name = message;
    if (key === "email") e.email = message;
    if (key === "phone") e.phone = message;
    if (key === "password") e.password = message;
    if (key === "confirmPassword") e.confirmPassword = message;
  }
  return e;
}




export const parseAuthFormErrors = (err: unknown): Errors => {
  const { fieldErrors, formError } = parseFieldErrors(err);
  return {
    ...mapAuthFieldErrorsToErrors(fieldErrors),
    ...(formError ? { form: formError } : {}),
  };
}

