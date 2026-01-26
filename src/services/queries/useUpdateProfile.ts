import { UpdateProfileInput } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api";
import { queryKeys } from "./queryKey";
import { useAppDispatch } from "@/features/store/hook";
import { updateUser } from "@/features/auth/auth.slice";
import { toast } from "sonner";
import { AxiosError } from "axios";


export function useUpdateProfile() {
const qc = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfile(input),
    onSuccess: (response) => {
      const user = response?.data ?? response;
      dispatch(
        updateUser({
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar, 
        })
      );
        toast.success("Profile updated");
      qc.setQueryData(queryKeys.auth.profile(), user);
      qc.invalidateQueries({ queryKey: queryKeys.auth.profile() });
    },
    onError : (err: AxiosError) => {
        toast.error(err.message)
    }
  });
}
