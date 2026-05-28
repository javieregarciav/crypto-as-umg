"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Wallet as WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
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
      <div className="md:hidden text-lg font-bold">
        Crypto<span className="text-brand">UMG</span>
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
          <>
            <div className="text-sm text-text-muted hidden sm:block">
              {user.name}
            </div>
            <button
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
              className="p-2 rounded-md hover:bg-bg-hover text-text-muted hover:text-down transition"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-4 py-1.5 text-sm rounded-md bg-brand text-black font-semibold hover:bg-brand-hover"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
}
