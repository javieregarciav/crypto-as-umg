export type ID = string;

export interface User {
  id: ID;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

export interface Wallet {
  userId: ID;
  fiatBalanceUSD: number;
}

export interface Holding {
  userId: ID;
  coinId: string;
  amount: number;
  avgBuyPriceUSD: number;
}

export type TxType = "BUY" | "SELL";

export interface Transaction {
  id: ID;
  userId: ID;
  coinId: string;
  coinSymbol: string;
  type: TxType;
  amountCoin: number;
  priceUSD: number;
  totalUSD: number;
  fee: number;
  createdAt: string;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  priceChange24h: number;
  priceChangePct24h: number;
  totalVolume: number;
  sparkline?: number[];
}

export interface CoinChartPoint {
  t: number;
  price: number;
}
