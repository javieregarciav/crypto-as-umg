import Link from "next/link";
import { ArrowRight, LineChart } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Orbes de color: el liquid glass los difumina por detrás */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 size-[420px] rounded-full bg-[#7e22ce]/40 blur-[120px]" />
        <div className="absolute top-1/3 -right-20 size-[360px] rounded-full bg-[#a855f7]/30 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 size-[400px] rounded-full bg-[#d946ef]/20 blur-[130px]" />
      </div>

      {/* Wordmark fantasma editorial */}
      <span
        aria-hidden
        className="wordmark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[24vw] -z-[5] select-none"
      >
        AGORA
      </span>

      <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-xl w-full text-center">
        <span className="text-brand text-xs uppercase tracking-[0.3em]">
          UMG — Proyecto Final
        </span>
        <h1 className="text-6xl md:text-7xl font-black tracking-tight mt-4">
          <span className="text-brand">Agora</span>
        </h1>
        <p className="text-xs text-text-subtle italic mt-2">
          del griego ἀγορά — «mercado»
        </p>
        <p className="text-text-muted mt-6 mb-8">
          Simulador de compra y venta de criptomonedas con precios reales de
          CoinGecko. Opera sin riesgo, aprende cómo funciona un exchange.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="glass-accent glass-hover inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-text"
          >
            Entrar al simulador
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/market"
            className="glass glass-hover inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-text-muted hover:text-text"
          >
            <LineChart size={16} />
            Ver mercado
          </Link>
        </div>
      </div>

      <p className="text-[10px] text-text-subtle mt-8">
        Prototipo académico — UMG Facultad de Ingeniería en Sistemas
      </p>
    </main>
  );
}
