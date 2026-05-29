"use client";

import { useState } from "react";
import {
  BadgeCheck,
  IdCard,
  Info,
  ScanFace,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const STEPS = [
  { icon: IdCard, label: "Datos personales" },
  { icon: ScanFace, label: "Documento de identidad" },
  { icon: UserCheck, label: "Verificación facial" },
];

export default function KycPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-4 pt-10">
        <div className="mx-auto size-14 rounded-full glass-accent flex items-center justify-center text-up">
          <BadgeCheck size={28} />
        </div>
        <h1 className="text-2xl font-bold">Verificación enviada</h1>
        <p className="text-sm text-text-muted">
          Tu solicitud de verificación de identidad (KYC) quedó en revisión. Una
          vez aprobada se habilitarán las operaciones de compra y venta.
        </p>
        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-brand/15 text-brand">
          Estado: En revisión
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Verificación de identidad (KYC)</h1>
        <p className="text-sm text-text-muted">
          Requisito para habilitar operaciones de compra y venta (RF-16).
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between">
        {STEPS.map(({ icon: Icon, label }, i) => (
          <div key={label} className="flex-1 flex items-center">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className={cn(
                  "size-9 rounded-full flex items-center justify-center border transition",
                  i <= step
                    ? "glass-accent text-brand border-brand/40"
                    : "glass-subtle text-text-subtle border-transparent"
                )}
              >
                <Icon size={16} />
              </div>
              <span
                className={cn(
                  "text-[10px] text-center",
                  i <= step ? "text-text" : "text-text-subtle"
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 -mt-4",
                  i < step ? "bg-brand/40" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="space-y-4">
        <CardTitle>{STEPS[step].label}</CardTitle>

        {step === 0 && (
          <div className="space-y-3">
            <Field label="Nombre completo" placeholder="Como aparece en tu DPI" />
            <Field label="Número de DPI / documento" placeholder="0000 00000 0000" />
            <Field label="Fecha de nacimiento" placeholder="dd/mm/aaaa" />
            <Field label="País" placeholder="Guatemala" />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <DropZone label="Anverso del documento" />
            <DropZone label="Reverso del documento" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <DropZone label="Selfie sosteniendo tu documento" />
            <p className="text-xs text-text-muted">
              Asegúrate de que tu rostro y el documento se vean con claridad.
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {step > 0 && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setStep((s) => s - 1)}
            >
              Atrás
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button className="flex-1" onClick={() => setStep((s) => s + 1)}>
              Continuar
            </Button>
          ) : (
            <Button className="flex-1" onClick={() => setDone(true)}>
              Enviar verificación
            </Button>
          )}
        </div>
      </Card>

      <div className="flex items-start gap-2 text-[11px] text-text-subtle">
        <Info size={13} className="shrink-0 mt-0.5" />
        <span>
          KYC simulado con fines educativos — no se procesan ni almacenan
          documentos reales. La validación se implementa en la Fase 2.
        </span>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-text-muted">{label}</label>
      <Input placeholder={placeholder} />
    </div>
  );
}

function DropZone({ label }: { label: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-text-muted">{label}</label>
      <div className="glass-subtle rounded-md border border-dashed border-white/15 p-6 text-center text-xs text-text-subtle cursor-pointer hover:bg-white/5 transition">
        Arrastra una imagen o haz clic para subir
      </div>
    </div>
  );
}
