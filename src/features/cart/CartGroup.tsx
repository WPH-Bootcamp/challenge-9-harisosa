'use client'

import { Card } from "@/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "@/ui/button";
import Image from "next/image";
import { CartByRestaurant } from "@/types";
import { CartItemRow } from "./CartItem";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { useRouter } from "next/navigation";

type CartGroupProps = {
  cartByRestaurant: CartByRestaurant;
}

export const CartGroup: React.FC<CartGroupProps> = ({ cartByRestaurant }) => {
  const router = useRouter();
  const { restaurant, subtotal,items } = cartByRestaurant;
  const onRestaurantClick = (id: number) => {
    router.push(`/restaurant/${id}`);
  }

  return (
    <Card className="mb-5 rounded-2xl p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Image
          src={restaurant.logo}
          alt={restaurant.name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />

        <span className="font-medium">{restaurant.name}</span>

        <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" onClick={()=>onRestaurantClick(restaurant.id)}/>
      </div>

      {items.map(item => {
        return <CartItemRow key={item.id} item={item} restaurantId={restaurant.id}/>
      })}
      <hr className="my-4" />
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Total</div>
          <div className="font-semibold">{currencyFormatter(subtotal)}</div>
        </div>

        <Button className="h-10 rounded-full bg-red-600 px-6 text-white hover:bg-red-700">
          Checkout
        </Button>
      </div>
    </Card>

  );
}