// Service factory — the ONLY place that picks an implementation.
// Phase 2: swap these for HTTP-backed implementations against a real API.

import { authLocal } from "./auth.local";
import { pricesCoinGecko } from "./prices.coingecko";
import { transactionsLocal } from "./transactions.local";
import { walletLocal } from "./wallet.local";

export const services = {
  auth: authLocal,
  wallet: walletLocal,
  transactions: transactionsLocal,
  prices: pricesCoinGecko,
};

export type Services = typeof services;
