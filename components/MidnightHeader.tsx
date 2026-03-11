import React from "react";

export default function MidnightHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-20 w-full flex items-center justify-between px-8 py-4 bg-slate-900/50 border-b border-white/10 backdrop-blur-xl shadow-sm">
      {children}
    </header>
  );
}
