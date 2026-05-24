// Thin wrapper around localStorage that is SSR-safe and JSON-encoded.
// In Phase 2 this file disappears — replace `*.local.ts` with `*.http.ts`.

export const STORAGE_KEYS = {
  users: "cumg.users",
  session: "cumg.session",
  wallets: "cumg.wallets",
  holdings: "cumg.holdings",
  transactions: "cumg.transactions",
  seeded: "cumg.seeded",
} as const;

function safe(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function read<T>(key: string, fallback: T): T {
  const s = safe();
  if (!s) return fallback;
  const raw = s.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function write<T>(key: string, value: T): void {
  const s = safe();
  if (!s) return;
  s.setItem(key, JSON.stringify(value));
}

export function remove(key: string): void {
  const s = safe();
  if (!s) return;
  s.removeItem(key);
}

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Demo-only hash (NOT secure — Phase 2 will use bcrypt server-side).
export function hashPassword(plain: string): string {
  let h = 0;
  for (let i = 0; i < plain.length; i++) {
    h = (h << 5) - h + plain.charCodeAt(i);
    h |= 0;
  }
  return `mock$${h.toString(36)}$${plain.length}`;
}
