"use client";

import { useState } from "react";
import {
  Ban,
  BarChart3,
  CheckCircle2,
  Info,
  Lock,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Unlock,
  Users,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn, fmtUSD } from "@/lib/utils";

type Tab = "users" | "transactions" | "reports";

type UserState = "ACTIVE" | "BLOCKED";
type Kyc = "VERIFIED" | "PENDING";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Cliente" | "Administrador";
  state: UserState;
  kyc: Kyc;
}

interface AdminTx {
  id: string;
  user: string;
  type: "COMPRA" | "VENTA";
  symbol: string;
  total: number;
  date: string;
}

const SEED_USERS: AdminUser[] = [
  { id: "1", name: "Javier García", email: "javier@umg.edu.gt", role: "Administrador", state: "ACTIVE", kyc: "VERIFIED" },
  { id: "2", name: "José Curup", email: "jose@umg.edu.gt", role: "Cliente", state: "ACTIVE", kyc: "VERIFIED" },
  { id: "3", name: "Guillermo López", email: "guillermo@umg.edu.gt", role: "Cliente", state: "ACTIVE", kyc: "PENDING" },
  { id: "4", name: "Diego Sandoval", email: "diego@umg.edu.gt", role: "Cliente", state: "BLOCKED", kyc: "VERIFIED" },
  { id: "5", name: "Deyvis Silva", email: "deyvis@umg.edu.gt", role: "Cliente", state: "ACTIVE", kyc: "PENDING" },
];

const SEED_TX: AdminTx[] = [
  { id: "1", user: "José Curup", type: "COMPRA", symbol: "BTC", total: 1250.5, date: "2026-05-27 14:32" },
  { id: "2", user: "Guillermo López", type: "VENTA", symbol: "ETH", total: 640.0, date: "2026-05-27 11:08" },
  { id: "3", user: "Deyvis Silva", type: "COMPRA", symbol: "SOL", total: 320.75, date: "2026-05-26 19:45" },
  { id: "4", user: "José Curup", type: "VENTA", symbol: "BTC", total: 980.2, date: "2026-05-26 09:12" },
  { id: "5", user: "Diego Sandoval", type: "COMPRA", symbol: "ETH", total: 1500.0, date: "2026-05-25 16:50" },
];

