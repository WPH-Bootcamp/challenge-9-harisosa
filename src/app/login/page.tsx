"use client";

import Image from "next/image";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";

import type { ApiResponse } from "@/types/api";
import type { RegisterData, RegisterPayload } from "@/types/auth";
import { parseFieldErrors, useRegisterMutation } from "@/services/queries/auth.mutation";


type Mode = "signin" | "signup";

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("signin");


  const [form, setForm] = useState<RegisterPayload>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const registerMutation = useRegisterMutation();

  const clearError = (key: keyof Errors) => {
    if (!errors[key]) return;
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

const validate = () => {
  const newErrors: Errors = {};
  const isSignup = mode === "signup";

  const signupFields: readonly (keyof RegisterPayload)[] = [
    "name",
    "phone",
    "confirmPassword",
  ];

  const requiredFields: (keyof RegisterPayload)[] = [
    "email",
    "password",
    ...(isSignup ? signupFields : []),
  ];
    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field as keyof Errors] = "Field wajib diisi";
      }
    });

  if (
    isSignup &&
    form.password &&
    form.confirmPassword &&
    form.password !== form.confirmPassword
  ) {
    newErrors.confirmPassword = "Confirm Password tidak sama";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleChange =
    (key: keyof RegisterPayload) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
          ...prev,
          [key]: e.target.value,
        }));

        clearError(key);
        clearError("form");
      };

  const onRegister = async () => {
        try {
      const res = (await registerMutation.mutateAsync(form)) as ApiResponse<RegisterData>;

      if (!res.success) {
        setErrors((prev) => ({ ...prev, form: res.message || "Register gagal" }));
        return;
      }
      router.push("/");
    } catch (err) {
      const { fieldErrors, formError } = parseFieldErrors(err);

      const newErrors: Errors = {};

      if (fieldErrors) {

        for (const [key, message] of Object.entries(fieldErrors)) {
          if (key === "name") newErrors.name = message;
          if (key === "email") newErrors.email = message;
          if (key === "phone") newErrors.phone = message;
          if (key === "password") newErrors.password = message;
          if (key === "confirmPassword") newErrors.confirmPassword = message;
        }

        setErrors(newErrors);
        return;
      }

      if (formError) {
        newErrors.form = formError;
        setErrors(newErrors);
      }
    }
  }

  const handleSubmit = async () => {
    setErrors((prev) => ({ ...prev, form: undefined }));

    const ok = validate();
    if (!ok) return;


    if (mode === "signin") {
      router.push("/");
      return;
    }

    if (mode === 'signup'){
      onRegister();
    }

  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div className="relative hidden lg:block">
        <Image
          src="/images/login-pic.svg"
          alt="Food banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-block h-6 w-6 rounded-full bg-red-600" />
              <h1 className="text-xl font-semibold">Foody</h1>
            </div>

            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Good to see you again! Let’s eat
            </p>
          </div>

          <div className="flex rounded-lg bg-muted p-1 text-sm">
            <Button
              type="button"
              variant="ghost"
              className={[
                "flex-1 py-2",
                mode === "signin"
                  ? "rounded-md bg-white font-medium shadow text-foreground hover:bg-white"
                  : "text-muted-foreground hover:bg-transparent",
              ].join(" ")}
              onClick={() => {
                setMode("signin");
                setErrors({});
              }}
            >
              Sign in
            </Button>

            <Button
              type="button"
              variant="ghost"
              className={[
                "flex-1 py-2",
                mode === "signup"
                  ? "rounded-md bg-white font-medium shadow text-foreground hover:bg-white"
                  : "text-muted-foreground hover:bg-transparent",
              ].join(" ")}
              onClick={() => {
                setMode("signup");
                setErrors({});
              }}
            >
              Sign up
            </Button>
          </div>

          <div className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="space-y-1">
                  <Input
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Input
                    placeholder="Number Phone"
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-1">
              <Input
                placeholder="Email"
                value={form.email}
                onChange={handleChange("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {mode === "signup" && (
              <div className="space-y-1">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
          </div>

          {mode === "signin" && (
            <div className="flex items-center gap-2 text-sm">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(v) => setRemember(v === true)}
                className="h-5 w-5 border border-gray-400 bg-white data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 data-[state=checked]:text-white"
              />
              <label htmlFor="remember" className="cursor-pointer select-none">
                Remember Me
              </label>
            </div>
          )}

          {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={handleSubmit}
            disabled={registerMutation.isPending}
          >
            {mode === "signin"
              ? "Login"
              : registerMutation.isPending
                ? "Registering..."
                : "Register"}
          </Button>
        </div>
      </div>
    </div>
  );
}
