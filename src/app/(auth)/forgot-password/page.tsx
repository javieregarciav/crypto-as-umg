"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto size-12 rounded-full glass-accent flex items-center justify-center text-brand">
          <MailCheck size={22} />
        </div>
        <h1 className="text-xl font-semibold">Revisa tu correo</h1>
        <p className="text-sm text-text-muted">
          Si <span className="text-text">{email || "tu correo"}</span> está
          registrado, enviamos un enlace para restablecer tu contraseña. El
          enlace expira en 24 horas.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-brand hover:underline"
        >
          <ArrowLeft size={14} /> Volver a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Recuperar contraseña</h1>
        <p className="text-sm text-text-muted mt-1">
          Te enviaremos un enlace de recuperación con vigencia de 24 horas.
        </p>
      </div>
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
      <Button type="submit" className="w-full">
        Enviar enlace de recuperación
      </Button>
      <p className="text-sm text-text-muted text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-brand hover:underline"
        >
          <ArrowLeft size={14} /> Volver a iniciar sesión
        </Link>
      </p>
    </form>
  );
}
