"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingDown, TrendingUp, Wallet as WalletIcon } from "lucide-react";
import { PortfolioDonut } from "@/components/chart/PortfolioDonut";
import { PriceChange } from "@/components/market/PriceChange";
import { Card, CardTitle } from "@/components/ui/Card";
import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { useSession } from "@/lib/hooks/useSession";
import { cn, fmtCoinAmount, fmtPrice, fmtUSD } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useSession();
  const p = usePortfolio();

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
      <div>
        <p className="text-sm text-text-muted">Hola, {user?.name} 👋</p>
        <h1 className="text-2xl font-bold">Tu portfolio</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardTitle>Valor total</CardTitle>
          <div className="text-2xl font-bold num">
            {fmtUSD(p.totalValueUSD)}
          </div>
          <div className="text-xs text-text-muted mt-1">
            USD + criptomonedas
          </div>
        </Card>
        <Card>
          <CardTitle>Saldo USD</CardTitle>
          <div className="text-2xl font-bold num flex items-center gap-2">
            <WalletIcon size={18} className="text-text-muted" />
            {fmtUSD(p.wallet?.fiatBalanceUSD ?? 0)}
          </div>
          <div className="text-xs text-text-muted mt-1">
            Disponible para comprar
          </div>
        </Card>
        <Card>
          <CardTitle>Valor en cripto</CardTitle>
          <div className="text-2xl font-bold num">
            {fmtUSD(p.holdingsValueUSD)}
          </div>
          <div className="text-xs text-text-muted mt-1">
            {p.rows.length} {p.rows.length === 1 ? "activo" : "activos"}
          </div>
        </Card>
        <Card>
          <CardTitle>Ganancia / Pérdida</CardTitle>
          <div
            className={cn(
              "text-2xl font-bold num flex items-center gap-2",
              pnlUp ? "text-up" : "text-down"
            )}
          >
            {pnlUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            {fmtUSD(p.totalPnlUSD)}
          </div>
          <PriceChange pct={p.totalPnlPct} className="text-xs mt-1" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Tus posiciones</h2>
            <Link
              href="/portfolio"
              className="text-xs text-text-muted hover:text-text flex items-center gap-1"
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
                      className="border-t border-border"
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
  "#f0b90b",
  "#0ecb81",
  "#3b82f6",
  "#a855f7",
  "#f97316",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];

function EmptyHoldings() {
  return (
    <div className="text-center py-10 text-sm text-text-muted">
      Todavía no tenés posiciones.
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
