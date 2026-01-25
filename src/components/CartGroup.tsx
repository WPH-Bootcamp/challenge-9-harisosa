'use client'

import { Card } from "@/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "@/ui/button";
import Image from "next/image";
import { CartByRestaurant } from "@/types";
import { CartItemRow } from "./CartItemRow";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { cartActions } from "../features/cart/store";

type CartGroupProps = {
  cartByRestaurant: CartByRestaurant;
  isCheckout?: boolean;
}

export const CartGroup: React.FC<CartGroupProps> = ({ cartByRestaurant, isCheckout }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { restaurant, subtotal, items } = cartByRestaurant;
  const onRestaurantClick = (id: number) => {
    router.push(`/restaurant/${id}`);
  }
  const onClickCheckout = (id: number) => {
    dispatch(cartActions.setCurrentRestaurantId(id));
    router.push(`/checkout`);
  }
  return (
    <Card className="mb-5 rounded-2xl p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2 lg:h-10">
        <Image
          src={restaurant.logo}
          alt={restaurant.name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />

        <span className="font-medium">{restaurant.name}</span>
        {
          !isCheckout ? (<ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" onClick={() => onRestaurantClick(restaurant.id)} />) : (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-5 font-medium ml-auto h-full"
              onClick={() => onRestaurantClick(restaurant.id)}
            >
              Add item
            </Button>
          )
        }

      </div>

      {items.map(item => {
        return <CartItemRow key={item.id} item={item} restaurantId={restaurant.id} />
      })}


      {
        !isCheckout && (
          <><hr className="my-4" /><div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="font-semibold">{currencyFormatter(subtotal)}</div>
            </div>

            <Button className="h-10 rounded-full bg-red-600 px-6 text-white hover:bg-red-700"
              onClick={() => {
                onClickCheckout(restaurant.id);
              }}
            >
              Checkout
            </Button>
          </div></>
        )
      }

    </Card>

  );
}