"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import GuestNav from "./GuestNav";
import AuthedNav from "./AuthNav";
import { useAppSelector } from "store/hook";
import { selectIsLoggedIn } from "../auth/auth.selector";

export default function Navbar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll(); // init saat reload di posisi scroll tertentu
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-200",
        scrolled
          ? "bg-white"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={scrolled? '/images/logo-color.svg' : '/images/logo.svg'}
            alt="logo-brand"
            width={129}
            height={50}
            priority
          />
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn ? <AuthedNav /> : <GuestNav />}
        </div>
      </div>
    </header>
  );
}
