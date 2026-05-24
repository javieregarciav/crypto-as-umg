"use client";

import { useEffect, useRef, useState } from "react";
import type { Coin } from "@/lib/domain/types";
import { services } from "@/lib/services";

export function useTopCoins(limit = 50, refreshMs = 30_000) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function load() {
      try {
        const data = await services.prices.topCoins(limit);
        if (!alive.current) return;
        setCoins(data);
        setError(null);
      } catch (e) {
        if (!alive.current) return;
        setError(e instanceof Error ? e.message : "Error cargando precios.");
      } finally {
        if (alive.current) setLoading(false);
      }
      if (alive.current) timer = setTimeout(load, refreshMs);
    }
    load();

    return () => {
      alive.current = false;
      if (timer) clearTimeout(timer);
    };
  }, [limit, refreshMs]);

  return { coins, loading, error };
}

export function useCoin(coinId: string) {
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    services.prices
      .getCoin(coinId)
      .then((c) => {
        if (!alive) return;
        setCoin(c);
        setError(null);
      })
      .catch((e) => {
        if (alive) setError(e instanceof Error ? e.message : "Error");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [coinId]);

  return { coin, loading, error };
}
