"use client";

import { useState } from "react";
import { Bell, BellRing, Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn, fmtPrice } from "@/lib/utils";

type Condition = "ABOVE" | "BELOW";
type Status = "ACTIVE" | "TRIGGERED";

interface Alert {
  id: string;
  symbol: string;
  condition: Condition;
  target: number;
  status: Status;
}

const SEED: Alert[] = [
  { id: "1", symbol: "BTC", condition: "ABOVE", target: 75000, status: "ACTIVE" },
  { id: "2", symbol: "ETH", condition: "BELOW", target: 2800, status: "ACTIVE" },
  { id: "3", symbol: "SOL", condition: "ABOVE", target: 200, status: "TRIGGERED" },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(SEED);
  const [symbol, setSymbol] = useState("");
  const [condition, setCondition] = useState<Condition>("ABOVE");
  const [target, setTarget] = useState("");

  function addAlert(e: React.FormEvent) {
    e.preventDefault();
    if (!symbol.trim() || !target) return;
    setAlerts((prev) => [
      {
        id: `${Date.now()}`,
        symbol: symbol.trim().toUpperCase(),
        condition,
        target: Number(target),
        status: "ACTIVE",
      },
      ...prev,
    ]);
    setSymbol("");
    setTarget("");
  }

  function remove(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Alertas de precio</h1>
        <p className="text-sm text-text-muted">
          Configura notificaciones cuando una criptomoneda alcance un umbral.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Crear alerta */}
        <Card className="lg:col-span-1 h-fit">
          <CardTitle className="flex items-center gap-2">
            <Plus size={14} /> Nueva alerta
          </CardTitle>
          <form onSubmit={addAlert} className="space-y-3 mt-2">
            <div className="space-y-1">
              <label className="text-xs text-text-muted">Símbolo</label>
              <Input
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="BTC, ETH, SOL…"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-text-muted">Condición</label>
              <div className="flex gap-1 glass-subtle rounded-md p-1">
                {(["ABOVE", "BELOW"] as Condition[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCondition(c)}
                    className={cn(
                      "flex-1 px-3 py-1.5 text-xs rounded transition",
                      condition === c
                        ? "bg-white/10 text-text"
                        : "text-text-muted hover:text-text"
                    )}
                  >
                    {c === "ABOVE" ? "Sube de ▲" : "Baja de ▼"}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-text-muted">Precio objetivo (USD)</label>
              <Input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <Button type="submit" className="w-full">
              Crear alerta
            </Button>
          </form>
          <div className="mt-4 flex items-start gap-2 text-[11px] text-text-subtle border-t border-border pt-3">
            <Info size={13} className="shrink-0 mt-0.5" />
            <span>
              El disparo de alertas y el envío de notificaciones se implementa
              en la Fase 2 (backend + job de monitoreo).
            </span>
          </div>
        </Card>

        {/* Listado */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
          <div className="p-5 pb-3">
            <CardTitle className="mb-0">Mis alertas</CardTitle>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-text-muted uppercase bg-white/[0.03] backdrop-blur">
                <tr>
                  <th className="text-left p-3">Activo</th>
                  <th className="text-left p-3">Condición</th>
                  <th className="text-right p-3">Objetivo</th>
                  <th className="text-center p-3">Estado</th>
                  <th className="text-right p-3"></th>
                </tr>
              </thead>
              <tbody>
                {alerts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-text-muted">
                      No tienes alertas configuradas.
                    </td>
                  </tr>
                ) : (
                  alerts.map((a) => (
                    <tr key={a.id} className="glass-row border-t border-white/5">
                      <td className="p-3 uppercase font-medium">{a.symbol}</td>
                      <td className="p-3 text-text-muted">
                        {a.condition === "ABOVE" ? "Sube de" : "Baja de"}
                      </td>
                      <td className="p-3 text-right num">{fmtPrice(a.target)}</td>
                      <td className="p-3 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded",
                            a.status === "ACTIVE"
                              ? "bg-up-bg text-up"
                              : "bg-brand/15 text-brand"
                          )}
                        >
                          {a.status === "ACTIVE" ? (
                            <Bell size={11} />
                          ) : (
                            <BellRing size={11} />
                          )}
                          {a.status === "ACTIVE" ? "Activa" : "Disparada"}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => remove(a.id)}
                          className="p-1.5 rounded-md text-text-muted hover:text-down hover:bg-white/5 transition"
                          title="Eliminar alerta"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
