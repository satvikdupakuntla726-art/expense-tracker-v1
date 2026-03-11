import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#10b981", "#6366f1", "#f59e42", "#f43f5e", "#a21caf"];

export interface DonutData {
  name: string;
  value: number;
}

export const DonutChart: React.FC<{ data: DonutData[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={220}>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#10b981"
        label
      >
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);
// Why: Donut charts are visually appealing and easy to read.
