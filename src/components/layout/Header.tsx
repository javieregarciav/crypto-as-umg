"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon, Wallet as WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/hooks/useSession";
import { services } from "@/lib/services";
import { fmtUSD } from "@/lib/utils";

export function Header() {
  const router = useRouter();
  const { user, logout } = useSession();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      setBalance(null);
      return;
    }
    let alive = true;
    services.wallet.get(user.id).then((w) => {
      if (alive) setBalance(w.fiatBalanceUSD);
    });
    return () => {
      alive = false;
    };
  }, [user]);

  return (
    <header className="sticky top-0 z-30 h-14 glass-strong !border-x-0 !border-t-0 px-4 md:px-6 flex items-center justify-between">
      <div className="md:hidden">
        <Logo className="text-lg" markClassName="size-5" />
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        {balance !== null && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md glass-subtle">
            <WalletIcon size={14} className="text-text-muted" />
            <span className="num text-sm font-medium">
              {fmtUSD(balance)}
            </span>
          </div>
        )}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-white/5 transition focus:outline-none">
              <span className="size-7 rounded-full glass-accent flex items-center justify-center text-brand text-xs font-bold uppercase">
                {user.name.slice(0, 1)}
              </span>
              <span className="text-sm text-text-muted hidden sm:block">
                {user.name.split(" ")[0]}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <UserIcon size={15} />
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-down hover:text-down"
                onSelect={async () => {
                  await logout();
                  router.push("/login");
                }}
              >
                <LogOut size={15} />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href="/login"
            className="glass-brand px-4 py-1.5 text-sm rounded-md text-white font-semibold"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}
