"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Coins,
  TrendingDown,
  TrendingUp,
  Wallet as WalletIcon,
} from "lucide-react";
import { PortfolioArea } from "@/components/chart/PortfolioArea";
import { PortfolioDonut } from "@/components/chart/PortfolioDonut";
import { PriceChange } from "@/components/market/PriceChange";
import { Card, CardTitle } from "@/components/ui/Card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Transaction } from "@/lib/domain/types";
import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { useTopCoins } from "@/lib/hooks/usePrices";
import { useSession } from "@/lib/hooks/useSession";
import { services } from "@/lib/services";
import { cn, fmtCoinAmount, fmtPrice, fmtUSD } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useSession();
  const p = usePortfolio();
  const { coins } = useTopCoins(5);
  const [now, setNow] = useState<Date | null>(null);
  const [tx, setTx] = useState<Transaction[]>([]);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!user) return;
    services.transactions.list(user.id).then(setTx);
  }, [user]);

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
    <TooltipProvider delayDuration={150}>
      <div className="space-y-5">
        {/* Header */}
        <header>
          <div className="flex items-baseline gap-3 text-[11px] font-mono uppercase tracking-wider text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-up animate-pulse" />
              Live
            </span>
            <span className="text-text-subtle">·</span>
            <span>
              {now ? now.toLocaleTimeString("es", { hour12: false }) : "--:--:--"}{" "}
              GMT-6
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
            Hola, {user?.name?.split(" ")[0]}
            <span className="text-brand">.</span>
          </h1>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {coins.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                href={`/market/${c.id}`}
                className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition text-xs"
              >
                <Image
                  src={c.image}
                  alt={c.symbol}
                  width={14}
                  height={14}
                  unoptimized
                  className="rounded-full"
                />
                <span className="uppercase font-medium">{c.symbol}</span>
                <span className="num text-text-muted">
                  {fmtPrice(c.currentPrice)}
                </span>
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

        {/* Hero: valor total + área 7d */}
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <CardTitle>Valor total del portafolio</CardTitle>
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
            <div className="-mb-5 -mr-5 lg:mb-0 lg:mr-0">
              <PortfolioArea total={p.totalValueUSD || 1000} up={pnlUp} />
            </div>
          </div>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi
            icon={<WalletIcon size={16} className="text-brand" />}
            label="Saldo USD"
            hint="Efectivo disponible para comprar criptoactivos."
            value={fmtUSD(p.wallet?.fiatBalanceUSD ?? 0)}
          />
          <Kpi
            icon={<Coins size={16} className="text-brand" />}
            label="En cripto"
            hint="Valor de mercado de tus tenencias."
            value={fmtUSD(p.holdingsValueUSD)}
          />
          <Kpi
            icon={
              pnlUp ? (
                <TrendingUp size={16} className="text-up" />
              ) : (
                <TrendingDown size={16} className="text-down" />
              )
            }
            label="Ganancia / pérdida"
            hint="Resultado no realizado sobre tus posiciones."
            value={fmtUSD(p.totalPnlUSD)}
            valueClass={pnlUp ? "text-up" : "text-down"}
          />
          <Kpi
            icon={
              <span className="num text-brand text-sm font-bold">
                {p.rows.length}
              </span>
            }
            label="Activos"
            hint="Cantidad de criptomonedas distintas en tu wallet."
            value={`${p.rows.length} ${p.rows.length === 1 ? "moneda" : "monedas"}`}
          />
        </div>

        {/* Posiciones + distribución */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 p-0 overflow-hidden">
            <div className="flex items-center justify-between p-5 pb-3">
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
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-text-muted uppercase bg-white/[0.03] backdrop-blur">
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

        {/* Movimientos recientes */}
        <Card className="p-0 overflow-hidden">
          <div className="flex items-center justify-between p-5 pb-3">
            <h2 className="font-semibold">Movimientos recientes</h2>
            <Link
              href="/history"
              className="text-xs text-text-muted hover:text-brand flex items-center gap-1 transition"
            >
              Ver historial <ArrowRight size={12} />
            </Link>
          </div>
          {tx.length === 0 ? (
            <div className="px-5 pb-8 pt-2 text-sm text-text-muted text-center">
              Aún no tienes movimientos.
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {tx.slice(0, 5).map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 px-5 py-3 glass-row"
                >
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded shrink-0",
                      t.type === "BUY"
                        ? "bg-up-bg text-up"
                        : "bg-down-bg text-down"
                    )}
                  >
                    {t.type === "BUY" ? "COMPRA" : "VENTA"}
                  </span>
                  <span className="uppercase font-medium">{t.coinSymbol}</span>
                  <span className="num text-xs text-text-muted">
                    {fmtCoinAmount(t.amountCoin)} @ {fmtPrice(t.priceUSD)}
                  </span>
                  <span className="ml-auto num text-sm">
                    {fmtUSD(t.totalUSD)}
                  </span>
                  <span className="hidden sm:block text-[11px] text-text-subtle w-28 text-right">
                    {new Date(t.createdAt).toLocaleString("es", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </TooltipProvider>
  );
}

const PALETTE = [
  "#0ea271",
  "#14b8a6",
  "#3b82f6",
  "#2dd4bf",
  "#f97316",
  "#ec4899",
  "#06b6d4",
  "#eab308",
];

function Kpi({
  icon,
  label,
  value,
  hint,
  valueClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  valueClass?: string;
}) {
  return (
    <Card className="!p-4">
      <div className="flex items-center justify-between">
        <CardTitle className="mb-0">{label}</CardTitle>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="size-7 -mr-1 -mt-1 rounded-md flex items-center justify-center glass-subtle">
              {icon}
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-48">{hint}</TooltipContent>
        </Tooltip>
      </div>
      <div className={cn("text-xl font-bold num mt-1.5", valueClass)}>
        {value}
      </div>
    </Card>
  );
}

function EmptyHoldings() {
  return (
    <div className="text-center py-10 text-sm text-text-muted">
      Todavía no tienes posiciones.
      <div className="mt-3">
        <Link href="/market" className="text-brand hover:underline font-medium">
          Explorar el mercado →
        </Link>
      </div>
    </div>
  );
}
