"use client";

import { CartGroup } from "@/components/CartGroup";
import { selectAddress, selectPhone } from "@/features/auth/auth.selector";
import { BankOption, PaymentMethod } from "@/features/checkout/BankOption";
import { DeliveryAddressCard } from "@/features/checkout/DeliveryAddress";
import { useCheckoutSummary } from "@/features/checkout/hook/useCheckoutSummary";
import { PaymentSummary } from "@/features/checkout/Summary";
import { useCheckoutOrder } from "@/services/queries";
import { CheckoutPayload } from "@/types/checkout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const phone = useSelector(selectPhone);
  const address = useSelector(selectAddress);

  const [payment, setPayment] = useState<PaymentMethod>("bni");
  const router = useRouter();
  const checkout = useCheckoutOrder();

  const {
    restaurantId,
    items,
    group,
    subtotal,
    deliveryFee,
    serviceFee,
    total,
    totalItems,
  } = useCheckoutSummary();

  useEffect(() => {
    if (!restaurantId || items.length === 0) router.replace("/cart");
  }, [restaurantId, items.length, router]);

  if (!restaurantId || items.length === 0) return null;

  const onBuy = () => {
    const deliveryAddress = address ?? "";
    const phoneNumber = phone ?? "";
    console.log(items)
    if (!phoneNumber) return;

    const payload: CheckoutPayload = {
      restaurants: [
        {
          restaurantId,
          items: items.map((i) => ({
            menuId: i.menu.id,
            quantity: i.quantity,
          })),
        },
      ],
      deliveryAddress,
      phone: phoneNumber,
      paymentMethod: payment,
    };

    checkout.mutate(payload, {
      onSuccess: () => router.push("/checkout/success"),
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>

        <div className="mt-6 grid gap-6 md:grid-cols-[1.6fr_1fr] md:items-start">
          <div className="space-y-6">
            <DeliveryAddressCard
              value={{
                addressLine: address ?? "",
                phone: phone ?? "",
              }}
              onChange={() => {}}
            />

            {group && <CartGroup cartByRestaurant={group} isCheckout />}
          </div>

          <div className="space-y-6">
            <BankOption value={payment} onValueChange={setPayment} className="p-5" />

            <PaymentSummary
              value={{
                itemCount: totalItems,
                price: subtotal,
                deliveryFee,
                serviceFee,
                total,
              }}
              onBuy={onBuy}
            />
          </div>
        </div>

        {checkout.isError && (
          <div className="mt-4 text-sm text-red-600">
            Checkout failed. Coba lagi ya.
          </div>
        )}
      </div>
    </div>
  );
}
