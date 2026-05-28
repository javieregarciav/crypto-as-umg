"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CoinChartPoint } from "@/lib/domain/types";
import { fmtPrice } from "@/lib/utils";

export function PriceChart({
  data,
  up,
}: {
  data: CoinChartPoint[];
  up: boolean;
}) {
  const color = up ? "#22c55e" : "#ef4444";
  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="t"
          tick={{ fill: "#8b8d92", fontSize: 11 }}
          tickFormatter={(t) =>
            new Date(t).toLocaleDateString("es", {
              month: "short",
              day: "numeric",
            })
          }
          minTickGap={48}
          stroke="#26282c"
        />
        <YAxis
          dataKey="price"
          domain={["auto", "auto"]}
          tick={{ fill: "#8b8d92", fontSize: 11 }}
          tickFormatter={(v) => fmtPrice(v)}
          width={80}
          stroke="#26282c"
        />
        <Tooltip
          contentStyle={{
            background: "#121315",
            border: "1px solid #2b3139",
            borderRadius: 6,
            fontSize: 12,
          }}
          labelFormatter={(t) => new Date(t as number).toLocaleString("es")}
          formatter={(v) => [fmtPrice(Number(v)), "Precio"]}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fill="url(#g)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
