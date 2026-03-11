"use client";
import { Home, BarChart2, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SettingsModal from "@/components/settings/SettingsModal";
import ThemeToggle from "@/components/ui/ThemeToggle";

const nav = [
  { href: "/", icon: <Home size={28} />, label: "Dashboard" },
  { href: "/reports", icon: <BarChart2 size={28} />, label: "Reports" },
];

export default function MidnightSidebar() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <aside className="fixed left-0 top-0 h-full w-16 flex flex-col items-center bg-slate-900/50 border-r border-white/10 backdrop-blur-xl z-30">
      <div className="flex flex-col gap-8 mt-8">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col items-center justify-center w-12 h-12 rounded-xl mb-2 hover:bg-emerald-900/30 transition border border-white/10"
            title={item.label}
          >
            <span className="text-emerald-400 group-hover:text-emerald-300 transition drop-shadow-lg">
              {item.icon}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-auto mb-8 flex flex-col items-center gap-4">
        <button
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-emerald-700 border border-white/10 shadow-lg transition"
          title="Settings"
          aria-label="Open settings"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings size={26} className="text-emerald-400" />
        </button>
        <ThemeToggle />
      </div>
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </aside>
  );
}
