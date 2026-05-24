"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { fmtUSD } from "@/lib/utils";

const COLORS = [
  "#f0b90b",
  "#0ecb81",
  "#3b82f6",
  "#a855f7",
  "#f97316",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];

export interface DonutDatum {
  name: string;
  value: number;
}

export function PortfolioDonut({ data }: { data: DonutDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
          stroke="#0b0e11"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#161a1e",
            border: "1px solid #2b3139",
            borderRadius: 6,
            fontSize: 12,
          }}
          formatter={(v) => [fmtUSD(Number(v)), "Valor"]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
