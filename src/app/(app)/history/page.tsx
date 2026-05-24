"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import type { Transaction } from "@/lib/domain/types";
import { useSession } from "@/lib/hooks/useSession";
import { services } from "@/lib/services";
import { cn, fmtCoinAmount, fmtPrice, fmtUSD } from "@/lib/utils";

type Filter = "ALL" | "BUY" | "SELL";

export default function HistoryPage() {
  const { user } = useSession();
  const [tx, setTx] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!user) return;
    let alive = true;
    setLoading(true);
    services.transactions.list(user.id).then((d) => {
      if (alive) {
        setTx(d);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [user]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return tx.filter((t) => {
      if (filter !== "ALL" && t.type !== filter) return false;
      if (term && !t.coinSymbol.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [tx, filter, q]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Historial</h1>
        <p className="text-sm text-text-muted">
          Todas tus operaciones de compra y venta.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-bg-elev/40 border border-border rounded-md p-1">
          {(["ALL", "BUY", "SELL"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1 text-xs rounded transition",
                filter === f
                  ? "bg-bg-hover text-text"
                  : "text-text-muted hover:text-text"
              )}
            >
              {f === "ALL" ? "Todos" : f === "BUY" ? "Compras" : "Ventas"}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por símbolo (btc, eth…)"
          className="flex-1 sm:max-w-xs h-9 px-3 rounded-md bg-bg border border-border text-sm outline-none focus:border-brand"
        />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-text-muted uppercase bg-bg-elev/60">
              <tr>
                <th className="text-left p-3">Fecha</th>
                <th className="text-left p-3">Tipo</th>
                <th className="text-left p-3">Activo</th>
                <th className="text-right p-3">Cantidad</th>
                <th className="text-right p-3 hidden sm:table-cell">Precio</th>
                <th className="text-right p-3 hidden md:table-cell">
                  Comisión
                </th>
                <th className="text-right p-3">Total USD</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-text-muted">
                    Cargando…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-text-muted">
                    Sin transacciones.{" "}
                    <Link href="/market" className="text-brand hover:underline">
                      Ir al mercado
                    </Link>
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr
                    key={t.id}
                    className="border-t border-border hover:bg-bg-hover/40"
                  >
                    <td className="p-3 text-text-muted">
                      {new Date(t.createdAt).toLocaleString("es", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="p-3">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded",
                          t.type === "BUY"
                            ? "bg-up-bg text-up"
                            : "bg-down-bg text-down"
                        )}
                      >
                        {t.type === "BUY" ? "COMPRA" : "VENTA"}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/market/${t.coinId}`}
                        className="uppercase font-medium hover:text-brand"
                      >
                        {t.coinSymbol}
                      </Link>
                    </td>
                    <td className="p-3 text-right num">
                      {fmtCoinAmount(t.amountCoin)}
                    </td>
                    <td className="p-3 text-right num hidden sm:table-cell">
                      {fmtPrice(t.priceUSD)}
                    </td>
                    <td className="p-3 text-right num hidden md:table-cell text-text-muted">
                      {fmtUSD(t.fee)}
                    </td>
                    <td className="p-3 text-right num font-medium">
                      {fmtUSD(t.totalUSD)}
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
