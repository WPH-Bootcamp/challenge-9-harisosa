import { mapAuthFieldErrorsToErrors } from "./mapAuthFieldErrorsToErrors";
import { parseFieldErrors } from "./parseFieldErrors";

import type { Errors } from "@/features/auth/auth.type";

export const parseAuthFormErrors = (err: unknown): Errors => {
  const { fieldErrors, formError } = parseFieldErrors(err);
  return {
    ...mapAuthFieldErrorsToErrors(fieldErrors),
    ...(formError ? { form: formError } : {}),
  };
}
