'use client'

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { CartItem } from "@/types";
import { useCartActions } from "../features/cart/store";
import { currencyFormatter } from "@/lib/currencyFormatter";

type CartItemRowProps = {
  item : CartItem;
  restaurantId: number
}

export const CartItemRow : React.FC<CartItemRowProps> = ({item, restaurantId}) => {
  const {menu,quantity} = item;
  const { increase, decrease } = useCartActions(); 
  return (
    <div className="mb-4 flex items-center gap-3">
      <Image
        src={menu.image ?? ''}
        alt={menu.foodName ?? 'food'}
        width={80}
        height={80}
        className="rounded-xl object-cover"
      />

      <div className="flex-1">
        <div className="text-sm font-medium">{menu.foodName}</div>
        <div className="text-sm font-semibold">{currencyFormatter(menu.price)}</div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex h-7 w-7 items-center justify-center rounded-full border" onClick={()=> {
          decrease({
            menuId: menu.id, 
            currentQty:item.quantity, 
            restaurantId})
        }}>
          <Minus className="h-4 w-4" />
        </button>

        <span className="w-4 text-center text-sm font-medium">{quantity}</span>

        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white"
        onClick={()=> {
          increase({
            menuId: menu.id, 
            currentQty:item.quantity, 
            restaurantId})
        }}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
