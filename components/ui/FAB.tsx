import { Plus } from "lucide-react";

export default function FAB({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed z-50 bottom-6 right-6 flex items-center">
      {/* Animated Guidance Text */}
      <span
        className="mr-4 select-none text-base font-sans lowercase tracking-wide font-semibold pointer-events-none shadow-none animate-glow-gradient bg-gradient-to-r from-emerald-300 via-sky-400 to-pink-400 bg-clip-text text-transparent"
        style={{
          textShadow:
            "0 0 8px #34d399, 0 0 16px #0ea5e9, 0 0 24px #f472b6, 0 0 32px #34d39988"
        }}
      >
        add your expenses
      </span>
      {/* FAB Button */}
      <button
        aria-label="Add Expense"
        onClick={onClick}
        className="relative w-20 h-20 flex items-center justify-center rounded-full focus:outline-none group animate-fab-pop"
        style={{ boxShadow: '0 0 0 4px #34d39955, 0 8px 32px 0 #0ea5e988' }}
      >
        {/* Animated Gradient Background */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 via-sky-400 to-pink-400 animate-fab-gradient z-0" />
        {/* Glowing Border */}
        <span className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/40 animate-fab-glow z-10" />
        {/* Plus Icon */}
        <span className="relative z-20 text-white drop-shadow-lg">
          <Plus size={36} strokeWidth={3} />
        </span>
      </button>
    </div>
  );
}
