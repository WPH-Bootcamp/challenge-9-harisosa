export type OrderStatusApi =
  | "preparing"
  | "on_the_way"
  | "delivered"
  | "done"
  | "cancelled";

export const ORDER_STATUS_OPTIONS: Array<{ label: string; value: OrderStatusApi }> =
  [
    { label: "Preparing", value: "preparing" },
    { label: "On the Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Done", value: "done" },
    { label: "Canceled", value: "cancelled" },
  ];

export type MyOrdersParams = {
  status: OrderStatusApi;
  page: number;
  limit: number;
};

export type MyOrderItem = {
  menuId: number;
  menuName: string;
  price: number;
  image: string;
  quantity: number;
  itemTotal: number;
};

export type MyOrderRestaurant = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: MyOrderItem[];
  subtotal: number;
};

export type MyOrder = {
  id: number;
  transactionId: string;
  status: OrderStatusApi;
  paymentMethod: string;
  deliveryAddress: string;
  phone: string;
  pricing: {
    subtotal: number;
    serviceFee: number;
    deliveryFee: number;
    totalPrice: number;
  };
  restaurants: MyOrderRestaurant[];
  createdAt: string;
  updatedAt: string;
};

export type MyOrdersResponse = {
  success: boolean;
  message: string;
  data: {
    orders: MyOrder[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    filter: {
      status: OrderStatusApi;
    };
  };
};
