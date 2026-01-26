import { currencyFormatter } from "@/lib/currencyFormatter";
import { MyOrder } from "@/types";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import Image from "next/image";
import React from "react";

type OrderCardProps = {
    order: MyOrder;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }: { order: MyOrder }) => {
    const firstRestaurant = order.restaurants[0];
    const restaurant = firstRestaurant.restaurant;


    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardContent className="p-5">
                <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-muted">
                        <Image
                            src={restaurant.logo}
                            alt={restaurant.name}
                            width={32}
                            height={32}
                            className="object-cover"
                        />
                    </div>
                    <div className="font-semibold">{restaurant.name}</div>
                </div>

                {firstRestaurant.items.map(item => {
                    return (
                        <div className="mt-4 flex items-center gap-4" key={item.menuId}>
                            <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted">
                                <Image
                                    src={item.image}
                                    alt={item.menuName}
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium">{item.menuName}</div>
                                <div className="text-sm font-semibold">
                                    {item.quantity} x {currencyFormatter(item.price)}
                                </div>
                            </div>
                        </div>
                    )
                })}
                
                <div className="my-4 border-t" />
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <div className="text-xs text-muted-foreground">Total</div>
                        <div className="text-sm font-bold">
                            {currencyFormatter(firstRestaurant.subtotal)}
                        </div>
                    </div>

                    <Button className="h-10 rounded-full bg-red-600 px-6 text-white hover:bg-red-700">
                        Give Review
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}