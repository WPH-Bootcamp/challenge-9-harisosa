"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import Link from "next/link"
import React from "react"

type GuestNavProps = {
  scrolled : boolean
}

export const GuestNav : React.FC<GuestNavProps> =({scrolled}) => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/login?mode=signin">
        <Button variant="outline" size="lg" className={
          cn("bg-transparent lg:w-40.75 rounded-full",
          scrolled ? "text-black": "text-white"
          )}>
          Sign In
        </Button>
      </Link>
      <Link href="/login?mode=signup">
        <Button variant="default" size="lg" className="bg-white text-black lg:w-40.75 rounded-full">
          Sign Up
        </Button>
      </Link>
    </div>
  )
}
