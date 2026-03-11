"use client";
import React, { useState, useEffect, useRef } from "react";
import ExpenseForm from "@/components/forms/ExpenseForm";
import FABDock from "@/components/ui/FABDock";
import PocketMoneyCard from "@/components/dashboard/PocketMoneyCard";
import Modal from "@/components/ui/Modal";
import ExpenseList from "./components/ExpenseList";
import { DailyComposedChart } from "@/components/analytics/ComposedChart";
import { DonutChart } from "@/components/analytics/DonutChart";
import { exportToCSV } from "@/utils/exportToCSV";
import { Button } from "@/components/ui/Button";
import HeroStats from "@/components/dashboard/HeroStats";
import { getExpenses, Expense } from "@/lib/storage";
import { fetchRates } from "@/lib/currency";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currencyStatus, setCurrencyStatus] = useState("Loading...");
  const isMounted = useRef(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pocketMoney, setPocketMoney] = useState(10000); // default value, can persist to localStorage

  // Calculate total spending and remaining
  const totalSpending = React.useMemo(
    () => expenses.reduce((sum, e) => sum + e.convertedAmount, 0),
    [expenses]
  );
  const remaining = React.useMemo(
    () => pocketMoney - totalSpending,
    [pocketMoney, totalSpending]
  );

  function refresh() {
    setExpenses(getExpenses());
  }

  useEffect(() => {
    refresh();
    fetchRates().then(() => setCurrencyStatus("Live"), () => setCurrencyStatus("Offline"));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 relative pb-32">
      {/* Full-width Welcome Banner */}
      <div className="w-full">
        <div className="mb-0 rounded-xl bg-gradient-to-r from-emerald-500/60 via-indigo-500/40 to-zinc-800/80 p-4 text-white font-bold text-lg shadow-lg flex items-center gap-3 animate-pulse">
          <span role="img" aria-label="motivation" className="text-2xl">🚀</span>
          Welcome! Track your expenses, visualize your spending, and get actionable insights. <span className="ml-2 text-emerald-200">Stay proactive!</span>
        </div>
      </div>
      {/* Unified Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Featured Pocket Money Card */}
        <PocketMoneyCard
          pocketMoney={pocketMoney}
          setPocketMoney={setPocketMoney}
          remaining={remaining}
          className="order-1 lg:order-1 border-2 border-teal-400/80 shadow-[0_0_16px_2px_rgba(45,212,191,0.4)]"
        />
        {/* Standard Metric Cards */}
        <HeroStats expenses={expenses} currencyStatus={currencyStatus} baseCurrency="USD" />
      </div>
      <div className="md:col-span-8 flex flex-col gap-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Expenses</h2>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
            onClick={() => exportToCSV(expenses, "expenses.csv")}
          >
            Export CSV
          </Button>
        </div>
        <ExpenseList expenses={expenses} onDelete={refresh} />
      </div>
      <div className="md:col-span-4 flex flex-col gap-6">
        {/* Category Donut Chart */}
        <div className="flex-1">
          <h3 className="font-semibold mb-2 text-white">By Category</h3>
          <DonutChart data={getCategoryDonutData(expenses)} />
        </div>
        {/* Daily Composed Chart */}
        <div className="flex-1">
          <h3 className="font-semibold mb-2 text-white">By Day (7d Avg)</h3>
          <DailyComposedChart data={getDailyComposedData(expenses)} />
        </div>
      </div>
      {/* Centered FAB Dock */}
      <FABDock onClick={() => setModalOpen(true)} />
      {/* Modal for Add Expense */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ExpenseForm baseCurrency="USD" onAdd={() => { setModalOpen(false); refresh(); }} />
      </Modal>
    </div>
  );
}

// --- Analytics Data Helpers ---
function getCategoryDonutData(expenses: Expense[]) {
  const byCat: Record<string, number> = {};
  expenses.forEach(e => {
    byCat[e.category] = (byCat[e.category] || 0) + e.convertedAmount;
  });
  return Object.entries(byCat).map(([name, value]) => ({ name, value }));
}

function getDailyComposedData(expenses: Expense[]) {
  // Group by date
  const byDate: Record<string, number> = {};
  expenses.forEach(e => {
    byDate[e.date] = (byDate[e.date] || 0) + e.convertedAmount;
  });
  const dates = Object.keys(byDate).sort();
  // Compute 7-day moving average
  const result = dates.map((date, idx, arr) => {
    const value = byDate[date];
    const window = arr.slice(Math.max(0, idx - 6), idx + 1);
    const avg = window.reduce((sum, d) => sum + byDate[d], 0) / window.length;
    return { date, value, avg: Math.round(avg * 100) / 100 };
  });
  return result;
}
