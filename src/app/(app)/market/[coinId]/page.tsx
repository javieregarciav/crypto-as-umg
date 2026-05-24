"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { PriceChart } from "@/components/chart/PriceChart";
import { PriceChange } from "@/components/market/PriceChange";
import { TradePanel } from "@/components/trade/TradePanel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { CoinChartPoint } from "@/lib/domain/types";
import { useCoin } from "@/lib/hooks/usePrices";
import { services } from "@/lib/services";
import type { Range } from "@/lib/services/types";
import { fmtPrice, fmtUSD } from "@/lib/utils";

const RANGES: { key: Range; label: string }[] = [
  { key: "1", label: "24h" },
  { key: "7", label: "7d" },
  { key: "30", label: "30d" },
  { key: "365", label: "1y" },
];

export default function CoinDetailPage() {
  const params = useParams<{ coinId: string }>();
  const coinId = params.coinId;
  const { coin, loading, error } = useCoin(coinId);
  const [range, setRange] = useState<Range>("7");
  const [history, setHistory] = useState<CoinChartPoint[]>([]);
  const [hLoading, setHLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setHLoading(true);
    services.prices
      .history(coinId, range)
      .then((d) => {
        if (alive) setHistory(d);
      })
      .finally(() => {
        if (alive) setHLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [coinId, range]);

  if (loading) {
    return <div className="text-text-muted">Cargando…</div>;
  }
  if (error || !coin) {
    return (
      <div className="space-y-3">
        <div className="text-down">{error ?? "Moneda no encontrada."}</div>
        <Link href="/market" className="text-brand hover:underline">
          ← Volver al mercado
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/market"
        className="inline-flex items-center text-sm text-text-muted hover:text-text"
      >
        <ChevronLeft size={16} /> Mercado
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Image
            src={coin.image}
            alt={coin.symbol}
            width={48}
            height={48}
            unoptimized
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {coin.name}
              <span className="text-text-muted text-base uppercase">
                {coin.symbol}
              </span>
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="num text-3xl font-semibold">
                {fmtPrice(coin.currentPrice)}
              </span>
              <PriceChange pct={coin.priceChangePct24h} className="text-base" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Histórico de precio</h2>
            <div className="flex gap-1">
              {RANGES.map((r) => (
                <Button
                  key={r.key}
                  variant={range === r.key ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setRange(r.key)}
                >
                  {r.label}
                </Button>
              ))}
            </div>
          </div>
          {hLoading ? (
            <div className="h-[360px] bg-bg-hover/40 rounded animate-pulse" />
          ) : (
            <PriceChart data={history} up={coin.priceChangePct24h >= 0} />
          )}
        </Card>

        <div className="space-y-4">
          <TradePanel coin={coin} />
          <Card>
            <h3 className="font-semibold mb-3">Información</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-muted">Cap. mercado</dt>
                <dd className="num">{fmtUSD(coin.marketCap, true)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">Volumen 24h</dt>
                <dd className="num">{fmtUSD(coin.totalVolume, true)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">Ranking</dt>
                <dd className="num">#{coin.marketCapRank}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}
