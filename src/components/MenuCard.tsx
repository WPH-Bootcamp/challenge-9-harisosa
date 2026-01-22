"use client";

import { addItem, decreaseQty, increaseQty } from "@/features/cart/cart.slice";
import { RootState } from "@/features/store";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export function MenuCard({ id, name, price, image }: Props) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) => state.cart.items[id]);
  const qty = cartItem?.qty ?? 0;

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
              onClick={() =>
                dispatch(
                  addItem({
                    id,
                    name,
                    price,
                    image,
                  })
                )
              }
            >
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7 rounded-full"
                onClick={() => dispatch(decreaseQty(id))}
              >
                −
              </Button>

              <span className="w-5 text-center text-xs font-semibold">
                {qty}
              </span>

              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7 rounded-full"
                onClick={() => dispatch(increaseQty(id))}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