const TABS: { key: Tab; label: string; icon: typeof Users }[] = [
  { key: "users", label: "Usuarios", icon: Users },
  { key: "transactions", label: "Transacciones", icon: TrendingUp },
  { key: "reports", label: "Reportes", icon: BarChart3 },
];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("users");
  const [users, setUsers] = useState<AdminUser[]>(SEED_USERS);

  function toggleBlock(id: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, state: u.state === "ACTIVE" ? "BLOCKED" : "ACTIVE" }
          : u
      )
    );
  }

  function removeUser(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  const activeUsers = users.filter((u) => u.state === "ACTIVE").length;
  const volume = SEED_TX.reduce((s, t) => s + t.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-brand" size={22} />
        <div>
          <h1 className="text-2xl font-bold">Panel de Administrador</h1>
          <p className="text-sm text-text-muted">
            Gestión de usuarios, supervisión de transacciones y reportes.
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Usuarios totales" value={`${users.length}`} icon={Users} />
        <Stat label="Usuarios activos" value={`${activeUsers}`} icon={CheckCircle2} />
        <Stat label="Transacciones" value={`${SEED_TX.length}`} icon={TrendingUp} />
        <Stat label="Volumen operado" value={fmtUSD(volume)} icon={BarChart3} />
      </div>

      {/* Tabs */}
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as Tab)}
        className="space-y-5"
      >
        <TabsList>
          {TABS.map(({ key, label, icon: Icon }) => (
            <TabsTrigger key={key} value={key}>
              <Icon size={14} />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="users">
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-text-muted uppercase bg-white/[0.03] backdrop-blur">
                <tr>
                  <th className="text-left p-3">Usuario</th>
                  <th className="text-left p-3 hidden sm:table-cell">Correo</th>
                  <th className="text-left p-3">Rol</th>
                  <th className="text-center p-3">KYC</th>
                  <th className="text-center p-3">Estado</th>
                  <th className="text-right p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="glass-row border-t border-white/5">
                    <td className="p-3 font-medium">{u.name}</td>
                    <td className="p-3 text-text-muted hidden sm:table-cell">
                      {u.email}
                    </td>
                    <td className="p-3">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded",
                          u.role === "Administrador"
                            ? "bg-brand/15 text-brand"
                            : "bg-white/5 text-text-muted"
                        )}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded",
                          u.kyc === "VERIFIED"
                            ? "bg-up-bg text-up"
                            : "bg-down-bg text-down"
                        )}
                      >
                        {u.kyc === "VERIFIED" ? "Verificado" : "Pendiente"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded",
                          u.state === "ACTIVE"
                            ? "bg-up-bg text-up"
                            : "bg-down-bg text-down"
                        )}
                      >
                        {u.state === "ACTIVE" ? "Activo" : "Bloqueado"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleBlock(u.id)}
                          className="p-1.5 rounded-md text-text-muted hover:text-text hover:bg-white/5 transition"
                          title={
                            u.state === "ACTIVE" ? "Bloquear" : "Desbloquear"
                          }
                        >
                          {u.state === "ACTIVE" ? (
                            <Lock size={15} />
                          ) : (
                            <Unlock size={15} />
                          )}
                        </button>
                        <button
                          onClick={() => removeUser(u.id)}
                          className="p-1.5 rounded-md text-text-muted hover:text-down hover:bg-white/5 transition"
                          title="Eliminar usuario"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        </TabsContent>

        <TabsContent value="transactions">
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-text-muted uppercase bg-white/[0.03] backdrop-blur">
                <tr>
                  <th className="text-left p-3">Fecha</th>
                  <th className="text-left p-3">Usuario</th>
                  <th className="text-left p-3">Tipo</th>
                  <th className="text-left p-3">Activo</th>
                  <th className="text-right p-3">Total USD</th>
                </tr>
              </thead>
              <tbody>
                {SEED_TX.map((t) => (
                  <tr key={t.id} className="glass-row border-t border-white/5">
                    <td className="p-3 text-text-muted">{t.date}</td>
                    <td className="p-3 font-medium">{t.user}</td>
                    <td className="p-3">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded",
                          t.type === "COMPRA"
                            ? "bg-up-bg text-up"
                            : "bg-down-bg text-down"
                        )}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="p-3 uppercase">{t.symbol}</td>
                    <td className="p-3 text-right num font-medium">
                      {fmtUSD(t.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        </TabsContent>

        <TabsContent value="reports">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardTitle>Actividad de usuarios</CardTitle>
            <div className="space-y-2 mt-2 text-sm">
              <ReportRow label="Nuevos registros (7d)" value="12" />
              <ReportRow label="Usuarios activos" value={`${activeUsers}`} />
              <ReportRow label="Cuentas bloqueadas" value="1" />
              <ReportRow label="KYC pendientes" value="2" />
            </div>
          </Card>
          <Card>
            <CardTitle>Volumen de transacciones</CardTitle>
            <div className="space-y-2 mt-2 text-sm">
              <ReportRow label="Compras (7d)" value="3" />
              <ReportRow label="Ventas (7d)" value="2" />
              <ReportRow label="Volumen total" value={fmtUSD(volume)} />
              <ReportRow
                label="Ticket promedio"
                value={fmtUSD(volume / SEED_TX.length)}
              />
            </div>
          </Card>
          <Card className="md:col-span-2">
            <div className="flex items-start gap-2 text-xs text-text-subtle">
              <Info size={14} className="shrink-0 mt-0.5" />
              <span>
                Reportes de muestra. La generación dinámica de reportes (RF-15)
                a partir de la base de datos se implementa en la Fase 2.
              </span>
            </div>
          </Card>
        </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-start gap-2 text-[11px] text-text-subtle">
        <Ban size={13} className="shrink-0 mt-0.5" />
        <span>
          Vista de administrador del diseño (RF-12, RF-13, RF-15, RF-16). Las
          acciones son demostrativas; el control de acceso por rol y la
          persistencia se implementan en la Fase 2.
        </span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Users;
}) {
  return (
    <Card className="flex items-center gap-3">
      <div className="size-9 rounded-lg glass-accent flex items-center justify-center text-brand">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xs text-text-muted">{label}</div>
        <div className="num text-lg font-bold">{value}</div>
      </div>
    </Card>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
      <span className="text-text-muted">{label}</span>
      <span className="num font-medium">{value}</span>
    </div>
  );
}
