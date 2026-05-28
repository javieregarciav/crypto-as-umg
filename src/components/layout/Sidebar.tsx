"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  History,
  LayoutDashboard,
  LineChart,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/market", label: "Mercado", icon: LineChart },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/history", label: "Historial", icon: History },
  { href: "/profile", label: "Perfil", icon: UserIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col glass-strong !border-y-0 !border-l-0 !rounded-none">
      <Link
        href="/dashboard"
        className="px-6 py-5 text-2xl font-bold border-b border-border"
      >
        Crypto<span className="text-brand">UMG</span>
      </Link>
      <nav className="flex-1 p-3 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition",
                active
                  ? "glass-accent text-text"
                  : "text-text-muted hover:text-text hover:bg-white/5"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 text-[10px] text-text-subtle border-t border-border">
        UMG · Proyecto Final · 2026
      </div>
    </aside>
  );
}
