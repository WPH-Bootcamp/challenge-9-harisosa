"use client";


import { MenuItem } from "@/types/menuItem";
import { MenuCard } from "./MenuCard";

type Props = {
  menus: MenuItem[];
};

export function MenuGrid({ menus }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {menus.map((m) => (
        <MenuCard key={m.id} id={m.id} name={m.foodName} price={m.price} image={m.image} />
      ))}
    </div>
  );
}
