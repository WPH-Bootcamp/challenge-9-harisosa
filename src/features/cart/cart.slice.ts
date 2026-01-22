import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: Record<number, CartItem>;
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "qty">>) => {
      const { id } = action.payload;
      if (!state.items[id]) {
        state.items[id] = { ...action.payload, qty: 1 };
      }
    },
    increaseQty: (state, action: PayloadAction<number>) => {
      state.items[action.payload].qty += 1;
    },
    decreaseQty: (state, action: PayloadAction<number>) => {
      const item = state.items[action.payload];
      item.qty -= 1;
      if (item.qty <= 0) delete state.items[action.payload];
    },
  },
});

export const { addItem, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
