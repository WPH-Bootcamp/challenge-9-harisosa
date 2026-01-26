import { Card, CardContent } from "@/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ChevronRight, User2 } from "lucide-react";
import React from "react";
import { ProfileNavigation, TabKey } from "./profile.type";
import { cn } from "@/lib/utils";
import { User } from "@/types";

type SidebarProps = {
 active: TabKey;
  onSelect: (k: TabKey) => void;
  user: User | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  active,
  onSelect,
  user,
}) => {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>
              <User2 className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold leading-tight">{user?.name}</div>
          </div>
        </div>

        <Separator className="my-4" />

        <nav className="space-y-1">
          {ProfileNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;

            if (item.key === "logout") {
              return (
                <button
                  key={item.key}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition",
                    "hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelect(item.key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition",
                  "hover:bg-muted",
                  isActive && "bg-muted font-medium"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                <ChevronRight className="h-4 w-4 opacity-40" />
              </button>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}