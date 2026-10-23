import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Wordmark fantasma editorial */}
      <span
        aria-hidden
        className="wordmark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26vw] -z-[5] select-none"
      >
        AGORA
      </span>

      <Link href="/" className="mb-8">
        <Logo className="text-3xl" markClassName="size-7" />
      </Link>
      <div className="w-full max-w-sm glass rounded-2xl p-7">
        {children}
      </div>
      <p className="text-xs text-text-subtle mt-6">
        Prototipo académico — UMG Facultad de Ingeniería en Sistemas
      </p>
    </div>
  );
}
