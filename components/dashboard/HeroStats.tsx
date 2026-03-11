import React from "react";
import MetricCard from "@/components/ui/MetricCard";
import { DollarSign, TrendingUp, RefreshCw } from "lucide-react";
import { Expense } from "@/lib/storage";

function getTotalSpending(expenses: Expense[]) {
  return expenses.reduce((sum, e) => sum + e.convertedAmount, 0).toFixed(2);
}

function getMostExpensiveCategory(expenses: Expense[]) {
  if (expenses.length === 0) return "-";
  const byCat: Record<string, number> = {};
  expenses.forEach(e => {
    byCat[e.category] = (byCat[e.category] || 0) + e.convertedAmount;
  });
  return Object.entries(byCat).sort((a, b) => b[1] - a[1])[0][0];
}

export default function HeroStats({
  expenses,
  currencyStatus,
  baseCurrency = "USD"
}: {
  expenses: Expense[];
  currencyStatus: string;
  baseCurrency?: string;
}) {
  // Proactive tip
  const mostCat = getMostExpensiveCategory(expenses);
  const tip = expenses.length > 0 ? `Tip: You spent most on ${mostCat}!` : "Add your first expense to see insights.";
  const currencySymbol = baseCurrency === "INR" ? "₹" : "$";
  return (
    <>
      <MetricCard
        label={`Total Spending (${baseCurrency})`}
        value={`${currencySymbol}${getTotalSpending(expenses)}`}
        icon={baseCurrency === "INR" ? <span className="text-2xl">₹</span> : <DollarSign size={24} />}
        accent={baseCurrency === "INR" ? "amber" : "emerald"}
      />
      <MetricCard
        label="Most Expensive Category"
        value={mostCat}
        icon={<TrendingUp size={24} />}
        accent="indigo"
      />
      <MetricCard
        label="Currency Exchange Status"
        value={currencyStatus}
        icon={<RefreshCw size={24} />}
        accent="sky"
      />
    </>
  );
}
