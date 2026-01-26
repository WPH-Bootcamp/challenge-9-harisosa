"use client";

import { useMemo, useState } from "react";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Input } from "@/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { User2, Upload } from "lucide-react";
import { Label } from "@/ui/label";
import { useUpdateProfile } from "@/services/queries/useUpdateProfile";
import { toast } from "sonner";
import { updateAddress } from "../auth/auth.slice";
import { useDispatch } from "react-redux";

type FormState = {
  name: string;
  email: string;
  phone: string;
  avatarFile: File | null;
  address: string;
};

export function EditProfileForm({
  initialName = "",
  initialEmail = "",
  initialPhone = "",
  initialAvatarUrl,
  initialAddress ="",
}: {
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
  initialAvatarUrl?: string;
  initialAddress?: string;
}) {
  const [form, setForm] = useState<FormState>({
    name: initialName,
    email: initialEmail,
    phone: initialPhone,
    avatarFile: null,
    address : initialAddress,
  });

  const dispatch = useDispatch()
  const { mutateAsync, isPending } = useUpdateProfile();

  const [err, setErr] = useState<string | null>(null);

  const previewUrl = useMemo(() => {
    if (!form.avatarFile) return initialAvatarUrl;
    return URL.createObjectURL(form.avatarFile);
  }, [form.avatarFile, initialAvatarUrl]);


async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  setErr(null);
    await mutateAsync({
      name: form.name || undefined,
      email: form.email || undefined,
      phone: form.phone || undefined,
      avatar: form.avatarFile, 
      address: form.address
    });

          dispatch(
            updateAddress(form.address)
          )
}

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={previewUrl} alt="avatar" />
              <AvatarFallback>
                <User2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar (max 5MB)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    if (!f) return;

                    if (!f.type.startsWith("image/")) {
                      setErr("File harus gambar");
                      return;
                    }
                    if (f.size > 5 * 1024 * 1024) {
                      setErr("Maksimal 5MB");
                      return;
                    }

                    setForm((s) => ({ ...s, avatarFile: f }));
                  }}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => document.getElementById("avatar")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Photo
                </Button>

                {form.avatarFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-xl"
                    onClick={() =>
                      setForm((s) => ({ ...s, avatarFile: null }))
                    }
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                JPG/PNG/WebP. Max 5MB.
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((s) => ({ ...s, email: e.target.value }))
                }
                placeholder="john@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((s) => ({ ...s, phone: e.target.value }))
                }
                placeholder="08xxxxxxxxxx"
              />
            </div>
                        <div className="space-y-2">
              <Label htmlFor="phone">Address</Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) =>
                  setForm((s) => ({ ...s, address: e.target.value }))
                }
                placeholder=""
              />
            </div>

            
          </div>

          {err && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {err}
            </div>
          )}

          <Button
            disabled={isPending}
            className="h-12 w-full rounded-full bg-red-600 text-white hover:bg-red-700"
            type="submit"
          >
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
