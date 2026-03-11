import { ResponsiveContainer, LineChart, Line } from "recharts";

export const Sparkline: React.FC<{ data: { value: number }[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={40}>
    <LineChart data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke="#10b981"
        strokeWidth={2}
        dot={false}
        isAnimationActive
      />
    </LineChart>
  </ResponsiveContainer>
);
// Why: Sparklines show trends at a glance, ideal for dashboards.
