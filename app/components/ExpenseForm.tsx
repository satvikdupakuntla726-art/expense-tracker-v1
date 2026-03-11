"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addExpense, Expense } from "@/lib/storage";
import { convertCurrency, getSupportedCurrencies } from "@/lib/currency";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

const categories = [
  "Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"
];

export default function ExpenseForm({
  baseCurrency = "USD",
  onAdd
}: {
  baseCurrency?: string;
  onAdd: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [currencies, setCurrencies] = useState<string[]>(["USD"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getSupportedCurrencies().then(setCurrencies).catch(() => setCurrencies(["USD"]));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      const convertedAmount = await convertCurrency(Number(amount), currency, baseCurrency);
      const expense: Expense = {
        id: uuidv4(),
        originalAmount: Number(amount),
        originalCurrency: currency,
        convertedAmount,
        baseCurrency,
        category,
        date,
      };
      addExpense(expense);
      setAmount("");
      setCurrency(baseCurrency);
      setCategory(categories[0]);
      setDate(new Date().toISOString().slice(0, 10));
      onAdd();
    } catch {
      setError("Currency conversion failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card p-4 rounded-lg shadow flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="input input-bordered flex-1"
          required
        />
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="input input-bordered"
        >
          {currencies.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="input input-bordered flex-1"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="input input-bordered"
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        type="submit"
        className="btn btn-primary flex items-center gap-2"
        disabled={loading}
      >
        <Plus size={18} /> Add Expense
      </Button>
    </form>
  );
}
