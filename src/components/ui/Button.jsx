import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-white text-ink-950 hover:bg-gold-200 shadow-soft",
  gold:
    "bg-gradient-to-r from-gold-500 to-gold-300 text-ink-950 shadow-glow hover:from-gold-400 hover:to-gold-200",
  outline:
    "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
  ghost: "text-white/80 hover:text-white hover:bg-white/5",
  danger: "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
};

const sizes = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const Button = React.forwardRef(
  (
    {
      as = "button",
      variant = "primary",
      size = "md",
      className = "",
      loading = false,
      disabled = false,
      icon: Icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref
  ) => {
    const Comp = motion[as] || motion.button;

    return (
      <Comp
        ref={ref}
        whileHover={disabled || loading ? {} : { y: -2 }}
        whileTap={disabled || loading ? {} : { scale: 0.97 }}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide
          transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
        {children}
        {!loading && Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
      </Comp>
    );
  }
);

Button.displayName = "Button";
export default Button;
