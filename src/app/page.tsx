import Link from "next/link";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  History,
  LineChart,
  PieChart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Orbes de color difuminados al fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 size-[560px] rounded-full bg-[#7e22ce]/30 blur-[140px]" />
        <div className="absolute top-[60%] -right-24 size-[380px] rounded-full bg-[#d946ef]/15 blur-[130px]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 glass-strong !border-x-0 !border-t-0 !rounded-none">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="text-xl font-bold">
            <span className="text-brand">Agora</span>
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-text-muted">
            <a href="#monedas" className="hover:text-text transition">Mercado</a>
            <a href="#funciones" className="hover:text-text transition">Funcionalidades</a>
            <a href="#faq" className="hover:text-text transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm text-text-muted hover:text-text px-3 py-2 transition"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-brand text-white hover:bg-brand-hover px-4 py-2 rounded-full transition"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-5 pt-20 pb-12 text-center">
        <span className="inline-flex items-center gap-2 text-xs text-text-muted glass-subtle rounded-full px-3 py-1">
          <span className="size-1.5 rounded-full bg-up animate-pulse" />
          Simulador educativo · Universidad Mariano Gálvez
        </span>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mt-6 text-balance">
          Aprende a operar el mercado cripto{" "}
          <span className="text-brand">sin arriesgar tu dinero</span>
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto mt-6">
          Agora —del griego ἀγορά, «mercado»— es un simulador de compra y venta
          de criptomonedas con precios reales de CoinGecko. Practica con un saldo
          virtual y entiende cómo funciona un exchange.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-brand text-white hover:bg-brand-hover font-semibold px-6 py-3 rounded-full transition"
          >
            Empezar gratis
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/market"
            className="glass glass-hover inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-text-muted hover:text-text"
          >
            <LineChart size={16} />
            Ver mercado en vivo
          </Link>
        </div>
      </section>

      {/* Mockup del producto */}
      <section className="max-w-2xl mx-auto px-5 pb-20">
        <DashboardMock />
      </section>

      {/* Strip de monedas */}
      <section id="monedas" className="max-w-4xl mx-auto px-5 pb-24 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Las principales criptomonedas, en tiempo real
        </h2>
        <p className="text-text-muted mt-2">
          Precios y variación del día obtenidos en vivo desde la API de CoinGecko.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {COINS.map((c) => (
            <CoinChip key={c.sym} {...c} />
          ))}
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funciones" className="max-w-5xl mx-auto px-5 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Todo lo que necesitas para practicar
          </h2>
          <p className="text-text-muted mt-3 max-w-xl mx-auto">
            Las mismas piezas de un exchange real, en un entorno seguro y
            educativo.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Feature key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-2xl mx-auto px-5 pb-24">
        <h2 className="text-3xl font-bold text-center mb-10">
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <Faq key={f.q} {...f} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-3xl mx-auto px-5 pb-20">
        <div className="glass-accent rounded-3xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Tu cuenta demo con $10,000 USD virtuales te espera
          </h2>
          <p className="text-text-muted mt-3">
            Sin tarjetas, sin dinero real. Solo aprende.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-brand text-white hover:bg-brand-hover font-semibold px-6 py-3 rounded-full transition mt-6"
          >
            Crear mi cuenta
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text-subtle">
          <span className="font-bold text-text">
            <span className="text-brand">Agora</span>
          </span>
          <span>
            Proyecto Final · Facultad de Ingeniería en Sistemas · UMG · 2026
          </span>
        </div>
      </footer>
    </main>
  );
}

/* ---------- Datos ---------- */

const COINS = [
  { sym: "BTC", name: "Bitcoin" },
  { sym: "ETH", name: "Ethereum" },
  { sym: "SOL", name: "Solana" },
  { sym: "BNB", name: "BNB" },
  { sym: "XRP", name: "XRP" },
  { sym: "ADA", name: "Cardano" },
  { sym: "DOGE", name: "Dogecoin" },
  { sym: "USDC", name: "USD Coin" },
];

const FEATURES = [
  {
    icon: LineChart,
    title: "Mercado en vivo",
    desc: "Top criptomonedas con precio, variación 24h y gráficos actualizados cada minuto desde CoinGecko.",
  },
  {
    icon: TrendingUp,
    title: "Compra y venta",
    desc: "Ejecuta órdenes simuladas con tu saldo virtual y observa el impacto en tu portafolio.",
  },
  {
    icon: PieChart,
    title: "Portafolio y P/L",
    desc: "Visualiza la distribución de tus activos y el rendimiento con ganancia o pérdida por moneda.",
  },
  {
    icon: History,
    title: "Historial",
    desc: "Cada operación queda registrada con fecha, tipo, monto y precio, con filtros por tipo.",
  },
  {
    icon: Bell,
    title: "Alertas de precio",
    desc: "Configura umbrales para enterarte cuando una cripto suba o baje de un precio objetivo.",
  },
  {
    icon: ShieldCheck,
    title: "Sin riesgo real",
    desc: "Operas con dinero ficticio: aprendes la dinámica del mercado sin exposición financiera.",
  },
];

