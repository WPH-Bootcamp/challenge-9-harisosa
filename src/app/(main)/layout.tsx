'use client'

import { cartActions } from "@/features/cart/store/cart.slice";
import { Footer } from "@/features/layout/Footer";
import Navbar from "@/features/layout/Navbar";
import { useCart } from "@/services/queries";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function MainLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data } = useCart();
  useEffect(() => {
    if (data) dispatch(cartActions.setCartData(data));
  }, [data, dispatch]);

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
