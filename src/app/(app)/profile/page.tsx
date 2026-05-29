"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Wallet } from "@/lib/domain/types";
import { useSession } from "@/lib/hooks/useSession";
import { services } from "@/lib/services";
import { STORAGE_KEYS, remove } from "@/lib/services/storage";
import { fmtUSD } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, refresh } = useSession();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [txCount, setTxCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      services.wallet.get(user.id),
      services.transactions.list(user.id),
    ]).then(([w, t]) => {
      setWallet(w);
      setTxCount(t.length);
    });
  }, [user]);

  if (!user) return null;

  async function resetDemo() {
    if (!confirm("¿Resetear todos los datos del simulador? Esta acción borra usuarios, wallets y transacciones.")) {
      return;
    }
    Object.values(STORAGE_KEYS).forEach((k) => remove(k));
    await logout();
    await refresh();
    router.push("/register");
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Perfil</h1>
        <p className="text-sm text-text-muted">Datos de tu cuenta demo.</p>
      </div>

      <Card>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs text-text-muted uppercase">Nombre</dt>
            <dd className="mt-1 font-medium">{user.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-text-muted uppercase">Correo</dt>
            <dd className="mt-1 font-medium">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs text-text-muted uppercase">Miembro desde</dt>
            <dd className="mt-1">
              {new Date(user.createdAt).toLocaleDateString("es")}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-text-muted uppercase">Transacciones</dt>
            <dd className="mt-1 num">{txCount}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs text-text-muted uppercase">Saldo USD</dt>
            <dd className="mt-1 num text-2xl font-bold">
              {fmtUSD(wallet?.fiatBalanceUSD ?? 0)}
            </dd>
          </div>
        </dl>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <ShieldCheck className="text-brand shrink-0 mt-0.5" size={18} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Verificación de identidad (KYC)</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-down-bg text-down">
                Pendiente
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1 mb-3">
              Completa la verificación KYC para habilitar las operaciones de
              compra y venta (RF-16).
            </p>
            <Link href="/kyc">
              <Button variant="secondary" size="sm">
                Iniciar verificación
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <Card className="border-down/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-down shrink-0 mt-0.5" size={18} />
          <div className="flex-1">
            <h3 className="font-semibold text-down">Zona peligrosa</h3>
            <p className="text-sm text-text-muted mt-1 mb-3">
              Borra todos los datos locales del simulador (usuarios, wallets,
              transacciones). Útil para presentar el prototipo desde cero.
            </p>
            <Button variant="down" size="sm" onClick={resetDemo}>
              Resetear datos del simulador
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-1">Fase 1 — Frontend</h3>
        <p className="text-xs text-text-muted">
          Este prototipo guarda toda la información en <code>localStorage</code>{" "}
          de tu navegador. Los precios se obtienen en vivo de la API pública de
          CoinGecko. En la Fase 2 (próximo curso) se reemplazará la capa de
          persistencia por un backend real con base de datos.
        </p>
      </Card>
    </div>
  );
}
