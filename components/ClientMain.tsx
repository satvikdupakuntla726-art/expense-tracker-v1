"use client";
import React, { useEffect, useState } from "react";

export default function ClientMain({ children }: { children: React.ReactNode }) {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    setShowScrollbar(localStorage.getItem("showScrollbar") === "true");
    setMobileMode(localStorage.getItem("mobileMode") === "true");
    const handleScrollbar = (e: any) => setShowScrollbar(e.detail);
    const handleMobile = (e: any) => setMobileMode(e.detail);
    window.addEventListener("show-scrollbar-change", handleScrollbar);
    window.addEventListener("mobile-mode-change", handleMobile);
    return () => {
      window.removeEventListener("show-scrollbar-change", handleScrollbar);
      window.removeEventListener("mobile-mode-change", handleMobile);
    };
  }, []);

  return (
    <main
      className={`flex-1 ml-16 flex flex-col ${showScrollbar ? "overflow-y-auto" : "overflow-y-hidden"} ${mobileMode ? "max-w-md mx-auto" : ""}`}
      style={mobileMode ? { minWidth: 0 } : {}}
    >
      {children}
    </main>
  );
}
