import { cn } from "@/lib/utils";

export function AgoraMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 20 L12 4 L20 20"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14 H16"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display font-semibold tracking-tight",
        className
      )}
    >
      <AgoraMark className={cn("text-brand", markClassName)} />
      <span>Agora</span>
    </span>
  );
}
