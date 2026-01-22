"use client";

import { useMemo, useState } from "react";

import type { RestaurantDetail } from "@/types/restaurant";
import { MenuFilters, MenuTypeFilter } from "@/components/MenuTypeFIlter";
import { Tabs, TabsContent } from "@/ui/tabs";
import { MenuGrid } from "@/components/MenuGrid";


type Props = { restaurant: RestaurantDetail };

export function RestaurantTabs({ restaurant }: Props) {
  const [type, setType] = useState<MenuTypeFilter>("all");

  const filteredMenus = useMemo(() => {
    const byType =
      type === "all"
        ? restaurant.menus
        : restaurant.menus.filter((m) =>
            type === "food"
              ? m.type.toLowerCase().includes("food")
              : m.type.toLowerCase().includes("drink")
          );

    return byType.filter((m) => m.foodName.toLowerCase());
  }, [restaurant.menus, type]);

  return (
    <Tabs defaultValue="menu" className="space-y-4 my-8">
      <TabsContent value="menu" className="space-y-4">
        <MenuFilters type={type} onTypeChange={setType} />
        <MenuGrid menus={filteredMenus} />
      </TabsContent>
    </Tabs>
  );
}
