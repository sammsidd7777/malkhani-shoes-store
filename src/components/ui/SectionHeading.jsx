import React from "react";
import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, subtitle, align = "center", className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${align === "center" ? "text-center mx-auto" : "text-left"} max-w-2xl mb-10 md:mb-14 ${className}`}
    >
      {eyebrow && (
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest2 text-gold-400 mb-3">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tightest text-white leading-[1.05]">
          {title}
        </h2>
      )}
      {subtitle && <p className="mt-4 text-ink-300 text-base leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionHeading;
