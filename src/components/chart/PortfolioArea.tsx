"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import { fmtUSD } from "@/lib/utils";

// Forma normalizada (0..1) para simular la curva de 7 días del portafolio.
// El prototipo no guarda histórico real; la serie se deriva del valor actual.
const SHAPE = [
  0.3, 0.34, 0.32, 0.4, 0.45, 0.42, 0.5, 0.55, 0.52, 0.6, 0.58, 0.65, 0.63,
  0.7, 0.74, 0.72, 0.78, 0.82, 0.8, 0.86, 0.9, 0.88, 0.94, 1,
];

export function PortfolioArea({
  total,
  up = true,
  height = 120,
}: {
  total: number;
  up?: boolean;
  height?: number;
}) {
  const base = total * 0.92;
  const span = total * 0.12;
  const data = SHAPE.map((s, i) => ({ i, v: base + span * s }));
  const color = up ? "#3ee5a1" : "#f05d65";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="pa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.22} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
          <pattern
            id="pa-hatch"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeOpacity={0.14} strokeWidth="1.5" />
          </pattern>
        </defs>
        <YAxis hide domain={["dataMin", "dataMax"]} />
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
          labelFormatter={() => ""}
          formatter={(v) => [fmtUSD(Number(v)), "Valor"]}
        />
        <Area
          type="monotone"
          dataKey="v"
          stroke="none"
          fill="url(#pa-hatch)"
          isAnimationActive={false}
          tooltipType="none"
        />
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          fill="url(#pa)"
          activeDot={{ r: 4, fill: "#f4f4f5", stroke: color, strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
