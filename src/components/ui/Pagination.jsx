import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 rounded-full border border-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:border-gold-400/40 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
            p === page
              ? "bg-gold-400 text-ink-950"
              : "border border-white/10 text-ink-300 hover:text-white hover:border-white/30"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 rounded-full border border-white/10 text-white flex items-center justify-center disabled:opacity-30 hover:border-gold-400/40 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
