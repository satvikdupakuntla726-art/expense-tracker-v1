import { CountUp } from "@/components/ui/CountUp";

export const DailyInsightCard: React.FC<{ today: number; avg: number }> = ({ today, avg }) => {
  const percent = avg ? Math.round(((today - avg) / avg) * 100) : 0;
  return (
    <div className="rounded-xl bg-slate-900/50 border border-white/10 p-6 flex flex-col items-center shadow-lg">
      <span className="text-2xl font-bold text-emerald-400">
        <CountUp value={percent} />%
      </span>
      <span className="text-sm text-slate-300 mt-2">
        You've spent {percent > 0 ? `${percent}% more` : `${Math.abs(percent)}% less`} today than your average.
      </span>
    </div>
  );
};
// Why: KPIs with context help users make better decisions.
