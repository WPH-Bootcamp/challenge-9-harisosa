"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/ui/card";
import { Input } from "@/ui/input";
import { type OrderStatusApi, type MyOrdersParams, type MyOrder, ORDER_STATUS_OPTIONS } from "@/types/order";
import { useMyOrders } from "@/services/queries/useMyOrder";
import { PaginationBar } from "@/ui/pagination-bar";
import { OrderCard } from "./OrderCard";

export const OrdersPanel: React.FC = () => {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<OrderStatusApi>("done");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  React.useEffect(() => setPage(1), [status]);

  const params: MyOrdersParams = React.useMemo(
    () => ({ status, page, limit }),
    [status, page, limit]
  );

  const { data, isLoading, isError } = useMyOrders(params);

  const ordersRaw: MyOrder[] = data?.data.orders ?? [];
  const pagination = data?.data.pagination;

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ordersRaw;

    return ordersRaw.filter((o) => {
      const r = o.restaurants?.[0]?.restaurant?.name?.toLowerCase() ?? "";
      const inRestaurant = r.includes(query);

      const inItems =
        o.restaurants?.[0]?.items?.some((it) =>
          it.menuName.toLowerCase().includes(query)
        ) ?? false;

      return inRestaurant || inItems;
    });
  }, [ordersRaw, q]);

  const canPrev = page > 1;
  const totalPages = pagination?.totalPages ?? 0;
  const canNext = totalPages ? page < totalPages : ordersRaw.length === limit;

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="h-10 rounded-full pl-9"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold">Status</div>
        <div className="flex flex-1 flex-wrap gap-2">
          {ORDER_STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStatus(s.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition",
                "bg-white hover:bg-muted",
                status === s.value && "border-red-500 text-red-600 bg-red-50"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 overflow-auto h-[70vh]">
        {isLoading && (
          <Card className="rounded-2xl">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              Loading orders...
            </CardContent>
          </Card>
        )}

        {isError && (
          <Card className="rounded-2xl">
            <CardContent className="p-6 text-center text-sm text-destructive">
              Failed to load orders.
            </CardContent>
          </Card>
        )}

        {!isLoading &&
          !isError &&
          filtered.map((order) => <OrderCard key={order.id} order={order} />)}

        {!isLoading && !isError && filtered.length === 0 && (
          <Card className="rounded-2xl">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No orders found.
            </CardContent>
          </Card>
        )}
      </div>
      {filtered.length !== 0 && (
        <PaginationBar
          page={page}
          totalPages={totalPages}
          canPrev={canPrev}
          canNext={canNext}
          isLoading={isLoading}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => p + 1)}
        />
      )}

    </div>
  );
};


