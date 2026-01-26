import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartInitData, type GetCartRawResponse } from "@/types/cart";

type CartState = {
  currentRestaurantId: number | null;
  data: GetCartRawResponse; //
};

const initialState: CartState = {
  currentRestaurantId: null,
  data: cartInitData(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCurrentRestaurantId: (state, action: PayloadAction<number | null>) => {
      state.currentRestaurantId = action.payload;
    },
    setCartData: (state, action: PayloadAction<GetCartRawResponse | null>) => {
      state.data = action.payload ?? cartInitData();
    },
    clearCartData: (state) => {
      state.data = cartInitData();
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
