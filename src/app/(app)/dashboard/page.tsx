"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, TrendingDown, TrendingUp, Wallet as WalletIcon } from "lucide-react";
import { PortfolioDonut } from "@/components/chart/PortfolioDonut";
import { PriceChange } from "@/components/market/PriceChange";
import { Card, CardTitle } from "@/components/ui/Card";
import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { useTopCoins } from "@/lib/hooks/usePrices";
import { useSession } from "@/lib/hooks/useSession";
import { cn, fmtCoinAmount, fmtPrice, fmtUSD } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useSession();
  const p = usePortfolio();
  const { coins } = useTopCoins(5);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (p.loading) {
    return <div className="text-text-muted">Cargando portfolio…</div>;
  }

  const donut = p.rows.slice(0, 6).map((r) => ({
    name: r.coin.symbol.toUpperCase(),
    value: r.valueUSD,
  }));
  if (p.wallet && p.wallet.fiatBalanceUSD > 0) {
    donut.push({ name: "USD", value: p.wallet.fiatBalanceUSD });
  }

  const pnlUp = p.totalPnlUSD >= 0;

  return (
    <div className="space-y-6">
      {/* Editorial header */}
      <header>
        <div className="flex items-baseline gap-3 text-[11px] font-mono uppercase tracking-wider text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-up animate-pulse" />
            Live
          </span>
          <span className="text-text-subtle">·</span>
          <span>{now ? now.toLocaleTimeString("es", { hour12: false }) : "--:--:--"} GMT-6</span>
          <span className="text-text-subtle">·</span>
          <span>{user?.name?.split(" ")[0]}</span>
        </div>
        <h1 className="text-[40px] sm:text-[52px] font-bold tracking-tight leading-[0.95] mt-2">
          Portfolio<span className="text-brand">.</span>
        </h1>
        <div className="mt-4 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {coins.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              href={`/market/${c.id}`}
              className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition text-xs"
            >
              <Image src={c.image} alt={c.symbol} width={14} height={14} unoptimized className="rounded-full" />
              <span className="uppercase font-medium">{c.symbol}</span>
              <span className="num text-text-muted">{fmtPrice(c.currentPrice)}</span>
              <span
                className={cn(
                  "num text-[10px]",
                  c.priceChangePct24h >= 0 ? "text-up" : "text-down"
                )}
              >
                {c.priceChangePct24h >= 0 ? "+" : ""}
                {c.priceChangePct24h.toFixed(2)}%
              </span>
            </Link>
          ))}
        </div>
      </header>

      {/* Asymmetric bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-7">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Valor total</CardTitle>
              <div className="text-5xl font-bold num tracking-tight">
                {fmtUSD(p.totalValueUSD)}
              </div>
              <div
                className={cn(
                  "mt-2 flex items-center gap-1.5 text-sm num",
                  pnlUp ? "text-up" : "text-down"
                )}
              >
                {pnlUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {fmtUSD(p.totalPnlUSD)}
                <span className="text-text-muted">
                  ({p.totalPnlPct >= 0 ? "+" : ""}
                  {p.totalPnlPct.toFixed(2)}%) · all-time
                </span>
              </div>
            </div>
            <div className="hidden sm:block text-right text-[10px] font-mono uppercase tracking-wider text-text-subtle">
              <div>Acct · {user?.id?.slice(0, 6).toUpperCase()}</div>
              <div className="mt-1">USD</div>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="!p-4">
            <CardTitle>Saldo USD</CardTitle>
            <div className="text-xl font-bold num flex items-center gap-2">
              <WalletIcon size={16} className="text-brand" />
              {fmtUSD(p.wallet?.fiatBalanceUSD ?? 0)}
            </div>
            <div className="text-[11px] text-text-muted mt-1">
              Disponible para comprar
            </div>
          </Card>
          <Card className="!p-4">
            <CardTitle>En cripto</CardTitle>
            <div className="text-xl font-bold num">
              {fmtUSD(p.holdingsValueUSD)}
            </div>
            <div className="text-[11px] text-text-muted mt-1">
              {p.rows.length} {p.rows.length === 1 ? "activo" : "activos"}
            </div>
          </Card>
        </div>
      </div>

      {/* Positions + donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Tus posiciones</h2>
              <p className="text-[11px] text-text-muted">
                Top 5 por valor de mercado
              </p>
            </div>
            <Link
              href="/portfolio"
              className="text-xs text-text-muted hover:text-brand flex items-center gap-1 transition"
            >
              Ver todo <ArrowRight size={12} />
            </Link>
          </div>
          {p.rows.length === 0 ? (
            <EmptyHoldings />
          ) : (
            <div className="overflow-x-auto -mx-5">
              <table className="w-full text-sm">
                <thead className="text-xs text-text-muted uppercase">
                  <tr>
                    <th className="text-left p-3">Activo</th>
                    <th className="text-right p-3">Cantidad</th>
                    <th className="text-right p-3 hidden sm:table-cell">
                      Precio
                    </th>
                    <th className="text-right p-3">Valor</th>
                    <th className="text-right p-3">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {p.rows.slice(0, 5).map((r) => (
                    <tr
                      key={r.holding.coinId}
                      className="glass-row border-t border-white/5"
                    >
                      <td className="p-3">
                        <Link
                          href={`/market/${r.coin.id}`}
                          className="flex items-center gap-2 hover:text-brand"
                        >
                          <Image
                            src={r.coin.image}
                            alt={r.coin.symbol}
                            width={20}
                            height={20}
                            unoptimized
                            className="rounded-full"
                          />
                          <span className="font-medium uppercase">
                            {r.coin.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-3 text-right num">
                        {fmtCoinAmount(r.holding.amount)}
                      </td>
                      <td className="p-3 text-right num hidden sm:table-cell">
                        {fmtPrice(r.coin.currentPrice)}
                      </td>
                      <td className="p-3 text-right num">
                        {fmtUSD(r.valueUSD)}
                      </td>
                      <td className="p-3 text-right">
                        <PriceChange pct={r.pnlPct} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="font-semibold mb-3">Distribución</h2>
          {donut.length === 0 ? (
            <div className="text-sm text-text-muted py-10 text-center">
              Sin datos.
            </div>
          ) : (
            <>
              <PortfolioDonut data={donut} />
              <ul className="text-xs space-y-1 mt-3">
                {donut.map((d, i) => (
                  <li
                    key={d.name}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: PALETTE[i % PALETTE.length] }}
                      />
                      {d.name}
                    </span>
                    <span className="num text-text-muted">
                      {fmtUSD(d.value)}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

const PALETTE = [
  "#a855f7",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#f97316",
  "#ec4899",
  "#06b6d4",
  "#eab308",
];

function EmptyHoldings() {
  return (
    <div className="text-center py-10 text-sm text-text-muted">
      Todavía no tienes posiciones.
      <div className="mt-3">
        <Link
          href="/market"
          className="text-brand hover:underline font-medium"
        >
          Explorar el mercado →
        </Link>
      </div>
    </div>
  );
}
