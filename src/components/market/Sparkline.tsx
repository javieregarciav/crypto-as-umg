"use client";

export function Sparkline({
  data,
  up,
  width = 120,
  height = 36,
}: {
  data: number[];
  up: boolean;
  width?: number;
  height?: number;
}) {
  if (!data || data.length < 2) {
    return <div style={{ width, height }} />;
  }
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const color = up ? "#0ecb81" : "#f6465d";
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        points={points}
      />
    </svg>
  );
}
