"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSessionStore } from "@/lib/hooks/useSession";
import { services } from "@/lib/services";

const schema = z.object({
  name: z.string().min(2, "Nombre muy corto."),
  email: z.string().email("Correo inválido."),
  password: z.string().min(6, "Mínimo 6 caracteres."),
});

export default function RegisterPage() {
  const router = useRouter();
  const refresh = useSessionStore((s) => s.refresh);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      await services.auth.register(parsed.data);
      await refresh();
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold">Crear cuenta</h1>
      <p className="text-xs text-text-muted">
        Te abrimos un wallet demo con $10,000 USD para que pruebes.
      </p>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">Nombre</label>
        <Input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Tu nombre"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">Correo</label>
        <Input
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="tu@correo.com"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">Contraseña</label>
        <Input
          type="password"
          required
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
          placeholder="Mínimo 6 caracteres"
        />
      </div>
      {error && (
        <div className="text-down text-sm bg-down-bg border border-down/30 rounded-md px-3 py-2">
          {error}
        </div>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creando…" : "Crear cuenta"}
      </Button>
      <p className="text-sm text-text-muted text-center">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="text-brand hover:underline">
          Ingresá
        </Link>
      </p>
    </form>
  );
}
