"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Briefcase,
  History,
  LayoutDashboard,
  LineChart,
  ShieldCheck,
  User as UserIcon,
  Wallet as WalletIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/market", label: "Mercado", icon: LineChart },
  { href: "/wallet", label: "Wallet", icon: WalletIcon },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/history", label: "Historial", icon: History },
  { href: "/alerts", label: "Alertas", icon: Bell },
  { href: "/profile", label: "Perfil", icon: UserIcon },
];

const adminItems = [
  { href: "/admin", label: "Panel admin", icon: ShieldCheck },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-white/[0.015] backdrop-blur-xl sticky top-0 h-screen">
      <Link
        href="/dashboard"
        className="px-6 pt-6 pb-5"
      >
        <Logo className="text-xl" markClassName="size-6" />
      </Link>
      <nav className="flex-1 px-4 py-2 space-y-1.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition",
                active
                  ? "glass-accent text-text"
                  : "text-text-subtle hover:text-text-muted hover:bg-white/[0.03]"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}

        <div className="pt-5 pb-1.5 px-3.5 text-[10px] font-semibold uppercase tracking-wider text-text-subtle">
          Administración
        </div>
        {adminItems.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition",
                active
                  ? "glass-accent text-text"
                  : "text-text-subtle hover:text-text-muted hover:bg-white/[0.03]"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mx-4 mb-4 px-4 py-3 rounded-xl glass-subtle text-[10px] text-text-subtle">
        UMG · Proyecto Final · 2026
      </div>
    </aside>
  );
}
