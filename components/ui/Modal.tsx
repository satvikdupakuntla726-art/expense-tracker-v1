import { X } from "lucide-react";

export default function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-gradient-to-br from-slate-900/95 via-primary/10 to-card/90 border border-white/10 rounded-2xl p-10 w-full max-w-xl min-h-[420px] mx-auto shadow-2xl backdrop-blur-xl animate-modalZoomIn"
        style={{ minWidth: 320 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
