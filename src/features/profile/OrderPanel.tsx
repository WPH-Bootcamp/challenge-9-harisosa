import { Card, CardContent } from "@/ui/card";
import { useMemo } from "react";

export const OrdersPanel = () => {

  const orders = useMemo(
    () => [
      { id: "ORD-001", date: "2026-01-26", total: "Rp 120.000", status: "Paid" },
      { id: "ORD-002", date: "2026-01-20", total: "Rp 89.000", status: "Paid" },
    ],
    []
  );

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className="text-lg font-semibold">My Orders</div>
        <div className="mt-4 space-y-3">
          {orders.map((o) => (
            <div
              key={o.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <div className="font-medium">{o.id}</div>
                <div className="text-sm text-muted-foreground">{o.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{o.total}</div>
                <div className="text-sm text-muted-foreground">{o.status}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
