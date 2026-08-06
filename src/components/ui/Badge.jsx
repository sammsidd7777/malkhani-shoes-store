import React from "react";

const tones = {
  gold: "bg-gold-500/15 text-gold-300 border-gold-400/30",
  white: "bg-white/10 text-white border-white/20",
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  red: "bg-red-500/15 text-red-300 border-red-400/30",
};

const Badge = ({ children, tone = "gold", className = "" }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${tones[tone]} ${className}`}
  >
    {children}
  </span>
);

export default Badge;
