"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "store/hook";

import { register } from "../api/auth.api";
import { setSession } from "../auth.slice";
import { parseFieldErrors } from "../utlis/parseFieldErrors";

import type { ApiResponse } from "@/types/api";
import type { AuthData, Errors, RegisterPayload } from "../auth.type";
import { mapAuthFieldErrorsToErrors } from "../utlis/mapAuthFieldErrorsToErrors";

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
