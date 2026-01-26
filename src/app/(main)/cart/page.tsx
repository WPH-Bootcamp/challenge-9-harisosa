"use client";

import { CartGroup } from "@/components/CartGroup";
import { selectCartData } from "@/features/cart/store";
import { useSelector } from "react-redux";

export default function CartPage() {
  const data = useSelector(selectCartData);
  return (
    <div className="mt-32 lg:px-80 p-4">
      <h1 className="mb-4 text-xl font-semibold">My Cart</h1>
      {
        data.cart.map((restaurant) => {
          return <CartGroup key={restaurant.restaurant.id} cartByRestaurant={restaurant}/>
        })
      }
    </div>
  );
}



