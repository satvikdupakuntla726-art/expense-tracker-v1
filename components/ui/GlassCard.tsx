import React from "react";
import { cn } from "@/lib/utils";

export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-background/80 via-primary/10 to-card/90 border border-gradient-to-r from-primary/30 to-accent/30 rounded-2xl shadow-2xl backdrop-blur-2xl p-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl",
        className
      )}
      style={{ boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.18)", border: "1.5px solid rgba(99,102,241,0.12)" }}
    >
      {children}
    </div>
  );
}
