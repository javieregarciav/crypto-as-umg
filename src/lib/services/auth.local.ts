import type { User, Wallet } from "@/lib/domain/types";
import type { IAuthService } from "./types";
import {
  STORAGE_KEYS,
  hashPassword,
  read,
  remove,
  uid,
  write,
} from "./storage";

const SEED_BALANCE = 10_000;

function ensureWalletFor(userId: string) {
  const wallets = read<Wallet[]>(STORAGE_KEYS.wallets, []);
  if (!wallets.some((w) => w.userId === userId)) {
    wallets.push({ userId, fiatBalanceUSD: SEED_BALANCE });
    write(STORAGE_KEYS.wallets, wallets);
  }
}

export const authLocal: IAuthService = {
  async register({ email, password, name }) {
    const users = read<User[]>(STORAGE_KEYS.users, []);
    const emailLc = email.trim().toLowerCase();
    if (users.some((u) => u.email === emailLc)) {
      throw new Error("Ya existe un usuario con ese correo.");
    }
    const user: User = {
      id: uid(),
      email: emailLc,
      name: name.trim(),
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    write(STORAGE_KEYS.users, users);
    ensureWalletFor(user.id);
    write(STORAGE_KEYS.session, { userId: user.id });
    return user;
  },

  async login(email, password) {
    const users = read<User[]>(STORAGE_KEYS.users, []);
    const emailLc = email.trim().toLowerCase();
    const user = users.find((u) => u.email === emailLc);
    if (!user || user.passwordHash !== hashPassword(password)) {
      throw new Error("Credenciales inválidas.");
    }
    ensureWalletFor(user.id);
    write(STORAGE_KEYS.session, { userId: user.id });
    return user;
  },

  async logout() {
    remove(STORAGE_KEYS.session);
  },

  async currentUser() {
    const session = read<{ userId?: string } | null>(STORAGE_KEYS.session, null);
    if (!session?.userId) return null;
    const users = read<User[]>(STORAGE_KEYS.users, []);
    return users.find((u) => u.id === session.userId) ?? null;
  },
};
