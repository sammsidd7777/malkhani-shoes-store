import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EmptyState = ({ icon: Icon, title, subtitle, actionLabel, actionTo, onAction, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center text-center py-20 px-6 ${className}`}
    >
      {Icon && (
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <Icon className="w-9 h-9 text-gold-400" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      {subtitle && <p className="text-ink-400 max-w-sm mb-6">{subtitle}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white text-ink-950 font-semibold text-sm hover:bg-gold-200 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-white text-ink-950 font-semibold text-sm hover:bg-gold-200 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
