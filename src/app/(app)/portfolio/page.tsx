"use client";

import Image from "next/image";
import Link from "next/link";
import { PriceChange } from "@/components/market/PriceChange";
import { Card } from "@/components/ui/Card";
import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { fmtCoinAmount, fmtPrice, fmtUSD } from "@/lib/utils";

export default function PortfolioPage() {
  const p = usePortfolio();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <p className="text-sm text-text-muted">
          Detalle de todas tus posiciones y rendimiento.
        </p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-text-muted uppercase bg-bg-elev/60">
              <tr>
                <th className="text-left p-3">Activo</th>
                <th className="text-right p-3">Cantidad</th>
                <th className="text-right p-3">Precio prom. compra</th>
                <th className="text-right p-3">Precio actual</th>
                <th className="text-right p-3">Valor</th>
                <th className="text-right p-3">P/L USD</th>
                <th className="text-right p-3">P/L %</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {p.loading ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-text-muted">
                    Cargando…
                  </td>
                </tr>
              ) : p.rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-text-muted">
                    No tenés posiciones todavía.{" "}
                    <Link
                      href="/market"
                      className="text-brand hover:underline"
                    >
                      Ir al mercado
                    </Link>
                  </td>
                </tr>
              ) : (
                p.rows.map((r) => (
                  <tr
                    key={r.holding.coinId}
                    className="border-t border-border hover:bg-bg-hover/40"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={r.coin.image}
                          alt={r.coin.symbol}
                          width={22}
                          height={22}
                          unoptimized
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium">{r.coin.name}</div>
                          <div className="text-xs uppercase text-text-muted">
                            {r.coin.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-right num">
                      {fmtCoinAmount(r.holding.amount)}
                    </td>
                    <td className="p-3 text-right num text-text-muted">
                      {fmtPrice(r.holding.avgBuyPriceUSD)}
                    </td>
                    <td className="p-3 text-right num">
                      {fmtPrice(r.coin.currentPrice)}
                    </td>
                    <td className="p-3 text-right num">
                      {fmtUSD(r.valueUSD)}
                    </td>
                    <td
                      className={`p-3 text-right num ${
                        r.pnlUSD >= 0 ? "text-up" : "text-down"
                      }`}
                    >
                      {fmtUSD(r.pnlUSD)}
                    </td>
                    <td className="p-3 text-right">
                      <PriceChange pct={r.pnlPct} />
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/market/${r.coin.id}`}
                        className="text-xs text-brand hover:underline"
                      >
                        Operar
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
