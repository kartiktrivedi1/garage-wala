"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Wrench, MapPin, FileText, CreditCard, Bell,
  Users, Store, BarChart3, LogOut, Wrench as WrenchIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

const navByRole = {
  customer: [
    { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/customer#book", label: "Book Service", icon: Wrench },
    { href: "/dashboard/customer#track", label: "Track Mechanic", icon: MapPin },
    { href: "/dashboard/customer#invoices", label: "Invoices", icon: FileText },
    { href: "/dashboard/customer#payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/customer#notifications", label: "Notifications", icon: Bell },
  ],
  garage: [
    { href: "/dashboard/garage", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/garage#orders", label: "Orders", icon: FileText },
    { href: "/dashboard/garage#revenue", label: "Revenue", icon: BarChart3 },
    { href: "/dashboard/garage#mechanics", label: "Mechanics", icon: Users },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin#users", label: "Users", icon: Users },
    { href: "/dashboard/admin#garages", label: "Garages", icon: Store },
    { href: "/dashboard/admin#analytics", label: "Analytics", icon: BarChart3 },
  ],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logOut } = useAuth();
  const router = useRouter();
  const role = (pathname.split("/")[2] as keyof typeof navByRole) || "customer";
  const nav = navByRole[role] ?? navByRole.customer;

  return (
    <div className="flex min-h-screen bg-paper-soft">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border-soft bg-background p-6 lg:flex">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
            <WrenchIcon className="h-4.5 w-4.5" />
          </span>
          Garage<span className="text-brand">Wala</span>
        </Link>

        <nav className="mt-10 flex-1 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href.split("#")[0];
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-brand/10 text-brand" : "text-foreground/60 hover:bg-mist"
                }`}
              >
                <Icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={async () => {
            await logOut();
            router.push("/");
          }}
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground/60 hover:bg-mist"
        >
          <LogOut className="h-4 w-4" /> Log Out
        </button>
      </aside>

      <div className="flex-1 lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-soft bg-background/80 px-6 py-4 backdrop-blur">
          <div className="text-sm font-medium text-foreground/60">
            {user?.name ? `Hi, ${user.name.split(" ")[0]}` : "Demo Mode"}
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="h-8 w-8 rounded-full bg-brand/20" />
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
