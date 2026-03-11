import React from "react";
import clsx from "clsx";

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={clsx(
      "animate-pulse rounded-md bg-slate-700/40",
      className
    )}
    aria-busy="true"
    aria-label="Loading"
  />
);
// Why: Skeletons provide a better perceived loading experience than spinners.
