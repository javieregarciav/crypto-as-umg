import type { Holding, Transaction, Wallet } from "@/lib/domain/types";
import type { ITransactionService } from "./types";
import { STORAGE_KEYS, read, uid, write } from "./storage";

const FEE_RATE = 0.001; // 0.1%

export const transactionsLocal: ITransactionService = {
  async list(userId) {
    const all = read<Transaction[]>(STORAGE_KEYS.transactions, []);
    return all
      .filter((t) => t.userId === userId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  },

  async execute({ userId, coinId, coinSymbol, type, amountCoin, priceUSD }) {
    if (!Number.isFinite(amountCoin) || amountCoin <= 0) {
      throw new Error("Cantidad inválida.");
    }
    if (!Number.isFinite(priceUSD) || priceUSD <= 0) {
      throw new Error("Precio inválido.");
    }

    const gross = amountCoin * priceUSD;
    const fee = +(gross * FEE_RATE).toFixed(2);
    const totalUSD = type === "BUY" ? gross + fee : gross - fee;

    const wallets = read<Wallet[]>(STORAGE_KEYS.wallets, []);
    const wIdx = wallets.findIndex((w) => w.userId === userId);
    if (wIdx === -1) throw new Error("Wallet no encontrado.");
    const wallet = wallets[wIdx];

    const holdings = read<Holding[]>(STORAGE_KEYS.holdings, []);
    const hIdx = holdings.findIndex(
      (h) => h.userId === userId && h.coinId === coinId
    );
    const holding: Holding = hIdx >= 0
      ? { ...holdings[hIdx] }
      : { userId, coinId, amount: 0, avgBuyPriceUSD: 0 };

    if (type === "BUY") {
      if (wallet.fiatBalanceUSD < totalUSD) {
        throw new Error("Saldo USD insuficiente.");
      }
      const prevValue = holding.amount * holding.avgBuyPriceUSD;
      const newAmount = holding.amount + amountCoin;
      holding.avgBuyPriceUSD =
        newAmount > 0 ? (prevValue + gross) / newAmount : 0;
      holding.amount = newAmount;
      wallet.fiatBalanceUSD = +(wallet.fiatBalanceUSD - totalUSD).toFixed(2);
    } else {
      if (holding.amount < amountCoin) {
        throw new Error(`No tienes suficiente ${coinSymbol.toUpperCase()}.`);
      }
      holding.amount = +(holding.amount - amountCoin).toFixed(10);
      if (holding.amount === 0) holding.avgBuyPriceUSD = 0;
      wallet.fiatBalanceUSD = +(wallet.fiatBalanceUSD + totalUSD).toFixed(2);
    }

    wallets[wIdx] = wallet;
    if (hIdx >= 0) holdings[hIdx] = holding;
    else holdings.push(holding);

    const tx: Transaction = {
      id: uid(),
      userId,
      coinId,
      coinSymbol,
      type,
      amountCoin,
      priceUSD,
      totalUSD,
      fee,
      createdAt: new Date().toISOString(),
    };
    const allTx = read<Transaction[]>(STORAGE_KEYS.transactions, []);
    allTx.push(tx);

    write(STORAGE_KEYS.wallets, wallets);
    write(STORAGE_KEYS.holdings, holdings);
    write(STORAGE_KEYS.transactions, allTx);

    return tx;
  },
};
