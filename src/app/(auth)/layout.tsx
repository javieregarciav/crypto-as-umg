import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Orbes de color: el liquid glass los difumina por detrás */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/3 size-[380px] rounded-full bg-[#7e22ce]/40 blur-[120px]" />
        <div className="absolute -bottom-24 right-1/4 size-[340px] rounded-full bg-[#d946ef]/25 blur-[120px]" />
      </div>

      {/* Wordmark fantasma editorial */}
      <span
        aria-hidden
        className="wordmark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26vw] -z-[5] select-none"
      >
        AGORA
      </span>

      <Link href="/" className="text-3xl font-bold mb-8">
        <span className="text-brand">Agora</span>
      </Link>
      <div className="w-full max-w-sm glass-strong rounded-2xl p-6">
        {children}
      </div>
      <p className="text-xs text-text-subtle mt-6">
        Prototipo académico — UMG Facultad de Ingeniería en Sistemas
      </p>
    </div>
  );
}
