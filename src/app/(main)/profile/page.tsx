"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";

import {
  Menu,
} from "lucide-react"
import { OrdersPanel } from "@/features/profile/OrderPanel";
import { TabKey } from "@/features/profile/profile.type";
import { Sidebar } from "@/features/profile/Sidebar";
import { useSelector } from "react-redux";
import { selectAddress, selectUser } from "@/features/auth/auth.selector";
import { EditProfileForm } from "@/features/profile/EditProfile";


export default function ProfilePage() {
  const [tab, setTab] = useState<TabKey>("profile");
    const user = useSelector(selectUser);
    const address = useSelector(selectAddress);
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Profile
        </h1>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <Sidebar active={tab} onSelect={setTab} user={user}/>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[320px_1fr] md:items-start">
        <aside className="hidden md:block">
          <Sidebar active={tab} onSelect={setTab} user={user}/>
        </aside>

        <section>{tab === "profile" ? <EditProfileForm initialName={user?.name} initialEmail={user?.email} initialPhone={user?.phone} initialAddress={address ?? ''}/> : <OrdersPanel />}</section>
      </div>
    </main>
  );
}
