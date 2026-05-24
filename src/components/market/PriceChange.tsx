import { cn, fmtPct } from "@/lib/utils";

export function PriceChange({
  pct,
  className,
}: {
  pct: number;
  className?: string;
}) {
  const up = pct >= 0;
  return (
    <span
      className={cn(
        "num text-sm font-medium",
        up ? "text-up" : "text-down",
        className
      )}
    >
      {fmtPct(pct)}
    </span>
  );
}
