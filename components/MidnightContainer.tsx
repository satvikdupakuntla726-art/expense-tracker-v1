import React from "react";

export default function MidnightContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] flex">
      {children}
    </div>
  );
}
