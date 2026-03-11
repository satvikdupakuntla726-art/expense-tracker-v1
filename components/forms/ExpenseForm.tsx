"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { addExpense, Expense } from "@/lib/storage";
import { convertCurrency, getSupportedCurrencies } from "@/lib/currency";
import { Plus, Loader2 } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import GlassCard from "@/components/ui/GlassCard";

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
  const [description, setDescription] = useState(""); // NEW
  const [currencies, setCurrencies] = useState<string[]>(["USD"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ratesUpdated, setRatesUpdated] = useState<string | null>(null);
  const [usingCachedRates, setUsingCachedRates] = useState(false);

  useEffect(() => {
    getSupportedCurrencies().then(setCurrencies).catch(() => setCurrencies(["USD"]));
    // Check for cached rates timestamp
    if (typeof window !== 'undefined') {
      try {
        const cacheRaw = localStorage.getItem('currency_rates_cache');
        if (cacheRaw) {
          const cache = JSON.parse(cacheRaw);
          const usdCache = cache['USD'];
          if (usdCache && usdCache.timestamp) {
            setRatesUpdated(new Date(usdCache.timestamp).toLocaleString());
          }
        }
      } catch {}
    }
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
      let convertedAmount;
      setUsingCachedRates(false);
      try {
        convertedAmount = await convertCurrency(Number(amount), currency, baseCurrency);
      } catch (err) {
        // Try to use cached rates if available
        if (typeof window !== 'undefined') {
          const cacheRaw = localStorage.getItem('currency_rates_cache');
          if (cacheRaw) {
            const cache = JSON.parse(cacheRaw);
            const fromCache = cache[currency];
            if (fromCache && fromCache.rates && fromCache.rates[baseCurrency]) {
              convertedAmount = Number(amount) * fromCache.rates[baseCurrency];
              setUsingCachedRates(true);
            }
          }
        }
        if (convertedAmount === undefined) throw err;
      }
      const expense: Expense = {
        id: uuidv4(),
        originalAmount: Number(amount),
        originalCurrency: currency,
        convertedAmount,
        baseCurrency,
        category,
        date,
        description, // NEW
      };
      addExpense(expense);
      setAmount("");
      setCurrency(baseCurrency);
      setCategory(categories[0]);
      setDate(new Date().toISOString().slice(0, 10));
      setDescription(""); // NEW
      onAdd();
    } catch {
      setError("Currency conversion failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GlassCard className="mb-6">
      {ratesUpdated && (
        <div className="text-xs text-slate-400 mb-1 ml-1">Rates last updated: {ratesUpdated}</div>
      )}
      {usingCachedRates && (
        <div className="text-xs text-yellow-400 mb-1 ml-1">Warning: Using cached rates due to API error.</div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        {/* 2x2 grid for top inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="sr-only">Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="text-lg px-5 py-4 rounded-xl bg-white/10 border border-border text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="sr-only">Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="text-lg px-5 py-4 rounded-xl bg-white/10 border border-border text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition w-full"
            >
              {currencies.map(cur => (
                <option key={cur} value={cur}>
                  {cur === "INR" ? "INR (₹)" : cur}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="sr-only">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="text-lg px-5 py-4 rounded-xl bg-white/10 border border-border text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition w-full"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="sr-only">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="text-lg px-5 py-4 rounded-xl bg-white/10 border border-border text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition w-full"
            />
          </div>
        </div>
        {/* Reason/Description field */}
        <textarea
          className="w-full rounded-xl bg-white/10 border border-border text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 px-5 py-4 text-lg resize-none transition min-h-[96px] max-h-48"
          rows={4}
          maxLength={200}
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Reason for spending (e.g., Groceries for the week)..."
        />
        {/* Submit button full width at bottom */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-emerald-500 via-sky-400 to-pink-400 shadow-lg hover:from-sky-400 hover:to-emerald-500 hover:scale-[1.03] transition-all duration-200 disabled:opacity-60 mt-2"
          disabled={loading}
        >
          {loading ? <Spinner size={22} /> : <Plus size={22} />}
          <span>Add</span>
        </button>
      </form>
      {error && <div className="text-rose-400 text-sm mt-2">{error}</div>}
    </GlassCard>
  );
}
