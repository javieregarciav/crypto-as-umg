import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
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
