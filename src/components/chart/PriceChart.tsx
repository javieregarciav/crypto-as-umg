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
  const color = up ? "#3ee5a1" : "#f05d65";
  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.22} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
          <pattern
            id="g-hatch"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeOpacity={0.14} strokeWidth="1.5" />
          </pattern>
        </defs>
        <XAxis
          dataKey="t"
          tick={{ fill: "#6b6b72", fontSize: 11 }}
          tickFormatter={(t) =>
            new Date(t).toLocaleDateString("es", {
              month: "short",
              day: "numeric",
            })
          }
          minTickGap={48}
          stroke="transparent"
          tickLine={false}
        />
        <YAxis
          dataKey="price"
          domain={["auto", "auto"]}
          tick={{ fill: "#6b6b72", fontSize: 11 }}
          tickFormatter={(v) => fmtPrice(v)}
          width={80}
          stroke="transparent"
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#f4f4f5",
            border: "none",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            padding: "4px 8px",
          }}
          itemStyle={{ color: "#0a0a0b" }}
          labelStyle={{ color: "#55555b" }}
          cursor={{ stroke: "rgba(62,229,161,0.35)", strokeWidth: 1 }}
          labelFormatter={(t) => new Date(t as number).toLocaleString("es")}
          formatter={(v) => [fmtPrice(Number(v)), "Precio"]}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="none"
          fill="url(#g-hatch)"
          isAnimationActive={false}
          tooltipType="none"
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={2}
          fill="url(#g)"
          activeDot={{ r: 4, fill: "#f4f4f5", stroke: color, strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
