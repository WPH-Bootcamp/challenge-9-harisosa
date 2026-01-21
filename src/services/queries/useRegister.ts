"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/features/store/hook";

import { register } from "../api/auth";
import { setSession } from "../../features/auth/auth.slice";
import { mapAuthFieldErrorsToErrors, parseFieldErrors } from "../../lib/parseFieldErrors";

import type { ApiResponse } from "@/types/api";
import type { AuthData, Errors, RegisterPayload } from "../../types/auth";

type SetErrors = React.Dispatch<React.SetStateAction<Errors>>;

export function useRegister(setErrors: SetErrors) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });

  const submitRegister = async (form: RegisterPayload) => {

    setErrors((prev) => ({ ...prev, form: undefined }));

    try {
      const res = (await mutation.mutateAsync(form)) as ApiResponse<AuthData>;

      if (!res.success) {
        setErrors((prev) => ({
          ...prev,
          form: res.message || "Register gagal",
        }));
        return false;
      }

      dispatch(setSession({ user: res.data.user, token: res.data.token }));
      router.push("/");
      return true;
    } catch (err) {
      const { fieldErrors, formError } = parseFieldErrors(err);

      setErrors((prev) => ({
        ...prev,
        ...mapAuthFieldErrorsToErrors(fieldErrors),
        ...(formError ? { form: formError } : {}),
      }));

      return false;
    }
  };

  return {
    submitRegister,
    isPending: mutation.isPending,
  };
}
