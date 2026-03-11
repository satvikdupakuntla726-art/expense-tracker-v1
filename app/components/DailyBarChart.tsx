"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Expense } from "@/lib/storage";
import GlassCard from "@/components/ui/GlassCard";

export default function DailyBarChart({ expenses }: { expenses: Expense[] }) {
  // Group by date
  const data = Object.entries(
    expenses.reduce((acc, exp) => {
      acc[exp.date] = (acc[exp.date] || 0) + exp.convertedAmount;
      return acc;
    }, {} as Record<string, number>)
  ).map(([date, value]) => ({ date, value }));

  if (data.length === 0) return (
    <GlassCard className="flex-1"><div className="h-[220px] flex items-center justify-center"><span className="text-zinc-400">No daily data</span></div></GlassCard>
  );

  return (
    <GlassCard className="flex-1">
      <h3 className="font-semibold mb-2 text-white">By Day</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" fontSize={12} stroke="#cbd5e1" />
          <YAxis fontSize={12} stroke="#cbd5e1" />
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload.length) return null;
              const { date, value } = payload[0].payload;
              return (
                <div className="bg-zinc-900/90 text-white p-2 rounded shadow-lg">
                  <span className="font-bold">{date}</span>: ₹{value}
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
          <Bar dataKey="value" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
