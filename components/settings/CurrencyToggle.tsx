"use client";
import { useEffect, useState } from "react";

export const CurrencyToggle: React.FC = () => {
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const stored = localStorage.getItem("currency");
    if (stored) setCurrency(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
    // Optionally, trigger a global event for other components
    window.dispatchEvent(new CustomEvent("currency-change", { detail: currency }));
  }, [currency]);

  return (
    <div className="mb-6">
      <label htmlFor="currency" className="block text-slate-300 mb-2 font-medium">Base Currency</label>
      <select
        id="currency"
        value={currency}
        onChange={e => setCurrency(e.target.value)}
        className="w-full rounded border border-white/10 bg-slate-800 text-white p-2"
        aria-label="Select base currency"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
      </select>
    </div>
  );
};
// Why: Currency selection is a core finance app feature.
