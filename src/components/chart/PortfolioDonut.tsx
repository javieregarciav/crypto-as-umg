"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { fmtUSD } from "@/lib/utils";

const COLORS = [
  "#3ee5a1",
  "#8b7cf6",
  "#5ac8fa",
  "#f5a524",
  "#f05d65",
  "#2fbf8f",
  "#c084fc",
  "#a3a3ab",
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
          stroke="#131315"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
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
          formatter={(v) => [fmtUSD(Number(v)), "Valor"]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
