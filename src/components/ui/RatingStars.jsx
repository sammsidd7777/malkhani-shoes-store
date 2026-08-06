import React from "react";
import { Star } from "lucide-react";

const RatingStars = ({ rating = 5, size = 14, showValue = false, className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(rating) ? "fill-gold-400 text-gold-400" : "fill-ink-700 text-ink-700"}
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-ink-300 ml-1">{rating.toFixed?.(1) ?? rating}</span>}
    </div>
  );
};

export default RatingStars;
