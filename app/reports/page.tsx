"use client";
import { useEffect, useState } from "react";
import { getExpenses, Expense } from "@/lib/storage";
import { DonutChart } from "@/components/analytics/DonutChart";
import { DailyComposedChart } from "@/components/analytics/ComposedChart";
import { DailyInsightCard } from "@/components/analytics/DailyInsightCard";
import { exportToCSV } from "@/utils/exportToCSV";
import { Button } from "@/components/ui/Button";

export default function ReportsPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  useEffect(() => { setExpenses(getExpenses()); }, []);

  // KPIs
  const total = expenses.reduce((sum, e) => sum + e.convertedAmount, 0);
  const byCat: Record<string, number> = {};
  expenses.forEach(e => { byCat[e.category] = (byCat[e.category] || 0) + e.convertedAmount; });
  const topCat = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const today = (() => {
    const d = new Date().toISOString().slice(0, 10);
    return expenses.filter(e => e.date.startsWith(d)).reduce((sum, e) => sum + e.convertedAmount, 0);
  })();
  const avg = expenses.length ? total / new Set(expenses.map(e => e.date)).size : 0;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">📊 Reports & Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-xl bg-slate-900/80 border border-white/10 p-6 text-white shadow flex flex-col items-center">
          <div className="text-lg font-semibold mb-1">Total Spend</div>
          <div className="text-2xl font-bold">${total.toFixed(2)}</div>
        </div>
        <div className="rounded-xl bg-slate-900/80 border border-white/10 p-6 text-white shadow flex flex-col items-center">
          <div className="text-lg font-semibold mb-1">Top Category</div>
          <div className="text-2xl font-bold">{topCat}</div>
        </div>
        <DailyInsightCard today={today} avg={avg} />
      </div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => exportToCSV(expenses, "expenses-report.csv")}>Export CSV</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2 text-white">By Category</h3>
          <DonutChart data={getCategoryDonutData(expenses)} />
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-white">By Day (7d Avg)</h3>
          <DailyComposedChart data={getDailyComposedData(expenses)} />
        </div>
      </div>
    </div>
  );
}

function getCategoryDonutData(expenses: Expense[]) {
  const byCat: Record<string, number> = {};
  expenses.forEach(e => {
    byCat[e.category] = (byCat[e.category] || 0) + e.convertedAmount;
  });
  return Object.entries(byCat).map(([name, value]) => ({ name, value }));
}

function getDailyComposedData(expenses: Expense[]) {
  const byDate: Record<string, number> = {};
  expenses.forEach(e => {
    byDate[e.date] = (byDate[e.date] || 0) + e.convertedAmount;
  });
  const dates = Object.keys(byDate).sort();
  return dates.map((date, idx, arr) => {
    const value = byDate[date];
    const window = arr.slice(Math.max(0, idx - 6), idx + 1);
    const avg = window.reduce((sum, d) => sum + byDate[d], 0) / window.length;
    return { date, value, avg: Math.round(avg * 100) / 100 };
  });
}
