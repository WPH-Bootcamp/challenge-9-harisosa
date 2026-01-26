
export type DeliveryContact = {
  deliveryAddress: string;
  phone: string;
};

export type PaymentInfo = {
  paymentMethod: string;
};

export type CheckoutItemInput = {
  menuId: number;
  quantity: number;
};

export type CheckoutRestaurantInput = {
  restaurantId: number;
  items: CheckoutItemInput[];
};

export type CheckoutPayload = DeliveryContact &
  PaymentInfo & {
    restaurantId: number;
    restaurants: CheckoutRestaurantInput[];
    notes?: string;
  };

export type PricingBreakdown = {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
};

export type TransactionRestaurantRef = {
  id: number;
  name: string;
  logo: string;
};

export type TransactionItem = {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  itemTotal: number;
};

export type TransactionRestaurant = {
  restaurant: TransactionRestaurantRef;
  items: TransactionItem[];
  subtotal: number;
};

export type Transaction = DeliveryContact &
  PaymentInfo & {
    transactionId: string;
    status: "done" | string;
    pricing: PricingBreakdown;
    createdAt: string;
    restaurants: TransactionRestaurant[];
  };

export type CheckoutResponse = {
  success: boolean;
  message: string;
  data: {
    transaction: Transaction;
  };
};
