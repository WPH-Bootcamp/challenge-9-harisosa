import { RootState } from "@/features/store"

export const selectAuth = (s: RootState) => s.auth
export const selectUser = (s: RootState) => s.auth.user
export const selectUserName = (s: RootState) => s.auth.user?.name ?? ""
export const selectAvatarUrl = (s: RootState) => s.auth.user?.avatar ?? null
export const selectAccessToken = (s: RootState) => s.auth.token
export const selectIsLoggedIn = (s: RootState) => Boolean(s.auth.token)
export const selectAddress = (s: RootState) => s.auth.user?.address ?? null;
export const selectPhone = (s: RootState) => s.auth.user?.phone ?? null;