"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { LabelValue } from "@/ui/label-value";


export type PaymentSummary = {
  itemCount: number;
  price: number;       
  deliveryFee: number;
  serviceFee: number;
  total: number;
};

export const PaymentSummary = ({
  value,
  onBuy,
  buyLabel = "Buy",
  className,
  disabled,
}: {
  value: PaymentSummary;
  onBuy?: () => void;
  buyLabel?: string;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <Card
      className={cn(
        "rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <div className="text-sm font-semibold">Payment Summary</div>

      <div className="mt-4 space-y-3 text-sm">
        <LabelValue
          label={`Price (${value.itemCount} items)`}
          value={currencyFormatter(value.price)}
        />

        <LabelValue
          label="Delivery Fee"
          value={currencyFormatter(value.deliveryFee)}
        />

        <LabelValue
          label="Service Fee"
          value={currencyFormatter(value.serviceFee)}
        />

        <Separator className="my-2" />

        <LabelValue
          label="Total"
          value={currencyFormatter(value.total)}
          strong
        />

        <Button
          type="button"
          disabled={disabled}
          onClick={onBuy}
          className="mt-4 h-12 w-full rounded-full bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
        >
          {buyLabel}
        </Button>
      </div>
    </Card>
  );
}


