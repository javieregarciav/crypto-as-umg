"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { fmtUSD } from "@/lib/utils";

const COLORS = [
  "#0ea271",
  "#14b8a6",
  "#3b82f6",
  "#2dd4bf",
  "#f97316",
  "#ec4899",
  "#06b6d4",
  "#eab308",
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
          stroke="#0a0a0b"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#121315",
            border: "1px solid #26282c",
            borderRadius: 6,
            fontSize: 12,
          }}
          formatter={(v) => [fmtUSD(Number(v)), "Valor"]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
