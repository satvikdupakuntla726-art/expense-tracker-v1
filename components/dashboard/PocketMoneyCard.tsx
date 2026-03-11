import React from "react";

export default function PocketMoneyCard({
  pocketMoney,
  setPocketMoney,
  remaining,
  className = "",
}: {
  pocketMoney: number;
  setPocketMoney: (v: number) => void;
  remaining: number;
  className?: string;
}) {
  let color = "text-white";
  if (remaining < 0) color = "text-red-400";
  else if (remaining < 0.2 * pocketMoney) color = "text-yellow-400";
  else color = "text-emerald-400";

  return (
    <div className={`rounded-2xl border-2 border-teal-400/80 shadow-[0_0_16px_2px_rgba(45,212,191,0.4)] bg-gradient-to-br from-primary/80 via-accent/40 to-card/90 flex flex-col justify-between p-8 min-w-[200px] h-full transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between w-full mb-2">
        <span className="font-semibold text-lg text-teal-300">Monthly Pocket Money</span>
        <input
          type="number"
          min={0}
          value={pocketMoney}
          onChange={e => setPocketMoney(Number(e.target.value))}
          className="ml-4 w-24 px-2 py-1 rounded bg-zinc-900 text-right text-base text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label="Set monthly pocket money"
        />
      </div>
      <div className="mt-2 text-sm text-zinc-400">Remaining Balance: <span className={`font-bold text-zinc-100 ${color}`}>{remaining.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
    </div>
  );
}
