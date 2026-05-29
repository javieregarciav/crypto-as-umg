import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <span className="text-brand text-xs uppercase tracking-[0.3em] mb-4">
        UMG — Proyecto Final
      </span>
      <h1 className="text-5xl md:text-6xl font-bold mb-3">
        <span className="text-brand">Agora</span>
      </h1>
      <p className="text-xs text-text-subtle italic mb-5">
        del griego ἀγορά — «mercado»
      </p>
      <p className="text-text-muted max-w-xl mb-8">
        Simulador de compra y venta de criptomonedas con precios reales de
        CoinGecko. Opera sin riesgo, aprende cómo funciona un exchange.
      </p>
      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-md bg-brand text-black font-semibold hover:bg-brand-hover transition"
        >
          Entrar al simulador
        </Link>
        <Link
          href="/market"
          className="px-6 py-3 rounded-md border border-border hover:bg-bg-hover transition"
        >
          Ver mercado
        </Link>
      </div>
    </main>
  );
}
