import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/features/store/hook";
import { AuthData, LoginPayload } from "@/types/auth";
import { ApiResponse } from "@/types/api";
import { parseFieldErrors } from "@/lib/parseFieldErrors";
import { setSession } from "@/features/auth/auth.slice";
import { login } from "../api/auth";
import { toast } from "sonner";



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
      toast.success("Login Sucessfull")
      router.push("/");
    },
    onError: (err) => {
      toast.error(`Login Failed:,${err?.message}`)
      parseFieldErrors(err);
    },
  });
}
