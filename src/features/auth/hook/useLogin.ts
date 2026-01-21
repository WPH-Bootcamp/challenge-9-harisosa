import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "store/hook";
import { AuthData, LoginPayload } from "../auth.type";
import { login } from "../api/auth.api";
import { ApiResponse } from "@/types/api";
import { setSession } from "../auth.slice";
import { parseFieldErrors } from "../utlis/parseFieldErrors";



export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),

    onSuccess: (res: ApiResponse<AuthData>) => {
      if (!res.success) return;

      dispatch(
        setSession({
          user: res.data.user,
          token: res.data.token,
        })
      );

      router.push("/");
    },
    onError: (err) => {
      parseFieldErrors(err);
    },
  });
}