const FAQS = [
  {
    q: "¿Necesito dinero real para usar Agora?",
    a: "No. Al registrarte recibes un saldo virtual de $10,000 USD para practicar. Nunca se usa ni se solicita dinero real.",
  },
  {
    q: "¿Los precios son reales?",
    a: "Sí. Los precios y variaciones se obtienen en vivo desde la API pública de CoinGecko, con refresco continuo.",
  },
  {
    q: "¿Para quién es este simulador?",
    a: "Para cualquier persona que quiera entender cómo funciona la compra y venta de criptomonedas antes de operar con dinero real. Tiene un fin exclusivamente educativo.",
  },
  {
    q: "¿Qué es una criptomoneda?",
    a: "Es una forma de dinero digital que se intercambia por internet, sin existencia física. La primera fue Bitcoin, creada en 2009 bajo el seudónimo de Satoshi Nakamoto.",
  },
];

/* ---------- Componentes ---------- */

function CoinChip({ sym, name }: { sym: string; name: string }) {
  return (
    <div className="glass glass-hover flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5">
      <span className="size-7 rounded-full flex items-center justify-center text-[10px] font-bold bg-brand/15 text-brand shrink-0">
        {sym.slice(0, 3)}
      </span>
      <span className="text-sm font-medium">{name}</span>
      <span className="text-xs text-text-subtle uppercase">{sym}</span>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof LineChart;
  title: string;
  desc: string;
}) {
  return (
    <div className="glass glass-hover rounded-2xl p-5">
      <div className="size-10 rounded-xl glass-accent flex items-center justify-center text-brand mb-4">
        <Icon size={20} />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-text-muted mt-1.5 leading-relaxed">{desc}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="glass rounded-xl px-5 py-4 group">
      <summary className="flex items-center justify-between cursor-pointer list-none font-medium">
        {q}
        <ChevronDown
          size={18}
          className="text-text-muted transition group-open:rotate-180 shrink-0 ml-3"
        />
      </summary>
      <p className="text-sm text-text-muted mt-3 leading-relaxed">{a}</p>
    </details>
  );
}

function DashboardMock() {
  return (
    <div className="glass-strong rounded-3xl p-6 shadow-2xl">
      {/* fake window dots */}
      <div className="flex items-center gap-1.5 mb-5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-xs text-text-subtle">Agora · Dashboard</span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs text-text-muted">Valor del portafolio</div>
          <div className="num text-4xl font-bold mt-1">$12,840.55</div>
        </div>
        <span className="text-sm font-semibold text-up bg-up-bg px-2.5 py-1 rounded-md">
          +4.21%
        </span>
      </div>

      {/* mini chart */}
      <svg viewBox="0 0 320 80" className="w-full h-20 mt-5" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 60 L40 52 L80 56 L120 38 L160 44 L200 26 L240 30 L280 16 L320 20 L320 80 L0 80 Z"
          fill="url(#g)"
        />
        <path
          d="M0 60 L40 52 L80 56 L120 38 L160 44 L200 26 L240 30 L280 16 L320 20"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
        />
      </svg>

      {/* holdings */}
      <div className="space-y-2 mt-4">
        {[
          { sym: "BTC", name: "Bitcoin", val: "$6,420.10", chg: "+2.4%", up: true },
          { sym: "ETH", name: "Ethereum", val: "$4,180.32", chg: "+5.1%", up: true },
          { sym: "SOL", name: "Solana", val: "$2,240.13", chg: "-1.2%", up: false },
        ].map((h) => (
          <div
            key={h.sym}
            className="flex items-center gap-3 glass-subtle rounded-lg px-3 py-2"
          >
            <span className="size-8 rounded-full flex items-center justify-center text-[10px] font-bold bg-brand/15 text-brand">
              {h.sym}
            </span>
            <div className="flex-1">
              <div className="text-sm font-medium">{h.name}</div>
              <div className="text-xs text-text-subtle uppercase">{h.sym}</div>
            </div>
            <div className="text-right">
              <div className="num text-sm font-medium">{h.val}</div>
              <div className={`num text-xs ${h.up ? "text-up" : "text-down"}`}>
                {h.chg}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
