import type { Holding, Wallet } from "@/lib/domain/types";
import type { IWalletService } from "./types";
import { STORAGE_KEYS, read } from "./storage";

const SEED_BALANCE = 10_000;

export const walletLocal: IWalletService = {
  async get(userId) {
    const wallets = read<Wallet[]>(STORAGE_KEYS.wallets, []);
    return (
      wallets.find((w) => w.userId === userId) ?? {
        userId,
        fiatBalanceUSD: SEED_BALANCE,
      }
    );
  },

  async listHoldings(userId) {
    const all = read<Holding[]>(STORAGE_KEYS.holdings, []);
    return all.filter((h) => h.userId === userId && h.amount > 0);
  },

  async getHolding(userId, coinId) {
    const all = read<Holding[]>(STORAGE_KEYS.holdings, []);
    return all.find((h) => h.userId === userId && h.coinId === coinId) ?? null;
  },
};
