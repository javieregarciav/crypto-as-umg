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
    <main className="relative min-h-screen overflow-hidden font-sans">
      {/* Un solo halo, muy sutil */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[640px] rounded-full bg-brand/[0.07] blur-[160px]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="font-display text-xl font-medium tracking-tight">
            Agora
          </span>
          <nav className="hidden md:flex items-center gap-9 text-sm text-text-muted">
            <a href="#monedas" className="hover:text-text transition">Mercado</a>
            <a href="#funciones" className="hover:text-text transition">Funcionalidades</a>
            <a href="#faq" className="hover:text-text transition">FAQ</a>
          </nav>
          <div className="flex items-center gap-1">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm text-text-muted hover:text-text px-3 py-2 transition"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium border border-white/15 hover:bg-white/5 px-4 py-2 rounded-full transition"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-5 pt-24 pb-14 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-text-subtle">
          Simulador educativo · Universidad Mariano Gálvez
        </span>
        <h1 className="font-display text-gradient text-5xl md:text-[3.75rem] leading-[1.05] font-medium tracking-tight mt-6 text-balance pb-1">
          Aprende a operar el mercado cripto sin arriesgar tu dinero
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto mt-7 leading-relaxed">
          Agora —del griego ἀγορά, «mercado»— es un simulador de compra y venta
          de criptomonedas con precios reales de CoinGecko. Practica con saldo
          virtual y entiende cómo funciona un exchange.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-brand text-white hover:bg-brand-hover font-medium px-6 py-3 rounded-full transition"
          >
            Empieza gratis
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/market"
            className="inline-flex items-center justify-center gap-2 border border-white/15 hover:bg-white/5 px-6 py-3 rounded-full font-medium text-text-muted hover:text-text transition"
          >
            Ver mercado en vivo
          </Link>
        </div>
      </section>

      {/* Mockup del producto */}
      <section className="max-w-xl mx-auto px-5 pb-28">
        <DashboardMock />
      </section>

      {/* Strip de monedas */}
      <section id="monedas" className="max-w-3xl mx-auto px-5 pb-28 text-center">
        <h2 className="font-display text-gradient text-2xl md:text-3xl font-medium tracking-tight pb-1">
          Las principales criptomonedas, en tiempo real
        </h2>
        <p className="text-text-muted mt-3">
          Precios y variación del día en vivo desde la API de CoinGecko.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5 mt-9">
          {COINS.map((c) => (
            <CoinChip key={c.sym} {...c} />
          ))}
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funciones" className="max-w-5xl mx-auto px-5 pb-28">
        <div className="text-center mb-14">
          <h2 className="font-display text-gradient text-3xl md:text-4xl font-medium tracking-tight pb-1">
            Todo lo que necesitas para practicar
          </h2>
          <p className="text-text-muted mt-4 max-w-lg mx-auto">
            Las mismas piezas de un exchange real, en un entorno seguro y
            educativo.
          </p>
        </div>
        <div className="grid gap-px bg-border/60 rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Feature key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-2xl mx-auto px-5 pb-28">
        <h2 className="font-display text-gradient text-3xl font-medium tracking-tight text-center mb-12 pb-1">
          Preguntas frecuentes
        </h2>
        <div className="divide-y divide-border/60 border-y border-border/60">
          {FAQS.map((f) => (
            <Faq key={f.q} {...f} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-3xl mx-auto px-5 pb-24 text-center">
        <h2 className="font-display text-gradient text-3xl md:text-4xl font-medium tracking-tight pb-1">
          Tu cuenta demo con $10,000 USD virtuales te espera
        </h2>
        <p className="text-text-muted mt-4">
          Sin tarjetas ni dinero real. Solo aprende.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-2 bg-brand text-white hover:bg-brand-hover font-medium px-6 py-3 rounded-full transition mt-8"
        >
          Crea tu cuenta
          <ArrowRight size={16} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text-subtle">
          <span className="font-display font-medium text-text">Agora</span>
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
    desc: "Top criptomonedas con precio, variación 24h y gráficos que se actualizan cada minuto desde CoinGecko.",
  },
  {
    icon: TrendingUp,
    title: "Compra y venta",
    desc: "Órdenes simuladas con tu saldo virtual y su impacto inmediato en el portafolio.",
  },
  {
    icon: PieChart,
    title: "Portafolio y P/L",
    desc: "Distribución de tus activos y rendimiento con ganancia o pérdida por cada moneda.",
  },
  {
    icon: History,
    title: "Historial",
    desc: "Cada operación queda registrada con fecha, tipo, monto y precio, con filtros por tipo.",
  },
  {
    icon: Bell,
    title: "Alertas de precio",
    desc: "Umbrales para avisarte cuando una cripto sube o baja de un precio objetivo.",
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
    a: "Para cualquier persona que quiera entender cómo funciona la compra y venta de criptomonedas antes de operar con dinero real. Su fin es exclusivamente educativo.",
  },
  {
    q: "¿Qué es una criptomoneda?",
    a: "Es una forma de dinero digital que se intercambia por internet, sin existencia física. La primera fue Bitcoin, creada en 2009 bajo el seudónimo de Satoshi Nakamoto.",
  },
];

/* ---------- Componentes ---------- */

function CoinChip({ sym, name }: { sym: string; name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border/80 pl-1.5 pr-4 py-1.5">
      <span className="size-6 rounded-full flex items-center justify-center text-[9px] font-semibold bg-white/[0.06] text-text-muted shrink-0">
        {sym.slice(0, 3)}
      </span>
      <span className="text-sm">{name}</span>
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
    <div className="bg-bg p-6">
      <Icon size={20} className="text-brand" strokeWidth={1.5} />
      <h3 className="font-display font-medium mt-4">{title}</h3>
      <p className="text-sm text-text-muted mt-2 leading-relaxed">{desc}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="py-5 group">
      <summary className="flex items-center justify-between cursor-pointer list-none font-medium">
        {q}
        <ChevronDown
          size={18}
          className="text-text-subtle transition group-open:rotate-180 shrink-0 ml-3"
        />
      </summary>
      <p className="text-sm text-text-muted mt-3 leading-relaxed">{a}</p>
    </details>
  );
}

function DashboardMock() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-1.5 mb-6">
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="ml-3 text-xs text-text-subtle">Agora · Dashboard</span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs text-text-muted">Valor del portafolio</div>
          <div className="num text-4xl font-semibold mt-1.5">$12,840.55</div>
        </div>
        <span className="text-sm font-medium text-up">+4.21%</span>
      </div>

      <svg
        viewBox="0 0 320 80"
        className="w-full h-20 mt-6"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
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
          strokeWidth="1.5"
        />
      </svg>

      <div className="space-y-1 mt-5">
        {[
          { sym: "BTC", name: "Bitcoin", val: "$6,420.10", chg: "+2.4%", up: true },
          { sym: "ETH", name: "Ethereum", val: "$4,180.32", chg: "+5.1%", up: true },
          { sym: "SOL", name: "Solana", val: "$2,240.13", chg: "-1.2%", up: false },
        ].map((h) => (
          <div key={h.sym} className="flex items-center gap-3 py-2">
            <span className="size-8 rounded-full flex items-center justify-center text-[10px] font-semibold bg-white/[0.06] text-text-muted">
              {h.sym}
            </span>
            <div className="flex-1">
              <div className="text-sm">{h.name}</div>
              <div className="text-xs text-text-subtle uppercase">{h.sym}</div>
            </div>
            <div className="text-right">
              <div className="num text-sm">{h.val}</div>
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
