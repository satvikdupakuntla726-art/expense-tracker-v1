import React from "react";
import MidnightSidebar from "@/components/MidnightSidebar";
import MidnightHeader from "@/components/MidnightHeader";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#020617]">
      <MidnightSidebar />
      <div className="flex-1 flex flex-col ml-16">
        <MidnightHeader />
        <main className="flex-1 px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
// Why: Shell pattern keeps layout DRY and consistent.
