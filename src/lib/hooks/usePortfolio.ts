"use client";

import { useEffect, useState } from "react";
import type { Coin, Holding, Wallet } from "@/lib/domain/types";
import { services } from "@/lib/services";
import { useSession } from "./useSession";

export interface PortfolioRow {
  holding: Holding;
  coin: Coin;
  valueUSD: number;
  costUSD: number;
  pnlUSD: number;
  pnlPct: number;
}

export interface PortfolioSummary {
  wallet: Wallet | null;
  rows: PortfolioRow[];
  holdingsValueUSD: number;
  totalValueUSD: number;
  totalCostUSD: number;
  totalPnlUSD: number;
  totalPnlPct: number;
}

const EMPTY: PortfolioSummary = {
  wallet: null,
  rows: [],
  holdingsValueUSD: 0,
  totalValueUSD: 0,
  totalCostUSD: 0,
  totalPnlUSD: 0,
  totalPnlPct: 0,
};

export function usePortfolio(refreshMs = 60_000) {
  const { user } = useSession();
  const [data, setData] = useState<PortfolioSummary>(EMPTY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setData(EMPTY);
      setLoading(false);
      return;
    }
    let alive = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function load() {
      if (!user) return;
      try {
        const [wallet, holdings] = await Promise.all([
          services.wallet.get(user.id),
          services.wallet.listHoldings(user.id),
        ]);
        const coins = await Promise.all(
          holdings.map((h) => services.prices.getCoin(h.coinId))
        );
        const rows: PortfolioRow[] = [];
        let holdingsValueUSD = 0;
        let totalCostUSD = 0;
        holdings.forEach((h, i) => {
          const c = coins[i];
          if (!c) return;
          const valueUSD = h.amount * c.currentPrice;
          const costUSD = h.amount * h.avgBuyPriceUSD;
          const pnlUSD = valueUSD - costUSD;
          const pnlPct = costUSD > 0 ? (pnlUSD / costUSD) * 100 : 0;
          holdingsValueUSD += valueUSD;
          totalCostUSD += costUSD;
          rows.push({ holding: h, coin: c, valueUSD, costUSD, pnlUSD, pnlPct });
        });
        rows.sort((a, b) => b.valueUSD - a.valueUSD);
        const totalValueUSD = wallet.fiatBalanceUSD + holdingsValueUSD;
        const totalPnlUSD = holdingsValueUSD - totalCostUSD;
        const totalPnlPct =
          totalCostUSD > 0 ? (totalPnlUSD / totalCostUSD) * 100 : 0;
        if (!alive) return;
        setData({
          wallet,
          rows,
          holdingsValueUSD,
          totalValueUSD,
          totalCostUSD,
          totalPnlUSD,
          totalPnlPct,
        });
      } finally {
        if (alive) setLoading(false);
        if (alive) timer = setTimeout(load, refreshMs);
      }
    }
    load();
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, [user, refreshMs]);

  return { ...data, loading };
}
