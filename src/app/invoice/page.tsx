"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/services/queries/queryKey";
import { CheckCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Transaction } from "@/types/checkout";
import { dateFormatter } from "@/lib/dateFormatter";
import { currencyFormatter } from "@/lib/currencyFormatter";
import Image from "next/image";
import { LabelValue } from "@/ui/label-value";

export default function CheckoutSuccessPage() {
    const qc = useQueryClient();

  const transaction = qc.getQueryData<Transaction>(queryKeys.checkout.last());
    if (!transaction) return null;


  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center gap-2">
                    <Image
                      src='/images/logo-color.svg'
                      alt="logo-brand"
                      width={149}
                      height={50}
                      priority
                    />
        </div>

        <Card className="rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-center text-lg font-semibold">
              Payment Success
            </h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Your payment has been successfully processed.
            </p>

            {/* Invoice */}
            <div className="mt-6 space-y-3 text-sm">
              <LabelValue label="Date" value={dateFormatter(transaction.createdAt)} />
              <LabelValue label="Payment Method" value={transaction.paymentMethod} />
              <LabelValue
                label={`Price (${transaction.restaurants.length} items)`}
                value={currencyFormatter(transaction.pricing.subtotal)}
              />
              <LabelValue
                label="Delivery Fee"
                value={currencyFormatter(transaction.pricing.deliveryFee)}
              />
              <LabelValue
                label="Service Fee"
                value={currencyFormatter(transaction.pricing.serviceFee)}
              />

              <div className="my-3 border-t border-dashed" />

              <LabelValue
                label="Total"
                value={currencyFormatter(transaction.pricing.totalPrice)}

              />
            </div>

            <Button
              asChild
              className="mt-6 h-12 w-full rounded-full bg-red-600 text-white hover:bg-red-700"
            >
              <Link href="/profile?tab=orders">See My Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
