import React from "react";
import { motion } from "framer-motion";

const IconButton = React.forwardRef(
  ({ className = "", active = false, size = "md", children, ...props }, ref) => {
    const sizes = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        className={`inline-flex items-center justify-center rounded-full border transition-colors duration-200
          ${sizes[size]}
          ${
            active
              ? "bg-gold-500/15 border-gold-400/40 text-gold-300"
              : "bg-white/5 border-white/10 text-white/80 hover:text-white hover:border-white/30"
          }
          ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";
export default IconButton;
