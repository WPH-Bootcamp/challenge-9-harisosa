"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import { RootState } from "@/features/store";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";

import { useCartActions } from "@/features/cart/store/useCartAction";
import {
  selectCurrentRestaurantId,
  selectMenuQtyByRestaurant,
} from "@/features/cart/store/cart.selector";

type MenuCardProps = {
  id: number; // menuId
  name: string;
  price: number;
  image: string;
};

export const MenuCard: React.FC<MenuCardProps> = ({ id, name, price, image }) => {
  const { add, increase, decrease } = useCartActions();

  const restaurantId = useSelector(selectCurrentRestaurantId);

  const qty = useSelector((s: RootState) =>
    selectMenuQtyByRestaurant(restaurantId, id)(s)
  );

  return (
    <Card className="overflow-hidden rounded-2xl border bg-white lg:w-71.25 lg:h-94.75 w-43 h-76.75 p-0">
      <div className="relative aspect-4/3 bg-muted lg:w-71.25 lg:h-71.25">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : null}
      </div>

      <CardContent className="p-3">
        <div className="text-xs text-muted-foreground truncate">{name}</div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="text-sm font-semibold">
            Rp{price.toLocaleString("id-ID")}
          </div>

          {qty === 0 ? (
            <Button
              size="sm"
              className="h-7 rounded-full bg-red-600 px-4 text-xs hover:bg-red-700"
              onClick={() => add({ menuId: id })}
              disabled={!restaurantId}
              title={!restaurantId ? "Restaurant context belum diset" : undefined}
            >
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7 rounded-full"
                onClick={() => decrease({ menuId: id, currentQty: qty })}
              >
                −
              </Button>

              <span className="w-5 text-center text-xs font-semibold">{qty}</span>

              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7 rounded-full"
                onClick={() => increase({ menuId: id, currentQty: qty })}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
