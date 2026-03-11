"use client";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { clearExpenses } from "@/lib/storage";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [cleared, setCleared] = useState(false);
  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">⚙️ Settings</h1>
      <div className="mb-8">
        <div className="mb-2 font-semibold text-lg">Theme</div>
        <ThemeToggle />
      </div>
      <div className="mb-8">
        <div className="mb-2 font-semibold text-lg">Data</div>
        <Button
          className="px-4 py-2 rounded bg-danger text-white font-semibold hover:bg-rose-600 transition"
          onClick={() => { clearExpenses(); setCleared(true); }}
        >
          Clear All Expenses
        </Button>
        {cleared && <div className="mt-2 text-success">All expenses cleared!</div>}
      </div>
    </div>
  );
}
