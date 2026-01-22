import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

import authReducer from "@/features/auth/auth.slice"
import cartReducer from "@/features/cart/cart.slice"

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer
})

const persistConfig = {
  key: "restaurant-web",
  storage,
  whitelist: ["auth", "cart"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
