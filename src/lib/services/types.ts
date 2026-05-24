import type {
  Coin,
  CoinChartPoint,
  Holding,
  Transaction,
  TxType,
  User,
  Wallet,
} from "@/lib/domain/types";

export interface IAuthService {
  register(input: {
    email: string;
    password: string;
    name: string;
  }): Promise<User>;
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  currentUser(): Promise<User | null>;
}

export interface IWalletService {
  get(userId: string): Promise<Wallet>;
  listHoldings(userId: string): Promise<Holding[]>;
  getHolding(userId: string, coinId: string): Promise<Holding | null>;
}

export interface ITransactionService {
  list(userId: string): Promise<Transaction[]>;
  execute(input: {
    userId: string;
    coinId: string;
    coinSymbol: string;
    type: TxType;
    amountCoin: number;
    priceUSD: number;
  }): Promise<Transaction>;
}

export type Range = "1" | "7" | "30" | "365";

export interface IPriceService {
  topCoins(limit?: number): Promise<Coin[]>;
  getCoin(coinId: string): Promise<Coin | null>;
  history(coinId: string, days: Range): Promise<CoinChartPoint[]>;
}
