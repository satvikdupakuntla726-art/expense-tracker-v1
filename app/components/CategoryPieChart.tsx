"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Expense } from "@/lib/storage";
import GlassCard from "@/components/ui/GlassCard";

const COLORS = ["#10b981", "#6366f1", "#f43f5e", "#f59e42", "#0ea5e9", "#f472b6", "#facc15"];

export default function CategoryPieChart({ expenses }: { expenses: Expense[] }) {
  const data = Object.entries(
    expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.convertedAmount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, value]) => ({ name: category, value }));

  if (data.length === 0) return (
    <GlassCard className="flex-1"><div className="h-[220px] flex items-center justify-center"><span className="text-zinc-400">No category data</span></div></GlassCard>
  );

  return (
    <GlassCard className="flex-1">
      <h3 className="font-semibold mb-2 text-white">By Category</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, value }) => `${name}: ₹${value}`}
            isAnimationActive={true}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload.length) return null;
              const { name, value } = payload[0].payload;
              return (
                <div className="bg-zinc-900/90 text-white p-2 rounded shadow-lg">
                  <span className="font-bold">{name}</span>: ₹{value}
                </div>
              );
            }}
          />
          <Legend
            wrapperStyle={{ color: "#fff", fontWeight: "bold" }}
            iconType="circle"
            layout="horizontal"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
