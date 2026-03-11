import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: "emerald" | "indigo" | "rose" | "amber" | "sky";
  className?: string;
}

export default function MetricCard({
  label,
  value,
  icon,
  accent = "emerald",
  className = "",
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-gradient-to-br from-primary/80 via-accent/40 to-card/90 shadow-xl flex items-center gap-6 p-8 min-w-[200px] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-primary/90 hover:via-accent/60 hover:to-card/100",
        className
      )}
      style={{ boxShadow: "0 10px 36px 0 rgba(99,102,241,0.18)", border: "1.5px solid rgba(99,102,241,0.12)" }}
    >
      {icon && (
        <div
          className={
            "rounded-full p-2 bg-" + accent + "/20 text-" + accent + "-500 flex items-center justify-center"
          }
        >
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">{label}</span>
        <span className="text-2xl font-bold text-white drop-shadow-sm">{value}</span>
      </div>
    </div>
  );
}
