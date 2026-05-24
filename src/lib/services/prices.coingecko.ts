import type { Coin } from "@/lib/domain/types";
import type { IPriceService, Range } from "./types";

const BASE = "https://api.coingecko.com/api/v3";

// Module-scoped tiny cache to soften CoinGecko rate limits in dev.
const cache = new Map<string, { at: number; data: unknown }>();
const TTL = 30_000;

async function cachedFetch<T>(url: string, ttl = TTL): Promise<T> {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < ttl) return hit.data as T;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`CoinGecko ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as T;
  cache.set(url, { at: Date.now(), data });
  return data;
}

type GeckoMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  total_volume: number;
  sparkline_in_7d?: { price: number[] };
};

function toCoin(m: GeckoMarket): Coin {
  return {
    id: m.id,
    symbol: m.symbol,
    name: m.name,
    image: m.image,
    currentPrice: m.current_price,
    marketCap: m.market_cap,
    marketCapRank: m.market_cap_rank,
    priceChange24h: m.price_change_24h ?? 0,
    priceChangePct24h: m.price_change_percentage_24h ?? 0,
    totalVolume: m.total_volume,
    sparkline: m.sparkline_in_7d?.price,
  };
}

export const pricesCoinGecko: IPriceService = {
  async topCoins(limit = 50) {
    const url = `${BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`;
    const data = await cachedFetch<GeckoMarket[]>(url);
    return data.map(toCoin);
  },

  async getCoin(coinId) {
    const url = `${BASE}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(
      coinId
    )}&sparkline=true&price_change_percentage=24h`;
    const data = await cachedFetch<GeckoMarket[]>(url);
    return data[0] ? toCoin(data[0]) : null;
  },

  async history(coinId, days: Range) {
    const url = `${BASE}/coins/${encodeURIComponent(
      coinId
    )}/market_chart?vs_currency=usd&days=${days}`;
    const data = await cachedFetch<{ prices: [number, number][] }>(url, 60_000);
    return data.prices.map(([t, price]) => ({ t, price }));
  },
};
