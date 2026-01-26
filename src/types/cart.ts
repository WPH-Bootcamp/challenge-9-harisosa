import { AxiosResponse } from "axios";
import { ApiResponse } from "./api";
import { Restaurant } from "./restaurant";

export type CartItem = {
  id: number;
  restaurantId: number;
  menuId: number;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
  itemTotal?: number;
  menu: { id: number; foodName: string; price: number; image?: string };
};

export type Cart = {
  items: CartItem[];
};

export type AddToCartBody = {
  restaurantId: number;
  menuId: number;
  quantity: number;
};

export type UpdateCartQtyBody = { quantity: number };

export type ServerCartItem = {
  id: number;
  restaurant: { id: number; name: string; logo?: string };
  menu: { id: number; foodName: string; price: number; image?: string };
  quantity: number;
  itemTotal?: number;
};

export type AddCartResponse = ApiResponse<{
  cartItem: ServerCartItem;
}>;



export type UpdateCartResponse = ApiResponse<{
  cartItem?: ServerCartItem;
  cart?: Cart;
}>;

export type DeleteCartResponse = ApiResponse<{
  cartItemId?: number;
  cart?: Cart;
}>;

export type CartSummary = {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
};

export type CartByRestaurant = {
  items: CartItem[];
  restaurant: Restaurant;
  subtotal: number;
}

export type GetCartRawResponse = {
  cart: CartByRestaurant[]; 
  summary: CartSummary;
};


export const cartInitData = () : GetCartRawResponse => {
  return(
    {
      cart: [],
      summary:{
          totalItems: 0,
          totalPrice: 0,
          restaurantCount: 0,
      }
    }
  )
}

export type CartQueryData = AxiosResponse<GetCartRawResponse>;