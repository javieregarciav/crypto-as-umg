"use client";

import { useEffect, useMemo, useState } from "react";
import type { Coin, Holding, TxType, Wallet } from "@/lib/domain/types";
import { useSession } from "@/lib/hooks/useSession";
import { services } from "@/lib/services";
import {
  cn,
  fmtCoinAmount,
  fmtPrice,
  fmtUSD,
} from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

const FEE_RATE = 0.001;

export function TradePanel({ coin }: { coin: Coin }) {
  const { user } = useSession();
  const [side, setSide] = useState<TxType>("BUY");
  const [mode, setMode] = useState<"USD" | "COIN">("USD");
  const [value, setValue] = useState("");
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [holding, setHolding] = useState<Holding | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function reload() {
    if (!user) return;
    const [w, h] = await Promise.all([
      services.wallet.get(user.id),
      services.wallet.getHolding(user.id, coin.id),
    ]);
    setWallet(w);
    setHolding(h);
  }

  useEffect(() => {
    void reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, coin.id]);

  const numeric = Number(value);
  const amountCoin = useMemo(() => {
    if (!Number.isFinite(numeric) || numeric <= 0) return 0;
    return mode === "USD" ? numeric / coin.currentPrice : numeric;
  }, [numeric, mode, coin.currentPrice]);

  const grossUSD = amountCoin * coin.currentPrice;
  const fee = grossUSD * FEE_RATE;
  const totalUSD = side === "BUY" ? grossUSD + fee : grossUSD - fee;
  const maxUSD = wallet?.fiatBalanceUSD ?? 0;
  const maxCoin = holding?.amount ?? 0;

  function setPct(pct: number) {
    if (side === "BUY") {
      setMode("USD");
      setValue((maxUSD * pct).toFixed(2));
    } else {
      setMode("COIN");
      setValue((maxCoin * pct).toFixed(8));
    }
  }

  async function submit() {
    if (!user) return;
    setError(null);
    setOk(null);
    if (amountCoin <= 0) {
      setError("Ingresa una cantidad.");
      return;
    }
    setPending(true);
    try {
      await services.transactions.execute({
        userId: user.id,
        coinId: coin.id,
        coinSymbol: coin.symbol,
        type: side,
        amountCoin,
        priceUSD: coin.currentPrice,
      });
      setOk(
        side === "BUY"
          ? `Compraste ${fmtCoinAmount(amountCoin, coin.symbol)}.`
          : `Vendiste ${fmtCoinAmount(amountCoin, coin.symbol)}.`
      );
      setValue("");
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error en la operación.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className="grid grid-cols-2">
        <button
          onClick={() => setSide("BUY")}
          className={cn(
            "py-3 text-sm font-semibold transition",
            side === "BUY"
              ? "bg-up text-black"
              : "bg-white/[0.03] text-text-muted hover:text-text"
          )}
        >
          Comprar
        </button>
        <button
          onClick={() => setSide("SELL")}
          className={cn(
            "py-3 text-sm font-semibold transition",
            side === "SELL"
              ? "bg-down text-white"
              : "bg-white/[0.03] text-text-muted hover:text-text"
          )}
        >
          Vender
        </button>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-muted">
            {side === "BUY" ? "Saldo USD" : `Tienes`}
          </span>
          <span className="num">
            {side === "BUY"
              ? fmtUSD(maxUSD)
              : fmtCoinAmount(maxCoin, coin.symbol)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex gap-1 text-xs">
            <button
              onClick={() => setMode("USD")}
              className={cn(
                "px-2 py-1 rounded",
                mode === "USD"
                  ? "bg-white/10 text-text"
                  : "text-text-muted hover:text-text"
              )}
            >
              USD
            </button>
            <button
              onClick={() => setMode("COIN")}
              className={cn(
                "px-2 py-1 rounded uppercase",
                mode === "COIN"
                  ? "bg-white/10 text-text"
                  : "text-text-muted hover:text-text"
              )}
            >
              {coin.symbol}
            </button>
          </div>
          <Input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0.00"
          />
          <div className="flex gap-1">
            {[0.25, 0.5, 0.75, 1].map((p) => (
              <button
                key={p}
                onClick={() => setPct(p)}
                className="flex-1 text-xs py-1 rounded bg-white/5 hover:bg-white/10 text-text-muted hover:text-text transition"
              >
                {p * 100}%
              </button>
            ))}
          </div>
        </div>

        <dl className="text-xs space-y-1 border-t border-border pt-3">
          <div className="flex justify-between">
            <dt className="text-text-muted">Precio</dt>
            <dd className="num">{fmtPrice(coin.currentPrice)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Cantidad</dt>
            <dd className="num">
              {fmtCoinAmount(amountCoin, coin.symbol)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-text-muted">Comisión (0.1%)</dt>
            <dd className="num">{fmtUSD(fee)}</dd>
          </div>
          <div className="flex justify-between font-semibold text-sm pt-1">
            <dt>{side === "BUY" ? "Total a pagar" : "Recibís"}</dt>
            <dd className="num">{fmtUSD(totalUSD)}</dd>
          </div>
        </dl>

        {error && (
          <div className="text-down text-xs bg-down-bg border border-down/30 rounded-md px-2 py-1.5">
            {error}
          </div>
        )}
        {ok && (
          <div className="text-up text-xs bg-up-bg border border-up/30 rounded-md px-2 py-1.5">
            {ok}
          </div>
        )}

        <Button
          variant={side === "BUY" ? "up" : "down"}
          disabled={pending || amountCoin <= 0}
          className="w-full"
          onClick={submit}
        >
          {pending
            ? "Procesando…"
            : `${side === "BUY" ? "Comprar" : "Vender"} ${coin.symbol.toUpperCase()}`}
        </Button>
      </div>
    </Card>
  );
}
