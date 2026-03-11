import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export interface DailyData {
  date: string;
  value: number;
  avg: number;
}

export const DailyComposedChart: React.FC<{ data: DailyData[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={260}>
    <ComposedChart data={data}>
      <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
      <Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={2} dot={false} />
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
        </linearGradient>
      </defs>
    </ComposedChart>
  </ResponsiveContainer>
);
// Why: Composed charts show both daily values and trends in one view.
