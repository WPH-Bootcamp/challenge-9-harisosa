"use client"

import Link from "next/link"
import { ShoppingBag, LogOut, User as UserIcon, Badge } from "lucide-react"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"


import { Button } from "@/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useAppDispatch, useAppSelector } from "store/hook"
import { clearSession } from "../auth/auth.slice"
import { selectUserName, selectAvatarUrl } from "../auth/auth.selector"

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "U"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function AuthedNav() {
  const dispatch = useAppDispatch()
  const name = useAppSelector(selectUserName)
  const avatarUrl = useAppSelector(selectAvatarUrl)


  const onLogout = () => {
    dispatch(clearSession())
  }

  return (
    <div className="flex items-center gap-2">
      {/* Cart */}
      <Link href="/cart" className="relative">
        <Button variant="ghost" size="icon" aria-label="Open cart">
          <ShoppingBag className="h-5 w-5" />
        </Button>

          <span className="absolute -right-1 -top-1">
            <Badge className="h-5 min-w-5 justify-center px-1 text-[11px]">
              1
            </Badge>
          </span>

      </Link>

      {/* Avatar dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-white/10 transition-colors">
            <Avatar className="h-8 w-8">
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={name} /> : null}
              <AvatarFallback>{initials(name || "User")}</AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-white text-sm">
              {name || "User"}
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
