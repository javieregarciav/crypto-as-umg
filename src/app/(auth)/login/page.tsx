"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSessionStore } from "@/lib/hooks/useSession";
import { services } from "@/lib/services";
import { DEMO_CREDENTIALS } from "@/lib/services/auth.local";

export default function LoginPage() {
  const router = useRouter();
  const refresh = useSessionStore((s) => s.refresh);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function fillDemo() {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await services.auth.login(email, password);
      await refresh();
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold">Iniciar sesión</h1>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">Correo</label>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-text-muted">Contraseña</label>
        <Input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      <div className="text-right -mt-1">
        <Link
          href="/forgot-password"
          className="text-xs text-text-muted hover:text-brand"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      {error && (
        <div className="text-down text-sm bg-down-bg border border-down/30 rounded-md px-3 py-2">
          {error}
        </div>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Ingresando…" : "Ingresar"}
      </Button>

      <div className="glass-subtle rounded-md p-3 text-xs text-text-muted space-y-2">
        <p>
          ¿Solo quieres echar un vistazo? Usa la cuenta demo:
          <br />
          <span className="text-text num">{DEMO_CREDENTIALS.email}</span> ·{" "}
          <span className="text-text num">{DEMO_CREDENTIALS.password}</span>
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={fillDemo}
        >
          Rellenar cuenta demo
        </Button>
      </div>

      <p className="text-sm text-text-muted text-center">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="text-brand hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}
