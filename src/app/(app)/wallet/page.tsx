"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Info,
  Send,
  Wallet as WalletIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import type { Holding, Wallet } from "@/lib/domain/types";
import { useSession } from "@/lib/hooks/useSession";
import { services } from "@/lib/services";
import { fmtCoinAmount, fmtPrice, fmtUSD } from "@/lib/utils";

type Action = "deposit" | "withdraw" | "transfer";

const ACTIONS: Record<
  Action,
  { title: string; cta: string; help: string }
> = {
  deposit: {
    title: "Depositar fondos",
    cta: "Depositar",
    help: "Acreditará saldo virtual a tu wallet para operar.",
  },
  withdraw: {
    title: "Retirar fondos",
    cta: "Retirar",
    help: "Retirará saldo virtual de tu wallet.",
  },
  transfer: {
    title: "Transferir a otro usuario",
    cta: "Transferir",
    help: "Enviará saldo virtual a la wallet de otro usuario del simulador.",
  },
};

export default function WalletPage() {
  const { user } = useSession();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [action, setAction] = useState<Action | null>(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      services.wallet.get(user.id),
      services.wallet.listHoldings(user.id),
    ]).then(([w, h]) => {
      setWallet(w);
      setHoldings(h);
    });
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-sm text-text-muted">
          Tu billetera digital: saldo virtual, tenencias y movimientos.
        </p>
      </div>

      {/* Saldo + acciones */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1 flex flex-col justify-between glass-accent">
          <div>
            <CardTitle className="flex items-center gap-2">
              <WalletIcon size={14} /> Saldo virtual disponible
            </CardTitle>
            <div className="num text-3xl font-bold mt-1">
              {fmtUSD(wallet?.fiatBalanceUSD ?? 0)}
            </div>
            <p className="text-xs text-text-subtle mt-1">
              Fondos disponibles para compra de criptoactivos.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setAction("deposit")}
              className="flex-col h-auto py-2 gap-1"
            >
              <ArrowDownToLine size={16} />
              <span className="text-[11px]">Depositar</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setAction("withdraw")}
              className="flex-col h-auto py-2 gap-1"
            >
              <ArrowUpFromLine size={16} />
              <span className="text-[11px]">Retirar</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setAction("transfer")}
              className="flex-col h-auto py-2 gap-1"
            >
              <Send size={16} />
              <span className="text-[11px]">Transferir</span>
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle>Resumen de la billetera</CardTitle>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 text-sm">
            <div>
              <dt className="text-xs text-text-muted">Activos distintos</dt>
              <dd className="num text-xl font-semibold mt-1">
                {holdings.length}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-text-muted">Estado de la wallet</dt>
              <dd className="mt-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-up-bg text-up">
                  Activa
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-text-muted">Moneda base</dt>
              <dd className="mt-1 font-medium">USD</dd>
            </div>
          </dl>
          <div className="mt-4 flex items-start gap-2 text-xs text-text-subtle border-t border-border pt-3">
            <Info size={14} className="shrink-0 mt-0.5" />
            <span>
              Depósitos, retiros y transferencias son funciones del diseño
              (RF-06/07 y casos de uso de wallet). La lógica de movimientos se
              implementará en la Fase 2 con backend y base de datos.
            </span>
          </div>
        </Card>
      </div>

      {/* Tenencias */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 pb-3">
          <CardTitle className="mb-0">Tenencias (Balance por cripto)</CardTitle>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-text-muted uppercase bg-white/[0.03] backdrop-blur">
              <tr>
                <th className="text-left p-3">Activo</th>
                <th className="text-right p-3">Cantidad</th>
                <th className="text-right p-3 hidden sm:table-cell">
                  Precio prom. compra
                </th>
              </tr>
            </thead>
            <tbody>
              {holdings.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-text-muted">
                    Tu wallet aún no tiene criptoactivos.
                  </td>
                </tr>
              ) : (
                holdings.map((h) => (
                  <tr
                    key={h.coinId}
                    className="glass-row border-t border-white/5"
                  >
                    <td className="p-3 uppercase font-medium">{h.coinId}</td>
                    <td className="p-3 text-right num">
                      {fmtCoinAmount(h.amount)}
                    </td>
                    <td className="p-3 text-right num hidden sm:table-cell text-text-muted">
                      {fmtPrice(h.avgBuyPriceUSD)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog
        open={action !== null}
        onOpenChange={(o) => !o && setAction(null)}
      >
        <DialogContent className="max-w-sm">
          {action && (
            <>
              <DialogHeader>
                <DialogTitle>{ACTIONS[action].title}</DialogTitle>
                <DialogDescription>{ACTIONS[action].help}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {action === "transfer" && (
                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">
                      Correo del destinatario
                    </label>
                    <Input type="email" placeholder="destinatario@correo.com" />
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Monto (USD)</label>
                  <Input type="number" placeholder="0.00" />
                </div>

                <div className="flex items-start gap-2 text-[11px] text-text-subtle bg-white/[0.03] rounded-md p-2">
                  <Info size={13} className="shrink-0 mt-0.5" />
                  <span>Operación teórica — se habilitará en la Fase 2.</span>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setAction(null)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setAction(null)}
                    title="Disponible en Fase 2"
                  >
                    {ACTIONS[action].cta}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
