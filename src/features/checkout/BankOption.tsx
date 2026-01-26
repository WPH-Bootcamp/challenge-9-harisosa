"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { Card } from "@/ui/card";

export type PaymentMethod = "bni" | "bri" | "bca" | "mandiri";

type Method = {
  value: PaymentMethod;
  label: string;
  logoSrc: string; // put your asset path here
  logoAlt: string;
};

const METHODS: Method[] = [
  {
    value: "bni",
    label: "Bank Negara Indonesia",
    logoSrc: "/banks/bni.svg",
    logoAlt: "BNI",
  },
  {
    value: "bri",
    label: "Bank Rakyat Indonesia",
    logoSrc: "/banks/bri.svg",
    logoAlt: "BRI",
  },
  {
    value: "bca",
    label: "Bank Central Asia",
    logoSrc: "/banks/bca.svg",
    logoAlt: "BCA",
  },
  {
    value: "mandiri",
    label: "Mandiri",
    logoSrc: "/banks/mandiri.svg",
    logoAlt: "Mandiri",
  },
];

export const BankOption = ({
  value,
  onValueChange,
  className,
  title = "Payment Method",
}: {
  value?: PaymentMethod;
  onValueChange?: (v: PaymentMethod) => void;
  className?: string;
  title?: string;
}) => {
  return (
    <Card>
    <div className={cn(className)}>
      <div className="text-sm font-semibold">{title}</div>

      <RadioGroup
        value={value}
        onValueChange={(v) => onValueChange?.(v as PaymentMethod)}
        className="mt-4"
      >
        <div className="divide-y divide-muted-foreground/15 rounded-2xl">
          {METHODS.map((m) => (
            <MethodRow key={m.value} method={m} />
          ))}
        </div>
      </RadioGroup>
    </div>
    </Card>

  );
}

const MethodRow = ({ method }: { method: Method }) => {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 py-4"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border bg-white">
          <Image
            src={method.logoSrc}
            alt={method.logoAlt}
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="text-sm font-medium">{method.label}</div>
      </div>


      <RadioGroupItem
        value={method.value}
        className={cn(
          "h-5 w-5 border-muted-foreground/40",
          "data-[state=checked]:border-red-600 data-[state=checked]:text-red-600"
        )}
      />
    </label>
  );
}
