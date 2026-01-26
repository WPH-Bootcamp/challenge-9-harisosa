import { LogOut, LucideIcon, MapPin, ReceiptText } from "lucide-react";

export type TabKey = "profile" | "orders" | "logout"; 

export const ProfileNavigation: Array<{
  key: TabKey;
  label: string;
  icon: LucideIcon;
}> = [
  { key: "profile", label: "Delivery Address", icon: MapPin }, // kamu bisa ganti label jadi "Profile" kalau mau
  { key: "orders", label: "My Orders", icon: ReceiptText },
  { key: "logout", label: "Logout", icon: LogOut },
];
