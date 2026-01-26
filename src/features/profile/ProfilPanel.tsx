import { User } from "@/types";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { LabelValue } from "@/ui/label-value";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { User2 } from "lucide-react";
import React from "react";

type ProfilePanelProps = {
    user: User | null;
}

export const ProfilePanel : React.FC<ProfilePanelProps> = ({user}) => {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.avatar} alt="avatar" />
            <AvatarFallback>
              <User2 className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="mt-8 space-y-6">
          <LabelValue label="Name" value={user?.name} />
          <LabelValue label="Email" value={user?.email} />
          <LabelValue label="Nomor Handphone" value={user?.phone} />
        </div>

        <div className="mt-10">
          <Button className="h-12 w-full rounded-full bg-red-600 text-white hover:bg-red-700">
            Update Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}