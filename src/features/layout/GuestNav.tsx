"use client"

import { Button } from "@/ui/button"
import Link from "next/link"

export default function GuestNav() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/login?mode=signin">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </Link>
      <Link href="/login?mode=signup">
        <Button variant="default" size="sm">
          Sign Up
        </Button>
      </Link>
    </div>
  )
}
