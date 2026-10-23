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
        "num inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-semibold",
        up ? "bg-up-bg text-up" : "bg-down-bg text-down",
        className
      )}
    >
      {fmtPct(pct)}
    </span>
  );
}
