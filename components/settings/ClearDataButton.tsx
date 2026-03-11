"use client";
import { useState } from "react";

export const ClearDataButton: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  return (
    <div>
      <button
        className="w-full rounded bg-rose-600 text-white py-2 font-semibold hover:bg-rose-700"
        onClick={() => setConfirm(true)}
        aria-label="Clear all data"
      >
        Clear All Data
      </button>
      {confirm && (
        <div className="mt-2 bg-slate-800 p-3 rounded text-sm text-white">
          Are you sure? This cannot be undone.
          <div className="flex gap-2 mt-2">
            <button className="bg-emerald-600 px-3 py-1 rounded" onClick={() => { localStorage.clear(); location.reload(); }}>Yes, clear</button>
            <button className="bg-slate-700 px-3 py-1 rounded" onClick={() => setConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
// Why: Confirmation prevents accidental destructive actions.
