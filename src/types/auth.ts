import { User } from "@/types/user";


export type AuthData = {
  user: User | null;
  token: string | null;
};


export interface LoginPayload {
    email: string;
    password:string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
  phone: string;
  confirmPassword: string;
};


export type FieldError = {
  path?: string;
  msg?: string;
};

export type AuthErrorResponse = {
  errors?: FieldError[] | { message?: string };
  message?: string;
};


export type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};
