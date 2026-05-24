import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

export function fmtUSD(n: number, compact = false): string {
  if (!Number.isFinite(n)) return "—";
  return compact ? usdCompact.format(n) : usd.format(n);
}

export function fmtPrice(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n >= 1) return usd.format(n);
  // sub-dollar prices: more precision
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(n);
}

export function fmtPct(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(digits)}%`;
}

export function fmtCoinAmount(n: number, symbol?: string): string {
  if (!Number.isFinite(n)) return "—";
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  }).format(n);
  return symbol ? `${formatted} ${symbol.toUpperCase()}` : formatted;
}
