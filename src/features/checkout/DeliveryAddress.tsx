"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";


export type DeliveryAddress = {
  addressLine: string;
  phone: string;
  label?: string;
};

export function DeliveryAddressCard({
  value,
  onChange,
  title = "Delivery Address",
  changeLabel = "Change",
  className,
  disabled,
  hideIcon,
}: {
  value: DeliveryAddress;
  onChange?: () => void;
  title?: string;
  changeLabel?: string;
  className?: string;
  disabled?: boolean;
  hideIcon?: boolean;
}) {
  return (
    <Card
      className={cn(
        "rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {!hideIcon ? (
              <span className="inline-flex h-6 w-6 items-center justify-center">
                <MapPin className="h-5 w-5 text-red-600" />
              </span>
            ) : null}

            <div className="text-sm font-semibold">{title}</div>
          </div>

          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            {value.label ? (
              <div className="text-foreground/80">{value.label}</div>
            ) : null}
            <div className="wrap-break-word">{value.addressLine}</div>
            <div className="wrap-break-word">{value.phone}</div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="mt-4 rounded-full px-6"
            onClick={onChange}
            disabled={disabled}
          >
            {changeLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}
