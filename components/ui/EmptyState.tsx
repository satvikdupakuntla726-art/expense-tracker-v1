import React from "react";

export default function EmptyState({
  message = "No data yet.",
  illustration = "/illustrations/empty.svg",
}: {
  message?: string;
  illustration?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <img src={illustration} alt="Empty" className="w-32 h-32 mb-4 opacity-70" />
      <p className="text-zinc-400 text-lg font-medium">{message}</p>
    </div>
  );
}
