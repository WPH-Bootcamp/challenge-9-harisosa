import type { Errors } from "@/features/auth/auth.type";

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
