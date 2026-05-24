"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PriceChange } from "@/components/market/PriceChange";
import { Sparkline } from "@/components/market/Sparkline";
import { Input } from "@/components/ui/Input";
import { useTopCoins } from "@/lib/hooks/usePrices";
import { fmtPrice, fmtUSD } from "@/lib/utils";

export default function MarketPage() {
  const { coins, loading, error } = useTopCoins(50);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return coins;
    return coins.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.symbol.toLowerCase().includes(term)
    );
  }, [coins, q]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Mercado</h1>
          <p className="text-sm text-text-muted">
            Top 50 criptomonedas por capitalización · datos en vivo de CoinGecko
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle"
          />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar BTC, Ethereum…"
            className="pl-9"
          />
        </div>
      </div>

      {error && (
        <div className="text-down text-sm bg-down-bg border border-down/30 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-border overflow-hidden bg-bg-elev/40">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-text-muted uppercase tracking-wider bg-bg-elev/60">
              <tr>
                <th className="text-left p-3 w-12">#</th>
                <th className="text-left p-3">Nombre</th>
                <th className="text-right p-3">Precio</th>
                <th className="text-right p-3">24h %</th>
                <th className="text-right p-3 hidden md:table-cell">
                  Cap. Mercado
                </th>
                <th className="text-right p-3 hidden lg:table-cell">
                  Volumen 24h
                </th>
                <th className="text-right p-3 hidden md:table-cell">
                  Últ. 7d
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && coins.length === 0 ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-t border-border">
                    <td colSpan={7} className="p-3">
                      <div className="h-6 bg-bg-hover/50 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-text-muted"
                  >
                    Sin resultados.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-border hover:bg-bg-hover/50 transition"
                  >
                    <td className="p-3 text-text-muted num">
                      {c.marketCapRank}
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/market/${c.id}`}
                        className="flex items-center gap-3 hover:text-brand"
                      >
                        <Image
                          src={c.image}
                          alt={c.symbol}
                          width={24}
                          height={24}
                          unoptimized
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-text-muted uppercase">
                            {c.symbol}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="p-3 text-right num">
                      {fmtPrice(c.currentPrice)}
                    </td>
                    <td className="p-3 text-right">
                      <PriceChange pct={c.priceChangePct24h} />
                    </td>
                    <td className="p-3 text-right num hidden md:table-cell">
                      {fmtUSD(c.marketCap, true)}
                    </td>
                    <td className="p-3 text-right num hidden lg:table-cell text-text-muted">
                      {fmtUSD(c.totalVolume, true)}
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <div className="flex justify-end">
                        <Sparkline
                          data={c.sparkline ?? []}
                          up={c.priceChangePct24h >= 0}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
