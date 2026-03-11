"use client";
import React, { useState } from "react";
import { Expense, deleteExpense, clearExpenses } from "@/lib/storage";
import { Trash2, Search, XCircle } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import EmptyState from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function ExpenseList({
  expenses,
  onDelete
}: {
  expenses: Expense[];
  onDelete: () => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = expenses.filter(e =>
    e.category.toLowerCase().includes(search.toLowerCase()) ||
    e.originalCurrency.toLowerCase().includes(search.toLowerCase()) ||
    e.date.includes(search)
  );
  return (
    <GlassCard className="mt-4 overflow-x-auto">
      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
        <div className="flex items-center gap-2 flex-1">
          <Search size={18} className="text-zinc-400" />
          <input
            type="text"
            placeholder="Search by category, currency, or date..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-b border-border text-white px-2 py-1 focus:outline-none flex-1"
          />
        </div>
        <Button
          className="flex items-center gap-1 !bg-rose-600 !hover:bg-rose-700 text-white text-sm font-medium px-2 py-1"
          onClick={() => {
            clearExpenses();
            onDelete();
          }}
        >
          <XCircle size={16} /> Clear All
        </Button>
      </div>
      {filtered.length === 0 ? (
        <EmptyState message="No expenses found." />
      ) : (
        <div className="overflow-y-auto max-h-96">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border text-zinc-400">
                <th>Date</th>
                <th>Category</th>
                <th>Original</th>
                <th>USD</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(exp => (
                <tr key={exp.id} className="border-b border-border hover:bg-white/5 transition">
                  <td>{exp.date}</td>
                  <td>
                    <div className="font-semibold">{exp.category}</div>
                    {exp.description && (
                      <div className="text-xs text-slate-400 mt-1 whitespace-pre-line">{exp.description}</div>
                    )}
                  </td>
                  <td>{exp.originalAmount} {exp.originalCurrency}</td>
                  <td>{exp.convertedAmount.toFixed(2)} USD</td>
                  <td>
                    <Button
                      className="!bg-transparent !shadow-none text-rose-400 hover:text-rose-300 p-0 min-w-0"
                      onClick={() => {
                        deleteExpense(exp.id);
                        onDelete();
                      }}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </GlassCard>
  );
}
