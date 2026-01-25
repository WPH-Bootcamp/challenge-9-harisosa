"use client";

import { CartGroup } from "@/components/CartGroup";
import { selectAddress, selectPhone } from "@/features/auth/auth.selector";
import { BankOption, PaymentMethod } from "@/features/checkout/BankOption";
import { DeliveryAddressCard } from "@/features/checkout/DeliveryAddress";
import { useCheckoutSummary } from "@/features/checkout/hook/useCheckoutSummary";
import { PaymentSummary } from "@/features/checkout/Summary";
import { Card } from "@/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";




export default function CheckoutPage() {
    const phone = useSelector(selectPhone);
    const address = useSelector(selectAddress);

    const [payment, setPayment] = useState<PaymentMethod>("bni");
    const router = useRouter();
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

    //guard
    if (!restaurantId || items.length === 0) {
        router.replace("/cart");
        return null;
    }



    return (
        <div className="min-h-screen bg-[#f6f7fb]">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
                <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.6fr_1fr] md:items-start">
                    <div className="space-y-6">

                        <DeliveryAddressCard
                            value={{
                                addressLine: address ?? '',
                                phone: phone ?? '',
                            }}
                            onChange={() => {
                            }}
                        />


                        {group && (<CartGroup cartByRestaurant={group} isCheckout={true}></CartGroup>)}
                    </div>

                    <div className="space-y-6">
                        <BankOption value={payment} onValueChange={setPayment} className="p-5" />
                        <PaymentSummary
                            value={{
                                itemCount: totalItems,
                                price: subtotal,
                                deliveryFee: deliveryFee,
                                serviceFee: serviceFee,
                                total: total,
                            }}
                            onBuy={() => {
                            }}
                            />;
                    </div>
                </div>
            </div>
        </div>
    );
}