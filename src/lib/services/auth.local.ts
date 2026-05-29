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

// Usuario demo hardcodeado — siempre disponible para iniciar sesión,
// incluso si el localStorage del navegador está vacío (p. ej. en Vercel).
//   correo:      demo@agora.gt
//   contraseña:  demo1234
export const DEMO_CREDENTIALS = {
  email: "demo@agora.gt",
  password: "demo1234",
};

const DEMO_USER: User = {
  id: "demo-user-0001",
  email: DEMO_CREDENTIALS.email,
  name: "Usuario Demo",
  passwordHash: hashPassword(DEMO_CREDENTIALS.password),
  createdAt: "2026-05-01T00:00:00.000Z",
};

function ensureWalletFor(userId: string) {
  const wallets = read<Wallet[]>(STORAGE_KEYS.wallets, []);
  if (!wallets.some((w) => w.userId === userId)) {
    wallets.push({ userId, fiatBalanceUSD: SEED_BALANCE });
    write(STORAGE_KEYS.wallets, wallets);
  }
}

// Garantiza que el usuario demo exista en el "almacén" local. Idempotente.
function ensureSeed() {
  const users = read<User[]>(STORAGE_KEYS.users, []);
  if (!users.some((u) => u.email === DEMO_USER.email)) {
    users.push(DEMO_USER);
    write(STORAGE_KEYS.users, users);
  }
  ensureWalletFor(DEMO_USER.id);
}

export const authLocal: IAuthService = {
  async register({ email, password, name }) {
    ensureSeed();
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
    ensureSeed();
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
    ensureSeed();
    const session = read<{ userId?: string } | null>(STORAGE_KEYS.session, null);
    if (!session?.userId) return null;
    const users = read<User[]>(STORAGE_KEYS.users, []);
    return users.find((u) => u.id === session.userId) ?? null;
  },
};
